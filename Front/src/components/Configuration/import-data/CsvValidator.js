import React, { useCallback, useRef, useReducer } from 'react';
import Papa from 'papaparse';
import Select from "react-select";
import FixRequiredSelect from "../../util/FixRequiredSelect";
import { Card, Form, ListGroupItem, Button, Alert } from "react-bootstrap";
import { FaSync, FaUpload } from 'react-icons/fa';
import LoadingIcon from "../../util/LoadingIcon";
import { AiFillDelete, AiOutlineSetting } from "react-icons/ai";
import { BiError, BiHide, BiShow } from "react-icons/bi";
import CsvTableResults from "./CsvTableResults";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { paginationOptions } from "../../util/BootStrapTableOptions";
import { GiCheckMark, GiSettingsKnobs } from "react-icons/gi";
import SupportedCsvTemplate from "./SupportedCsvTemplate";

const CsvValidator = (props) => {
    const csvFileParameter = props.csvFile
    const onDiscardCsv = props.onDiscard
    const onParseResults = props.onParseResults
    const onChangeAssociatedTemplateCsv = props.onChangeAssociatedTemplateCsv

    React.useEffect(() => {
        if (csvFileParameter) {
            dispatch({
                type: 'select-and-read-file',
                payload: csvFileParameter
            })
        }
    }, [csvFileParameter])

    // how to use reducer see https://blog.logrocket.com/react-usereducer-hook-ultimate-guide/
    // and https://youtu.be/o-nCM1857AQ
    // options for csvDefaultDelimiterOption used in csv
    const delimiterOptions = [
        { value: 'autoDetectDelimiter', label: "Detect automatically" },
        { value: ';', label: "Semicolon ';' " },
        { value: ',', label: "Comma ',' " },
        { value: ' ', label: "Space ' ' " },
        { value: '\t', label: "Tab '\\t' " },
        { value: '|', label: "Pipe '|' " },
    ];

    const csvTemplateOptions = Object.keys(SupportedCsvTemplate).map(template => {
        return {
            value: SupportedCsvTemplate[template],
            label: SupportedCsvTemplate[template].label,
        }
    });

    const initialState = {
        // ------------- Input states ---------------
        csvFile: null,
        csvFileContent: null,

        // auto remove unless selected via checkbox turn it off
        // similar to auto-detect delimiter behavior
        csvIsAutoRemoveFirstLine: true,
        csvIsDiscardFirstLine: false,

        csvIsAutoDetectDelimiter: false,
        csvDefaultDelimiterOption: { value: ';', label: "Semicolon ';' " },

        // --------------- UI states ---------------
        isLoading: false,
        showCsvTableResults: false,
        showConfiguration: false,

        // --------------- Generated data state ---------------
        associatedCsvTemplateOption: { value: undefined, label: "Unknown template" },
        isMeetingCsvTemplate: false,
        /**
         * Results structure:
         * {
         * 	data:   // array of parsed data
         * 	errors: // array of errors
         * 	meta:   // object with extra info
         * }
         * if header option turned on, headers will be in "meta.fields"
         */
        csvResults: [],
        /**
         * // Error line structure
         * {
         * 	type: "",     // A generalization of the error
         * 	code: "",     // Standardized error code
         * 	message: "",  // Human-readable details
         * 	row: 0,       // Row index of parsed data where error is
         * }
         */
        errorLines: [],
        infoAlert: '',
        errorAlert: '',
    };
    const [state, dispatch] = useReducer(csvReducer, initialState);

    const fileInputRef = useRef(null);


    const resetForm = useCallback(() => {
        fileInputRef.current.value = "";
        fileInputRef.current.click();
    }, []);


    function csvReducer(state, action) {
        const parseCsvFile = async (file, isAutoDetectDelimiter, defaultDelimiter) => {
            // Set loading state to true
            return new Promise((resolve, reject) => {
                Papa.parse(file, {
                    delimiter: isAutoDetectDelimiter ? "" : defaultDelimiter,
                    skipEmptyLines: true,
                    header: true,
                    complete: (results) => {
                        resolve(results);
                    },
                    error(err) {
                        reject(err);
                    }
                })
            });
        }
        switch (action.type) {
            case 'select-and-read-file':
                const file = action.payload;

                // try to guess association based on file name pattern
                let defaultNextCsvTemplate = state.associatedCsvTemplateOption;
                const matchedElements = Object.entries(SupportedCsvTemplate)
                    .filter(([, element]) =>
                        element.fileNamePattern.some((pattern) => pattern.test(file.name))
                    );
                if (matchedElements.length > 0) {
                    defaultNextCsvTemplate = { label: matchedElements[0][1].label, value: matchedElements[0][1] };
                }

                // read file into memory and prepare for parse
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        dispatch({
                            type: 'done-reading-file',
                            payload: event.target.result
                        })
                        dispatch({
                            type: 'parse-csv',
                            csvIsDiscardFirstLine: false,
                        })
                    };
                    reader.readAsText(file);
                    return {
                        ...state,
                        csvFile: file,
                        isLoading: true,
                        csvResults: [],
                        errorLines: [],
                        errorAlert: null,
                        infoAlert: null,
                        csvIsDiscardFirstLine: false,
                        associatedCsvTemplateOption: defaultNextCsvTemplate,
                    };
                }
                return state;
            case 'done-reading-file':
                return {
                    ...state,
                    csvFileContent: action.payload,
                }
            case 'parse-csv':
                let csvModifiedFileContent = state.csvFileContent;
                //nullish coalescing operator (??) check  if a variable is set or not
                // and if it's not set then return a default value.
                let isRemoveFirstLine = action.isRemoveFirstLine ?? state.csvIsDiscardFirstLine;
                if (isRemoveFirstLine) {
                    let splittedNewLine = state.csvFileContent.split('\n')
                    splittedNewLine.shift();
                    csvModifiedFileContent = splittedNewLine.join('\n');
                }
                parseCsvFile(csvModifiedFileContent,
                    state.csvIsAutoDetectDelimiter,
                    state.csvDefaultDelimiterOption.value
                ).then(results => {
                    // do something with data
                    const usedDelimiter = results.meta.delimiter;
                    let nextDefaultDelimiterState = state.csvDefaultDelimiterOption;
                    let errorLines = [];

                    if (state.csvIsAutoDetectDelimiter && usedDelimiter !== state.csvDefaultDelimiterOption.value)
                        nextDefaultDelimiterState = {
                            value: usedDelimiter,
                            label: "Detected delimiter '" + usedDelimiter + "'"
                        };
                    // Handle any errors from the parse method
                    if (results.errors.length > 0) {
                        const uniqueErrors = [...new Set(
                            results.errors.map(error => JSON.stringify({
                                type: error.type,
                                code: error.code,
                                row: error.row, // start row count from 1
                                index: error.index, // not always defined
                                message: error.message,
                            })))].map(error => JSON.parse(error));
                        errorLines = [...new Set(uniqueErrors)];
                    }
                    if (state.csvIsAutoRemoveFirstLine
                        && !isRemoveFirstLine
                        && results?.meta?.fields?.length === 1
                    ) {
                        isRemoveFirstLine = true;
                        dispatch({
                            type: 'parse-csv',
                            isRemoveFirstLine: true,
                        })
                    } else {
                        dispatch({
                            type: 'done-parsing',
                            payload: {
                                ...state,
                                csvDefaultDelimiterOption: nextDefaultDelimiterState,
                                csvResults: results,
                                errorLines: errorLines,
                                isLoading: false,
                                csvIsDiscardFirstLine: isRemoveFirstLine,
                            }
                        })
                    }
                }).catch((exception) => {
                    console.log(exception)
                    dispatch({
                        type: 'done-parsing',
                        payload: {
                            ...state,
                            csvResults: [],
                            errorAlert: exception + "\nTry to upload file again.",
                            isLoading: false,
                            csvIsDiscardFirstLine: isRemoveFirstLine,
                        }
                    })
                })
                return {
                    ...state,
                    csvIsDiscardFirstLine: isRemoveFirstLine
                };
            case 'done-parsing':
                const newState = action.payload
                if (onParseResults) {
                    onParseResults(newState.csvResults);
                }
                setTimeout(() => {
                    dispatch({
                        type: 'change-target-template'
                    })
                }, 500);
                return newState;
            case 'delimiter-change':
                return {
                    ...state,
                    csvIsAutoDetectDelimiter: action.payload.value === 'autoDetectDelimiter',
                    csvDefaultDelimiterOption: action.payload,
                    isLoading: true,
                    csvIsDiscardFirstLine: false,
                };
            case 'change-target-template':
                // check if new template meet condition such as number of columns
                const associatedCsvTemplateOption = action.payload ?? state.associatedCsvTemplateOption;
                const isMeetingCsvTemplate = associatedCsvTemplateOption?.value?.fields?.length
                    === state?.csvResults?.meta?.fields?.length;
                if (isMeetingCsvTemplate) {
                    onChangeAssociatedTemplateCsv(associatedCsvTemplateOption.value);
                }
                return {
                    ...state,
                    associatedCsvTemplateOption: associatedCsvTemplateOption,
                    isMeetingCsvTemplate: isMeetingCsvTemplate,
                };
            case 'clear-error-alert':
                return {
                    ...state,
                    errorAlert: ''
                };
            case 'toggle-show-csv-table':
                return {
                    ...state,
                    showCsvTableResults: !state.showCsvTableResults
                }
            case 'toggle-show-configuration':
                return {
                    ...state,
                    showConfiguration: !state.showConfiguration
                }
            default:
                return state;
        }
    }

    const isCsvChargedWithResults = state.csvResults && state.csvResults.meta && state.csvResults.meta.fields;
    const totalRowsResults = isCsvChargedWithResults ? state.csvResults.data.length : 0;
    const totalColumnsResults = isCsvChargedWithResults ? state.csvResults.meta.fields.length : 0;
    const errorTableColumns = [
        { dataField: 'type', text: 'Error type', width: '10%' },
        { dataField: 'code', text: 'Code', width: '10%' },
        { dataField: 'row', text: 'Line', width: '10%', formatter: (cell, row) => row.row + 1 },
        { dataField: 'index', text: '#Character', hidden: true },

        {
            dataField: 'content', text: 'Content', width: '20%',
            formatter: (cell, row, rowIndex) => {
                const data = state?.csvResults?.data;
                const fields = state?.csvResults?.meta?.fields;

                if (!Array.isArray(data) || !Array.isArray(fields)) return null;
                const line = data[rowIndex];
                if (!line) return null;

                return (
                    <>
                        {fields.map((field) => {
                            const value = line[field];
                            return value ? (
                                <Alert key={field} variant="success" style={{ margin: 0 }}>
                                    {field}: {value}
                                </Alert>
                            ) : (
                                <Alert key={field} variant="danger" style={{ margin: 0 }}>
                                    {field}:
                                </Alert>
                            );
                        })}
                    </>
                );
            }
        },

        { dataField: 'message', text: 'Message', width: '50%' }
    ];
    return (
        <div>
            <Card className={"mx-auto"}>
                <Card.Header>
                    {state.csvFile ?
                        <div>
                            <ListGroupItem variant={state.isMeetingCsvTemplate ? "primary" : "danger"}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 col-md-3">
                                            <div>
                                                {/* First Column, spans both rows */}
                                                {state.isLoading ? <LoadingIcon text={"Parsing file: "} /> :
                                                    <div className="btn-group" role="group">
                                                        <Button variant="light" onClick={() => {
                                                            dispatch({
                                                                type: 'toggle-show-configuration'
                                                            })
                                                        }}>
                                                            {state.showConfiguration ? <GiSettingsKnobs /> :
                                                                <AiOutlineSetting />}
                                                        </Button>
                                                        <Button variant="secondary" onClick={() => {
                                                            dispatch({
                                                                type: 'toggle-show-csv-table'
                                                            })
                                                        }}>
                                                            {state.showCsvTableResults ? <BiShow /> : <BiHide />}
                                                        </Button>
                                                        {onDiscardCsv &&
                                                            <Button variant="danger" onClick={() => onDiscardCsv()}>
                                                                <AiFillDelete />
                                                            </Button>
                                                        }
                                                        <Button variant="info" onClick={resetForm}>
                                                            <FaSync />
                                                        </Button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-9">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div>
                                                        {/* Second Column, row 1 */}
                                                        Charged File :
                                                        {state.csvFile.name}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div>
                                                        {/* Second Column, row 2 */}
                                                        {totalRowsResults > 0 ?
                                                            "Total records : " + totalRowsResults + " * "
                                                            + totalColumnsResults + " columns"
                                                            : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                        <div className={"col-12 col-md-3"}>
                                        </div>
                                        <div className={"col-12 col-md-5"}>
                                            Associated Csv Template:
                                            <FixRequiredSelect
                                                SelectComponent={Select}
                                                options={csvTemplateOptions}
                                                onChange={(option) => {
                                                    dispatch({
                                                        type: 'change-target-template',
                                                        payload: option
                                                    })
                                                }}
                                                value={state.associatedCsvTemplateOption}
                                                required={true}
                                            />
                                        </div>
                                        <div className={"col-12 col-md-4"}>
                                            {state.isMeetingCsvTemplate ?
                                                <><GiCheckMark /> Csv Match template format</> :
                                                <><BiError /> Csv doesn't match template format</>
                                            }
                                            <ul>
                                                {state?.associatedCsvTemplateOption?.value?.dependencies?.length > 0 ?
                                                    <>
                                                        Liste des dépendances
                                                        {SupportedCsvTemplate
                                                            .getDependencies(state.associatedCsvTemplateOption.value.key)
                                                            .map((dependency, index) => {
                                                                return <li key={dependency.key}>{dependency.label}</li>
                                                            })}
                                                    </>
                                                    : null
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </ListGroupItem>
                        </div> : null}
                </Card.Header>
                <Card.Body>
                    {state.csvFile ?
                        <div>

                            <form style={state.showConfiguration ? {} : { display: "none" }}>
                                <div className="form-group" hidden={state.csvFile}>
                                    <Button variant="success" className="mr-2">
                                        <label htmlFor="csv-file" className="file-upload-label border-0">
                                            <FaUpload className={"mr-2"} />
                                            Upload CSV
                                        </label>
                                        <Form.File
                                            id="csv-file"
                                            label="Upload CSV file"
                                            accept=".csv"
                                            onChange={(e) => {
                                                dispatch({
                                                    type: 'select-and-read-file',
                                                    payload: e.target.files[0]
                                                })
                                            }}
                                            disabled={state.isLoading}
                                            ref={fileInputRef}
                                            style={{ display: "none" }}
                                        />
                                    </Button>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="separator-select">Select Separator</label>
                                    <FixRequiredSelect
                                        SelectComponent={Select}
                                        options={delimiterOptions}
                                        value={state.csvDefaultDelimiterOption}
                                        onChange={(option) => {
                                            dispatch({
                                                type: 'delimiter-change',
                                                payload: option
                                            })
                                            dispatch({
                                                type: 'parse-csv'
                                            })
                                        }}
                                        required={true}
                                    />
                                </div>
                            </form>

                            {state.errorAlert && <Alert variant={"danger"}
                                onClose={() => dispatch({ type: 'clear-error-alert' })}
                                dismissible={true}>{state.errorAlert}</Alert>}

                            {state.showConfiguration && isCsvChargedWithResults &&
                                <>
                                    <div className={"row"}>
                                        <div className={"col-12"}>
                                            {state.csvIsDiscardFirstLine && "First line is automatically discarded!"}
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                        <div className={"col-6"}>
                                            <ListGroupItem>
                                                Number of columns {state.csvResults.meta.fields.length}
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                Columns headers:
                                                {state.csvResults.meta.fields.map((columnName, index) => {
                                                    return <ListGroupItem key={columnName}>{columnName}</ListGroupItem>;
                                                })}
                                            </ListGroupItem>
                                        </div>
                                        <div className={"col-6"}>
                                            <ListGroupItem
                                                variant={totalColumnsResults === state.associatedCsvTemplateOption?.value?.fields?.length ?
                                                    "success" :
                                                    "danger"}>
                                                Expected Number of
                                                columns {state.associatedCsvTemplateOption?.value?.fields?.length}
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                Columns headers:
                                                {state.associatedCsvTemplateOption?.value?.fields?.map((columnName, index) => {
                                                    return <ListGroupItem key={columnName}
                                                        variant={columnName === state.csvResults.meta.fields[index] ?
                                                            "success" :
                                                            "warning"}>
                                                        {columnName}
                                                    </ListGroupItem>;
                                                })}
                                            </ListGroupItem>
                                            Merging rules:
                                            <ul>
                                                {state.associatedCsvTemplateOption?.value?.mergingRules.map((rule, index) => {
                                                    return <li key={rule}>{rule}</li>
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </>
                            }
                            {state.infoAlert ? <ListGroupItem variant={"success"}>
                                {state.infoAlert}
                            </ListGroupItem> : null}
                            {state.errorLines.length > 0 && <ListGroupItem variant={"warning"}>
                                {state.errorLines.length} Total errors
                            </ListGroupItem>}
                        </div>
                        : null}

                    {state.errorLines.length > 0 &&
                        <BootstrapTable
                            bootstrap4={true}
                            keyField='row'
                            data={state.errorLines}
                            columns={errorTableColumns}
                            pagination={paginationFactory(paginationOptions(state.errorLines.length))}
                            wrapperClasses="table-responsive"
                        />}

                    {state.showCsvTableResults
                        && <CsvTableResults
                            csvResultsData={state.csvResults.data}
                            csvResultsMetaFields={state.csvResults.meta.fields}
                        />
                    }
                </Card.Body>
            </Card>
        </div>
    );
}


export default CsvValidator;