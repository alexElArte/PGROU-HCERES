import React from 'react';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { dateFilter, numberFilter } from 'react-bootstrap-table2-filter';
import { Alert, OverlayTrigger } from "react-bootstrap";

import 'react-datepicker/dist/react-datepicker.css';
import { Grid } from "react-loading-icons";
import { chercheursColumnOfActivity, paginationOptions } from "../../util/BootStrapTableOptions";
import { MdSearch } from "react-icons/md";
import { AiFillDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { GrDocumentCsv } from "react-icons/gr";
import TrainingThesisAdd from "./TrainingThesisAdd";

import ActivityTypes from "../../../const/ActivityTypes";
import { fetchListTrainingTheses } from "../../../services/Activity/training-thesis/TrainingThesisActions";
import { fetchResearcherActivities } from "../../../services/Researcher/ResearcherActions";
import TrainingThesisDelete from "./TrainingThesisDelete";
import Tooltip from "react-bootstrap/Tooltip";

// If targetResearcher is set in props display related information only (
// else load list des toutes les trainingTheses du database
function TrainingThesisList(props) {
    // parameter constant (List Template)
    const targetResearcher = props.targetResearcher;

    // Cached state (List Template)
    const [trainingThesisList, setTrainingThesisList] = React.useState(null);

    // UI states (List Template)
    const [successActivityAlert, setSuccessActivityAlert] = React.useState('');
    const [errorActivityAlert, setErrorActivityAlert] = React.useState('');
    const [showFilter, setShowFilter] = React.useState(false);
    const { SearchBar } = Search;

    // Form state (List Template)
    const [targetTrainingThesis, setTargetTrainingThesis] = React.useState(false);
    const [showTrainingThesisAdd, setShowTrainingThesisAdd] = React.useState(false);
    const [showTrainingThesisDelete, setShowTrainingThesisDelete] = React.useState(false);
    const [listChangeCount, setListChangeCount] = React.useState(0);

    const handleHideModal = (msg = null) => {
        setShowTrainingThesisAdd(false);
        setShowTrainingThesisDelete(false);
        if (msg) {
            // an add or delete did occur
            // re render the table to load new data
            // note the list change count on dependencies table of use effect
            setListChangeCount(listChangeCount + 1)
        }
        displayResultMessage(msg);
    };

    const displayResultMessage = (messages = null) => {
        // silent close
        if (!messages) return;

        if (messages.successMsg) {
            setSuccessActivityAlert(messages.successMsg)
        }

        if (messages.errorMsg) {
            setErrorActivityAlert(messages.errorMsg)
        }
    }

    React.useEffect(() => {
            fetchListTrainingTheses().then(list => {
                if (!targetResearcher) {
                    setTrainingThesisList(list);
                } else {
                    const filtered = list.filter(a =>
                        Array.isArray(a.researcherList) &&
                        a.researcherList.some(r => r.researcherId === targetResearcher.researcherId)
                    );
                    setTrainingThesisList(filtered);
                }
            });
        }, [listChangeCount, targetResearcher]);


    if (!trainingThesisList) {
        return <div className="d-flex align-items-center justify-content-center">
            <Grid fill={"grey"} />
        </div>
    } else {
        if (trainingThesisList.length === 0) {
            return <div className={"row"}>
                <br />
                <div className={"col-8"}>
                    <h3>No Training Thesis saved</h3>
                </div>
                <div className={"col-4"}>
                    {showTrainingThesisAdd &&
                        <TrainingThesisAdd targetResearcher={targetResearcher} onHideAction={handleHideModal} />}
                    <button className="btn btn-primary" data-bs-toggle="button"
                        onClick={() => setShowTrainingThesisAdd(true)}>
                        <AiOutlinePlusCircle /> &nbsp; Add a Training Thesis
                    </button>
                </div>
            </div>;
        }
        const deleteTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Delete the activity
            </Tooltip>
        );

        const columns = [{
            dataField: 'idActivity',
            text: 'ID',
            sort: true,
            formatter: (cell, row) => {
                return (<div>
                    <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={deleteTooltip}
                    >
                        <button className="btn btn-outline-danger btn-sm" onClick={() => {
                            setTargetTrainingThesis(row)
                            setShowTrainingThesisDelete(true)
                        }}><AiFillDelete /></button>
                    </OverlayTrigger>
                    &nbsp;  &nbsp;
                    {row.idActivity}
                </div>)
            }
        }, {
            dataField: 'trainingThesis.thesisStart',
            text: 'Start Date',
            sort: true,
            filter: showFilter ? dateFilter() : null,
        },
        {
            dataField: 'trainingThesis.thesisDuration',
            text: 'Duration (years)',
            sort: true,
            filter: showFilter ? numberFilter() : null,
        },
        {
            dataField: 'trainingThesis.thesisTypeId',
            text: 'Thesis Type (ID)',
            sort: true,
            filter: showFilter ? numberFilter() : null,
        },
        {
            dataField: 'trainingThesis.thesisMainFunding',
            text: 'Main Funding',
            sort: true,
        },
        {
            dataField: 'trainingThesis.thesisDefenseDate',
            text: 'Defense Date',
            sort: true,
            filter: showFilter ? dateFilter() : null,
        },
        {
            dataField: 'trainingThesis.thesisFutur',
            text: 'Future after Thesis',
            sort: true,
        },
        {
            dataField: 'trainingThesis.thesisNumberArticles',
            text: 'Number of Articles',
            sort: true,
            filter: showFilter ? numberFilter() : null,
        },
        {
            dataField: 'trainingThesis.thesisNumberArticlesFirstSecondPosition',
            text: 'Articles (1st/2nd Position)',
            sort: true,
      
            filter: showFilter ? numberFilter() : null,
        },
        {
            dataField: 'trainingThesis.thesisArticlesFirstSecondPositionReferences',
            text: 'Article References (1st/2nd Position)',
            hidden : true,
            sort: true,
        },
        {
            dataField: 'trainingThesis.phdStudentId.phdStudentSurname',
            text: 'PhD Student Last Name',
            sort: true,
        },
        {
            dataField: 'trainingThesis.phdStudentId.phdStudentName',
            text: 'PhD Student First Name',
            sort: true,
        }
        ];

        let title = "TrainingThesis"
        if (!targetResearcher) {
            columns.push(chercheursColumnOfActivity)
            title = "List of theses for researchers"
        }
        const CaptionElement = <div>
            <h3> {title}
            </h3>
        </div>

        const MyExportCSV = (props) => {
            const handleClick = () => {
                props.onExport();
            };
            return (
                <button className={"border-0"}
                    onClick={handleClick}>{
                        <GrDocumentCsv />}
                </button>
            );
        };
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true
        };

        return (
            <div>
                <ToolkitProvider
                    bootstrap4
                    keyField="idActivity"
                    data={trainingThesisList}
                    columns={columns}
                    exportCSV={{
                        fileName: 'trainingThesisList.csv',
                        onlyExportSelection: true,
                        exportAll: true
                    }}
                    search
                >
                    {
                        props => (
                            <div>
                                <br />
                                <div className={"row"}>
                                    <div className={"col-8"}>
                                        <h3>{CaptionElement}</h3>
                                    </div>
                                    <div className={"col-4"}>
                                        {showTrainingThesisAdd &&
                                            <TrainingThesisAdd targetResearcher={targetResearcher}
                                                onHideAction={handleHideModal} />}
                                        {showTrainingThesisDelete &&
                                            <TrainingThesisDelete
                                                targetTrainingThesis={targetTrainingThesis}
                                                onHideAction={handleHideModal} />}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <button className={"border-0 btn-lg"}
                                            onClick={(e) => setShowFilter(!showFilter)}>{
                                                <MdSearch />}
                                        </button>
                                    </div>
                                    <div className="col-4">
                                        <h3>{<MyExportCSV  {...props.csvProps} />}</h3>
                                    </div>
                                    <div className="col-4">
                                        <button className="btn btn-primary" data-bs-toggle="button"
                                            onClick={() => setShowTrainingThesisAdd(true)}>
                                            <AiOutlinePlusCircle /> &nbsp; Add a Training Thesis
                                        </button>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className={"col-4"}>
                                        {showFilter && <SearchBar {...props.searchProps} />}
                                    </div>
                                    <div className={"col-8"}>
                                        {successActivityAlert && <Alert variant={"success"}
                                            onClose={() => setSuccessActivityAlert("")}
                                            dismissible={true}>{successActivityAlert}</Alert>}
                                        {errorActivityAlert && <Alert variant={"danger"}
                                            onClose={() => setErrorActivityAlert("")}
                                            dismissible={true}>{errorActivityAlert}</Alert>}
                                    </div>
                                </div>
                                <hr />
                                <BootstrapTable
                                    bootstrap4
                                    filter={filterFactory()}
                                    pagination={paginationFactory(paginationOptions(trainingThesisList.length))}
                                    striped
                                    hover
                                    condensed
                                    selectRow={selectRow}
                                    {...props.baseProps} />
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div>
        );
    }
}

export default TrainingThesisList;
