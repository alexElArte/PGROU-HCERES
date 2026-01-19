import React, {useReducer, useRef} from 'react';
import CsvValidator from "./CsvValidator";
import {Alert, Button, Form} from "react-bootstrap";
import {FaDownload, FaUpload} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";
import SupportedCsvTemplate from "./SupportedCsvTemplate";
import {insertCsvDataIntoDatabase} from "../../../services/Configuration/import-data/DataImporterActions";
import LoadingIcon from "../../util/LoadingIcon";
import CsvSampleDownloader from "./CsvSampleDownloader";
import MyGlobalVar from "../../../services/MyGlobalVar";
import {purgeDatabase} from "../../../services/Configuration/DataPurgerActions";
import ImportCsvSummary from "./ImportCsvSummary";

function createInverseMap(originalMap) {
    return Array.from(originalMap.entries()).reduce(
        (inverseMap, [key, value]) => inverseMap.set(value, key),
        new Map()
    );
}

const DataImporter = () => {
    const initialState = {
        // map from file name to file value
        csvFiles: new Map(),
        csvValidators: new Map(),
        csvParseResults: new Map(),
        csvTemplateAssociations: new Map(),

        // UI state
        isInsertingIntoDataBase: false,
        isPurgingDatabase: false,
        downloadCsvHolder: false,

        // Generated state
        missingCsvDependencies: new Set(),

        // Received from backend
        importCsvSummary: {},
    }
    const fileInputRef = useRef(null);
    const [state, dispatch] = useReducer(reducerFunction, initialState);
    const csvFormatToFileNamesMap = createInverseMap(state.csvTemplateAssociations);
    function reducerFunction(state, action) {


        function getMissingDependencies(csvTemplateAssociations) {
            let missingDependencies = new Set();
            // create map from format template to filename
            const csvFormatToFileName = createInverseMap(csvTemplateAssociations);
            csvFormatToFileName.forEach((fileName, format) => {
                let formatDependencies = SupportedCsvTemplate.getDependencies(format.key);
                formatDependencies.forEach(dependency => {
                    if (!csvFormatToFileName.has(dependency)) {
                        missingDependencies.add(dependency);
                    }
                });
            });
            return missingDependencies;
        }

        switch (action.type) {
            case 'download-csv-samples':
                setTimeout(() => dispatch({
                    type: 'download-csv-samples-done',
                }), 1000);
                return {
                    ...state,
                    downloadCsvHolder: true
                };
            case 'download-csv-samples-done':
                return {
                    ...state,
                    downloadCsvHolder: false
                };
            case 'add-list-of-files':
                const selectedFiles = action.payload;
                const filesMap = state.csvFiles;
                const filesValidatorsMap = state.csvValidators;
                for (const selectedFile of selectedFiles) {
                    filesMap.set(selectedFile.name, selectedFile);
                    filesValidatorsMap.set(selectedFile.name,
                        <CsvValidator
                            csvFile={selectedFile}
                            onDiscard={() => dispatch({
                                type: 'clear-file',
                                payload: selectedFile,
                            })}
                            onParseResults={(results) => dispatch({
                                type: 'receive-parse-result',
                                payload: results,
                                file: selectedFile,
                            })}
                            onChangeAssociatedTemplateCsv={(associatedTemlateCsv) => {
                                dispatch({
                                    type: 'receive-template-association',
                                    payload: associatedTemlateCsv,
                                    file: selectedFile,
                                })
                            }}
                        />
                    );
                }
                setTimeout(() => {
                    fileInputRef.current.value = "";
                }, 2000);
                return {
                    ...state,
                    csvFiles: filesMap,
                    csvValidators: filesValidatorsMap,
                };
            case 'receive-parse-result':
                // silent update state on receive change from child to prevent render the component
                state.csvParseResults.set(action.file.name, action.payload);
                return state;
            case 'receive-template-association':
                // silent update state on receive change from child to prevent render the component
                state.csvTemplateAssociations.set(action.file.name, action.payload);
                setTimeout(() => {
                    dispatch({
                        type: 'check-dependencies',
                    })
                }, 500)
                return state;
            case 'check-dependencies':
                return {
                    ...state,
                    missingCsvDependencies: getMissingDependencies(state.csvTemplateAssociations),
                };
            case 'insert-into-database':
                if (state.isInsertingIntoDataBase) {
                    // prevent concurrent insert
                    return state;
                }
                const csvFormatToFileName = createInverseMap(state.csvTemplateAssociations);
                const data = {};
                csvFormatToFileName.forEach((fileName, format) => {
                    data[format.key] = {
                        csvResults: state.csvParseResults.get(fileName).data
                    }
                })
                // compress data by removing useless key
                const compressedData = Object.fromEntries(
                    Object.entries(data).map(([key, value]) => [
                        key,
                        value.csvResults.map(result => Object.values(result))
                    ])
                );
                insertCsvDataIntoDatabase(compressedData).then((response) => {
                    dispatch({
                        type: 'insert-database-success',
                        payload: response,
                    })
                }).catch((error) => {
                    dispatch({
                        type: 'insert-database-failed',
                        payload: error,
                    })
                })
                return {
                    ...state,
                    isInsertingIntoDataBase: true,
                };
            case 'purge-the-database':
                purgeDatabase().then((response) => {
                    dispatch({
                        type: 'purge-database-success',
                        payload: response,
                    })
                }).catch((error) => {
                    console.log(error)
                    dispatch({
                        type: 'purge-database-failed',
                        payload: error,
                    })
                });
                return {
                    ...state,
                    isPurgingDatabase: true,
                };
            case 'purge-database-success':
                // Changer par un alert dans la page plus tard
                setTimeout(() => {
                    alert("Database cleared successfully!");
                }, 500);
                MyGlobalVar.initializeLists();
                return {
                    ...state,
                    isPurgingDatabase: false,
                    importCsvSummary: {},
                };
            case 'purge-database-failed':
                // Changer par un alert dans la page plus tard
                setTimeout(() => {
                    alert("There was an error during clear, check logs!")
                }, 500);
                return {
                    ...state,
                    isPurgingDatabase: false,
                    importCsvSummary: {},
                };
            case 'insert-database-success':
                // Changer par un alert dans la page plus tard
                setTimeout(() => {
                    alert("Insertion réussie !");
                }, 500);
                MyGlobalVar.initializeLists();
                return {
                    ...state,
                    isInsertingIntoDataBase: false,
                    importCsvSummary: action.payload?.data,
                };
            case 'insert-database-failed':
                console.log("insert failed");
                console.log(action.payload);
                return {
                    ...state,
                    isInsertingIntoDataBase: false,
                    importCsvSummary: {},
                };
            case 'clear-file':
                setTimeout(() => {
                    dispatch({
                        type: 'check-dependencies',
                    })
                }, 1000)
                const fileName = action.payload.name;
                if (state.csvFiles.has(fileName)) {
                    state.csvFiles.delete(fileName);
                }
                if (state.csvValidators.has(fileName)) {
                    state.csvValidators.delete(fileName);
                }
                if (state.csvParseResults.has(fileName)) {
                    state.csvParseResults.delete(fileName);
                }
                if (state.csvTemplateAssociations.has(fileName)) {
                    state.csvTemplateAssociations.delete(fileName);
                }
                return {...state};
            case 'clear-all-files':
                setTimeout(() => {
                    dispatch({
                        type: 'check-dependencies',
                    })
                }, 500)
                return {
                    ...state,
                    csvFiles: new Map(),
                    csvValidators: new Map(),
                    csvParseResults: new Map(),
                    csvTemplateAssociations: new Map(),
                    importCsvSummary: {},
                };
            case 'clear-non-associated-files':
                const formatToFileName = createInverseMap(state.csvTemplateAssociations);
                const newCsvFiles = new Map();
                const newCsvValidators = new Map();
                const newCsvParseResults = new Map();
                formatToFileName.forEach((fileName, format) => {
                    newCsvFiles.set(fileName, state.csvFiles.get(fileName));
                    newCsvValidators.set(fileName, state.csvValidators.get(fileName));
                    newCsvParseResults.set(fileName, state.csvParseResults.get(fileName));
                })
                setTimeout(() => {
                    dispatch({
                        type: 'check-dependencies',
                    })
                }, 500)
                return {
                    ...state,
                    csvFiles: newCsvFiles,
                    csvValidators: newCsvValidators,
                    csvParseResults: newCsvParseResults,
                };
            default:
                return state;
        }
    }

    return (
        <div className="container">
            <br/>
            <div className={"row"}>
                <h3 style={{
                    borderRadius: '0.25em',
                    textAlign: 'center',
                    color: 'darkblue',
                    border: '1px solid darkblue',
                    padding: '0.5em'
                }}>
                    Import Csv Data into database
                </h3>
            </div>
            {state.importCsvSummary?.entityToCsvMetrics ?
                <div className={"row"}>
                    <ImportCsvSummary
                        entityToCsvMetrics={state.importCsvSummary?.entityToCsvMetrics}
                        entityToCsvErrors={state.importCsvSummary?.entityToCsvErrors}
                        csvParseResults={state.csvParseResults}
                        csvFormatToFileNamesMap={csvFormatToFileNamesMap}
                    />
                </div>:
                <></>
            }

            <div className={"row"}>
                {state.missingCsvDependencies.size > 0 ?
                    <Alert variant={"danger"}>
                        Liste de dépendances manquantes
                        {Array.from(state.missingCsvDependencies)
                            .map((dependency, index) => {
                                return <li key={dependency.key}>{dependency.label}</li>
                            })}
                    </Alert>
                    : <Alert variant={"success"}
                             hidden={state.csvParseResults.size === 0}
                    >
                        All dependencies are satisfied !
                    </Alert>
                }
            </div>
            <div className="row">
                <form>
                    <div className="form-group">
                        <div className="btn-group" role="group">
                            <Button variant="danger"
                                    className={"btn-group"}
                                    disabled={state.isPurgingDatabase || state.isInsertingIntoDataBase}
                                    onClick={() => {
                                        dispatch({
                                            type: 'purge-the-database'
                                        })
                                    }}
                            >
                                <AiFillDelete className={"mr-2"}/>
                                {state.isPurgingDatabase ? <LoadingIcon color={"white"}/> : null}
                                {state.isPurgingDatabase ? 'Suppression en cours...' : 'Supprimer toute la base de données'}
                            </Button>
                            <Button variant="primary"
                                    className={"btn-group"}
                                    onClick={() => {
                                        dispatch({
                                            type: 'download-csv-samples'
                                        })
                                    }}
                            >
                                {state.downloadCsvHolder && <CsvSampleDownloader/>}

                                <FaDownload className={"mr-2"}/>
                                Download Sample
                            </Button>
                        </div>
                        <br/>
                        <br/>
                        <div className="btn-group" role="group">
                            <Button variant="success" className="btn-group">
                                <label htmlFor="csv-file" className="file-upload-label border-0">
                                    <FaUpload className={"mr-2"}/>
                                    Upload CSV
                                </label>
                                <Form.File
                                    id="csv-file"
                                    label="Upload CSV file"
                                    accept=".csv"
                                    onChange={(e) => {
                                        dispatch({
                                            type: 'add-list-of-files',
                                            payload: e.target.files
                                        })
                                    }}
                                    ref={fileInputRef}
                                    disabled={state.isLoading}
                                    multiple={true}
                                    style={{display: "none"}}
                                />
                            </Button>
                            <Button variant={"primary"}
                                    disabled={state.isInsertingIntoDataBase || state.isPurgingDatabase}
                                    onClick={() => dispatch({
                                        type: 'insert-into-database'
                                    })}
                                    hidden={state.missingCsvDependencies.size > 0 || state.csvParseResults.size === 0}>
                                {state.isInsertingIntoDataBase ? <LoadingIcon color={"white"}/> : null}
                                {state.isInsertingIntoDataBase ? 'Insertion en cours...' : 'Insérer dans la base de données'}
                            </Button>
                            <Button
                                variant={"info"}
                                onClick={() => dispatch({
                                    type: 'clear-non-associated-files'
                                })}
                                hidden={state.missingCsvDependencies.size > 0 || state.csvParseResults.size === 0}
                            >
                                Effacer les non-associations
                            </Button>
                            <Button
                                variant={"danger"}
                                onClick={() => dispatch({
                                    type: 'clear-all-files'
                                })}
                                hidden={state.csvParseResults.size === 0}
                            >
                                Tout effacer
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
            <div className={"row"}>
                <div className={"col-12"}>
                    Total {state.csvFiles.size} files uploaded.
                </div>
            </div>
            <div>
                {Array.from(state.csvValidators.entries()).map(([fileName, validator], index) => (
                    <div key={fileName}>{validator}</div>
                ))}
            </div>
        </div>
    )
}

export default DataImporter;