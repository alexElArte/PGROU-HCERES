import React from 'react';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { dateFilter } from 'react-bootstrap-table2-filter';
import { Alert, OverlayTrigger } from "react-bootstrap";

import 'react-datepicker/dist/react-datepicker.css';
import { ThreeDots } from "react-loading-icons";
import { chercheursColumnOfActivity, paginationOptions } from "../../util/BootStrapTableOptions";
import { MdSearch } from "react-icons/md";
import { AiFillDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { GrDocumentCsv } from "react-icons/gr";
import PostDocAdd from "./PostDocAdd";

import ActivityTypes from "../../../const/ActivityTypes";
import { fetchListPostDocs } from "../../../services/Activity/post-doc/PostDocActions";
import { fetchResearcherActivities } from "../../../services/Researcher/ResearcherActions";
import PostDocDelete from "./PostDocDelete";
import Tooltip from "react-bootstrap/Tooltip";

// If targetResearcher is set in props display related information only (
// else load list des tous les postDocs du database
function PostDocList(props) {
    // parameter constant (List Template)
    const targetResearcher = props.targetResearcher;

    // Cached state (List Template)
    const [postDocList, setPostDocList] = React.useState(null);

    // UI states (List Template)
    const [successActivityAlert, setSuccessActivityAlert] = React.useState('');
    const [errorActivityAlert, setErrorActivityAlert] = React.useState('');
    const [showFilter, setShowFilter] = React.useState(false);
    const { SearchBar } = Search;


    // Form state (List Template)
    const [targetPostDoc, setTargetPostDoc] = React.useState(false);
    const [showPostDocAdd, setShowPostDocAdd] = React.useState(false);
    const [showPostDocDelete, setShowPostDocDelete] = React.useState(false);
    const [listChangeCount, setListChangeCount] = React.useState(0);


    const handleHideModal = (msg = null) => {
        setShowPostDocAdd(false);
        setShowPostDocDelete(false);
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
        fetchListPostDocs().then(list => {
            if (!targetResearcher) {
                setPostDocList(list);
            } else {
                const filtered = list.filter(a =>
                    Array.isArray(a.researcherList) &&
                    a.researcherList.some(r => r.researcherIds === targetResearcher.researcherIds)
                );
                setPostDocList(filtered);
            }
        });
    }, [listChangeCount, targetResearcher]);


    if (!postDocList) {
        return <div className="d-flex align-items-center justify-content-center">
            <ThreeDots stroke={"black"} />
        </div>
    } else {
        if (postDocList.length === 0) {
            return <div className={"row"}>
                <br />
                <div className={"col-8"}>
                    <h3>No Post-docs saved</h3>
                </div>
                <div className={"col-4"}>
                    {showPostDocAdd &&
                        <PostDocAdd targetResearcher={targetResearcher} onHideAction={handleHideModal} />}
                    <button className="btn btn-primary" data-bs-toggle="button"
                        onClick={() => setShowPostDocAdd(true)}>
                        <AiOutlinePlusCircle /> &nbsp; Add a Post-docs
                    </button>
                </div>
            </div>;
        }
        const deleteTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Delete Activity
            </Tooltip>
        )
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
                            setTargetPostDoc(row)
                            setShowPostDocDelete(true)
                        }}><AiFillDelete /></button>
                    </OverlayTrigger>
                    &nbsp;  &nbsp;
                    {row.idActivity}
                </div>)
            }
        }, {
            dataField: 'postDoc.namePostDoc',
            text: 'Name',
            sort: true,
        },
        {
            dataField: 'postDoc.arrivalDate',
            text: 'Arrival Date',
            sort: true,
            filter: showFilter ? dateFilter() : null,
        }, {
            dataField: 'postDoc.departureDate',
            text: 'Departure Date',
            sort: true,
            filter: showFilter ? dateFilter() : null,
        }, {
            dataField: 'postDoc.duration',
            text: 'Duration',
            sort: true,
            hidden: true,
        }, {
            dataField: 'postDoc.nationality',
            text: 'Nationality',
            sort: true,
            hidden: true
        }, {
            dataField: 'postDoc.originalLab',
            text: 'Original Laboritory',
            sort: true,
        }, {
            dataField: 'postDoc.associatedFunding',
            text: 'Associated Funding',
            hidden: true, // for csv only
        }, {
            dataField: 'postDoc.associatedPubliRef',
            text: 'Associated Publication References',
            hidden: true, // for csv only
        }];

        let title = "PostDoc"
        if (!targetResearcher) {
            columns.push(chercheursColumnOfActivity)
            title = "Post-docs list for researcher"
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
                    data={postDocList}
                    columns={columns}
                    exportCSV={{
                        fileName: 'postDocList.csv',
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
                                        {showPostDocAdd &&
                                            <PostDocAdd targetResearcher={targetResearcher}
                                                onHideAction={handleHideModal} />}
                                        {showPostDocDelete &&
                                            <PostDocDelete targetPostDoc={targetPostDoc}
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
                                            onClick={() => setShowPostDocAdd(true)}>
                                            <AiOutlinePlusCircle /> &nbsp; Add a Post-docs
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
                                    pagination={paginationFactory(paginationOptions(postDocList.length))}
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

export default PostDocList;
