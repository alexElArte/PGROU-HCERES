import React, {useMemo} from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {paginationOptions} from "../../util/BootStrapTableOptions";
import SupportedCsvTemplate from "./SupportedCsvTemplate";
import {Alert, ListGroup, OverlayTrigger, Tooltip} from "react-bootstrap";


export default function ImportCsvErrors({targetCsvTemplate, csvFormatToFileNamesMap, csvResults, importCsvErrorList}) {
    const headers = useMemo(() => {
        return csvResults.meta.fields;
    }, [csvResults]);
    // Example of sent data
    // {
    //     "type": "CsvParseFieldException",
    //     "code": "NumberFormatException",
    //     "message": "java.lang.NumberFormatException: For input string: \"\"",
    //     "row": 10,
    //     "fieldNumber": 2
    // }

    const data = useMemo(() => {
        return importCsvErrorList.map((error, index) => ({
            ...error,
            field: headers[error.fieldNumber],
            value: csvResults.data[error.row - 1][headers[error.fieldNumber]],
            rowValue: csvResults.data[error.row - 1],
            errorKey: error.type + error.code + error.row + error.fieldNumber,
        }));
    }, [importCsvErrorList, csvResults, headers]);

    function showTooltip(props) {
        return <Tooltip id={"on-hover-row-content"}>
            {props}
        </Tooltip>
    }

    const expandRow = {
        renderer: row => (
            <div>
                Possible Reasons:
                <ListGroup>
                    {row.value === "" ?
                        <ListGroup.Item variant={"danger"}> {`The field "${row.field}" is empty`}</ListGroup.Item>
                        : null
                    }
                    {row.value !== "" && row.type === "CsvParseFieldException" ?
                        <ListGroup.Item variant={"danger"}> {`The field "${row.field}" = "${row.value}" is not a valid
                         ${row.code}`}</ListGroup.Item>
                        : null
                    }
                    {row.value !== "" && row.type === "CsvDependencyFieldException" ?
                        <ListGroup.Item variant={"danger"}> {`The field "${row.field}" = "${row.value}" is not present
                         ${row.code} in the file `}
                            <b>"{csvFormatToFileNamesMap.get(SupportedCsvTemplate[row.code])}"</b>
                        </ListGroup.Item>
                        : null
                    }
                </ListGroup>

                <p>
                    Raw contents of <b>"{csvFormatToFileNamesMap.get(targetCsvTemplate)}"</b>
                    {` record at line ${row.row} 
                    column ${row.fieldNumber + 1}`}
                </p>
                {headers.map((field, index) => (
                    <>
                        <Alert variant={index !== row.fieldNumber ? "success" : "danger"} style={{margin: 0}}>
                            <div className={"row"}>
                                <div className={"col-4"}>
                                    "{field}"
                                </div>
                                <div className={"col-8"}>
                                    : "{row.rowValue[field]}"
                                </div>
                            </div>
                        </Alert>
                    </>
                ))}
            </div>
        ),
        onlyOneExpanding: true,
        showExpandColumn: true,
        expandHeaderColumnRenderer: ({isAnyExpands}) => {
            if (isAnyExpands) {
                return <b>-</b>;
            }
            return <b>+</b>;
        },
        expandColumnRenderer: ({expanded}) => {
            if (expanded) {
                return (
                    <b>-</b>
                );
            }
            return (
                <b>+</b>
            );
        }
    };

    const columns = [{
        dataField: "type",
        text: "Error Type",
        sort: true,
    }, {
        dataField: "code",
        text: "Code",
        sort: true,
    }, {
        dataField: "row",
        text: "Line / Column",
        sort: true,
        formatter: (cell, row) => {
            return <>
                {row.row} / {row.fieldNumber + 1}
            </>
        }
    }, {
        dataField: "content",
        isDummyField: true,
        text: "Content",
        formatter: (cell, row) => {
            return <OverlayTrigger
                placement="bottom"
                delay={{show: 250, hide: 400}}
                overlay={showTooltip(JSON.stringify(row.rowValue))}
            >
                <ListGroup.Item variant={"danger"}>
                    {row.field} :
                    {row.value.length > 100 ? row.value.substring(0, 100) + "..." : row.value}
                </ListGroup.Item>
            </OverlayTrigger>
        }
    }, {
        dataField: "message",
        text: "Message",
        sort: true,
    }
    ];

    return (
        <div className="d-flex justify-content-center">
            <div className="card">
                <div className="card-body">
                    <ListGroup.Item variant={"danger"}>
                        <h4 className="card-title">Erreurs associé à :
                            {targetCsvTemplate.label}</h4>
                    </ListGroup.Item>
                    <div className="card-text">
                        <BootstrapTable
                            bootstrap4={true}
                            keyField='errorKey'
                            data={data}
                            columns={columns}
                            pagination={paginationFactory(paginationOptions(data.length))}
                            wrapperClasses="table-responsive"
                            noDataIndication='No data to display'
                            striped={true}
                            expandRow={expandRow}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}