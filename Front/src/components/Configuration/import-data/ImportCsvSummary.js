import React, {useMemo, useState} from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {paginationOptions} from "../../util/BootStrapTableOptions";
import SupportedCsvTemplate from "./SupportedCsvTemplate";
import {Button, ListGroup} from "react-bootstrap";
import ImportCsvErrors from "./ImportCsvErrors";
import ImportCsvDuplicates from "./ImportCsvDuplicates";
import CsvTableResults from "./CsvTableResults";
import {BiHide, BiShow} from "react-icons/bi";

export default function ImportCsvSummary({
                                             entityToCsvMetrics,
                                             entityToCsvErrors,

                                             csvFormatToFileNamesMap,
                                             csvParseResults,
                                         }) {
    const data = useMemo(() => {
        return Object.keys(entityToCsvMetrics).map(entity => ({
            entityKey: entity,
            entityFormat: SupportedCsvTemplate[entity],
            totalInCsv: entityToCsvMetrics[entity].totalInCsv,
            totalLineErrors: entityToCsvMetrics[entity].totalLineErrors,
            totalErrors: entityToCsvMetrics[entity].totalErrors,
            totalDuplicatesInCsv: entityToCsvMetrics[entity].totalDuplicatesInCsv,
            duplicateLines: entityToCsvMetrics[entity].duplicateLines,
            totalInDatabase: entityToCsvMetrics[entity].totalInDatabase,
            totalMergedWithDatabase: entityToCsvMetrics[entity].totalMergedWithDatabase,
            totalInserted: entityToCsvMetrics[entity].totalInserted,
        }));
    }, [entityToCsvMetrics]);

    const [showCsvTableResults, setShowCsvTableResults] = useState(false);
    const [showCsvDuplicates, setShowCsvDuplicates] = useState(false);

    const expandRow = {
        renderer: row => (
            <div>
                <p>
                    Fichier format {row.entityKey} :
                    <b> "{csvFormatToFileNamesMap.get(row.entityFormat)}" </b>
                    <div className={"btn-group"}>
                        <Button variant="primary" size="sm"
                                onClick={() => setShowCsvTableResults(!showCsvTableResults)}>
                            {showCsvTableResults ? <BiShow/> : <BiHide/>}
                            &nbsp;
                            {row.totalInCsv} records
                        </Button>
                        {row.totalDuplicatesInCsv > 0 ?
                            <Button variant="warning" size="sm"
                                    onClick={() => setShowCsvDuplicates(!showCsvDuplicates)}>
                                {showCsvDuplicates ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                {row.totalDuplicatesInCsv} duplicates
                            </Button>
                            : null
                        }
                    </div>
                </p>
                {showCsvTableResults ?
                    <CsvTableResults
                        csvResultsData={csvParseResults.get(csvFormatToFileNamesMap.get(row.entityFormat)).data}
                        csvResultsMetaFields={csvParseResults.get(csvFormatToFileNamesMap.get(row.entityFormat)).meta.fields}
                    /> : null
                }
                {showCsvDuplicates && row.totalDuplicatesInCsv > 0 ?
                    <ImportCsvDuplicates
                        csvResultsData={csvParseResults.get(csvFormatToFileNamesMap.get(row.entityFormat)).data}
                        csvResultsMetaFields={csvParseResults.get(csvFormatToFileNamesMap.get(row.entityFormat)).meta.fields}
                        duplicateLines={row.duplicateLines}
                    />
                    : null
                }
                {entityToCsvErrors[row.entityKey].length > 0 ?
                    <ImportCsvErrors
                        targetCsvTemplate={row.entityFormat}
                        csvFormatToFileNamesMap={csvFormatToFileNamesMap}
                        csvResults={csvParseResults.get(csvFormatToFileNamesMap.get(row.entityFormat))}
                        importCsvErrorList={entityToCsvErrors[row.entityKey]}
                    />
                    : <>Horaire ! il n'y a pas d'erreur à afficher !</>
                }
            </div>
        ),
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
        dataField: "entityKey",
        text: "Key",
        hidden: true,
    }, {
        dataField: "entityFormat.label",
        text: "Modèle d'entité",
        classes: 'alert alert-primary',
    }, {
        dataField: "totalInDatabase",
        text: "Total en BDD",
        classes: (cell) => {
            if (cell > 0) {
                return 'alert alert-info';
            }
            return 'alert alert-warning';
        },
    }, {
        dataField: "totalInCsv",
        text: "Total en CSV",
        classes: (cell) => {
            if (cell > 0) {
                return 'alert alert-info';
            }
            return '';
        },
    }, {
        dataField: "totalInserted",
        text: "Inséré",
        classes: (cell) => {
            if (cell > 0) {
                return 'alert alert-success';
            }
            return '';
        },
    }, {
        dataField: "totalDuplicatesInCsv",
        text: "Doublons en CSV",
        classes: (cell) => {
            if (cell > 0) {
                return 'alert alert-warning';
            }
            return '';
        }
    }, {
        dataField: "totalMergedWithDatabase",
        text: "Déjà en BDD",
        classes: (cell) => {
            if (cell > 0) {
                return 'alert alert-info';
            }
            return '';
        },
    }, {
        dataField: "totalLineErrors",
        text: "Erreurs d'insertion",
        classes: (cell) => {
            if (cell > 0) {
                return 'alert alert-danger';
            }
            return '';
        }
    },
    ];

    return (
        <div className="d-flex justify-content-center">
            <div className="card">
                <div className="card-body">
                    <ListGroup.Item variant={"success"}>
                        <h4 className="card-title">Insertion dans la base de données réussie !!
                            <br/>
                            Récapitulatif d'importation: </h4>
                    </ListGroup.Item>
                    <div className="card-text">
                        <BootstrapTable
                            bootstrap4={true}
                            keyField='entityKey'
                            data={data}
                            columns={columns}
                            pagination={paginationFactory(paginationOptions(data.length))}
                            wrapperClasses="table-responsive"
                            noDataIndication='No data to display'
                            expandRow={expandRow}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}