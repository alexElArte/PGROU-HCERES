import React from 'react';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {dateFilter} from 'react-bootstrap-table2-filter';
import {Alert, OverlayTrigger} from "react-bootstrap";

import 'react-datepicker/dist/react-datepicker.css';
import {SpinningCircles} from "react-loading-icons";
import {chercheursColumnOfActivity, paginationOptions} from "../../util/BootStrapTableOptions";
import {MdSearch} from "react-icons/md";
import {AiFillDelete, AiOutlinePlusCircle} from "react-icons/ai";
import {GrDocumentCsv} from "react-icons/gr";

import ResearchContractFundedCharitAdd from "./ResearchContractFundedCharitAdd";

import ActivityTypes from "../../../const/ActivityTypes";
import {fetchListResearchContractFundedCharit} from "../../../services/Activity/research-contract-funded-charit/ResearchContractFundedCharitActions";
import {fetchResearcherActivities} from "../../../services/Researcher/ResearcherActions";
import ResearchContractFundedCharitDelete from "./ResearchContractFundedCharitDelete";
import Tooltip from "react-bootstrap/Tooltip";

// If targetResearcher is set in props display related information only
// else load list des tous les ResearchContractFundedCharit du database
function ResearchContractFundedCharitList(props) {
    // parameter constant (List Template)
    const targetResearcher = props.targetResearcher;

    // Cached state (List Template)
    const [researchContractFundedCharitList, setResearchContractFundedCharitList] = React.useState(null);

    // UI states (List Template)
    const [successActivityAlert, setSuccessActivityAlert] = React.useState('');
    const [errorActivityAlert, setErrorActivityAlert] = React.useState('');
    const [showFilter, setShowFilter] = React.useState(false);
    const {SearchBar} = Search;

    // Form state (List Template)
    const [targetResearchContractFundedCharit, setTargetResearchContractFundedCharit] = React.useState(false);
    const [showResearchContractFundedCharitAdd, setShowResearchContractFundedCharitAdd] = React.useState(false);
    const [showResearchContractFundedCharitDelete, setShowResearchContractFundedCharitDelete] = React.useState(false);
    const [listChangeCount, setListChangeCount] = React.useState(0);

    const handleHideModal = (msg = null) => {
        setShowResearchContractFundedCharitAdd(false);
        setShowResearchContractFundedCharitDelete(false);
        if (msg) {
            // un add ou delete a eu lieu → recharger la liste
            setListChangeCount(listChangeCount + 1);
        }
        displayResultMessage(msg);
    };

    const displayResultMessage = (messages = null) => {
        if (!messages) return;

        if (messages.successMsg) {
            setSuccessActivityAlert(messages.successMsg);
        }
        if (messages.errorMsg) {
            setErrorActivityAlert(messages.errorMsg);
        }
    };

    React.useEffect(() => {
            fetchListResearchContractFundedCharit().then(list => {
                if (!targetResearcher) {
                    setResearchContractFundedCharitList(list);
                } else {
                    const filtered = list.filter(a =>
                        Array.isArray(a.researcherList) &&
                        a.researcherList.some(r => r.researcherIds === targetResearcher.researcherIds)
                    );
                    setResearchContractFundedCharitList(filtered);
                }
            });
        }, [listChangeCount, targetResearcher]);

    if (!researchContractFundedCharitList) {
        return (
            <div className="d-flex align-items-center justify-content-center">
                <SpinningCircles fill={"grey"}/>
            </div>
        );
    } else {
        if (researchContractFundedCharitList.length === 0) {
            return (
                <div className={"row"}>
                    <br/>
                    <div className={"col-8"}>
                        <h3> No Research contract funded by public or charitable institutions saved </h3>
                    </div>
                    <div className={"col-4"}>
                        {showResearchContractFundedCharitAdd &&
                            <ResearchContractFundedCharitAdd
                                targetResearcher={targetResearcher}
                                onHideAction={handleHideModal}
                            />
                        }
                        <button
                            className="btn btn-primary"
                            data-bs-toggle="button"
                            onClick={() => setShowResearchContractFundedCharitAdd(true)}
                        >
                            <AiOutlinePlusCircle/> &nbsp; Add a Research contract funded by public or charitable institutions 
                        </button>
                    </div>
                </div>
            );
        }

        const deleteTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Delete activity
            </Tooltip>
        );

        const columns = [{
            dataField: 'idActivity',
            text: 'ID',
            sort: true,
            formatter: (cell, row) => {
                return (
                    <div>
                        <OverlayTrigger
                            placement="bottom"
                            delay={{show: 250, hide: 400}}
                            overlay={deleteTooltip}
                        >
                            <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => {
                                    setTargetResearchContractFundedCharit(row);
                                    setShowResearchContractFundedCharitDelete(true);
                                }}
                            >
                                <AiFillDelete/>
                            </button>
                        </OverlayTrigger>
                        &nbsp;  &nbsp;
                        {row.idActivity}
                    </div>
                );
            }
        }, {
            dataField: 'researchContractFundedCharit.fundingInstitution',
            text: 'Funding Institution',
            sort: true,
        }, {
            dataField: 'researchContractFundedCharit.projectTitle',
            text: 'Project Title',
            sort: true,
        }, {
            dataField: 'researchContractFundedCharit.grantAmount',
            text: 'Grant Amount',
            sort: true,
        }, {
            dataField: 'researchContractFundedCharit.startYear',
            text: 'Start Year',
            sort: true,
        }, {
            dataField: 'researchContractFundedCharit.endYear',
            text: 'End Year',
            sort: true,
        }, {
            dataField: 'researchContractFundedCharit.dateContractAward',
            text: "Contract Date Award",
            sort: true,
            filter: showFilter ? dateFilter() : null,
        }];

        let title = "ResearchContractFundedCharit";
        if (!targetResearcher) {
            columns.push(chercheursColumnOfActivity);
            title = "Research contract funded by public or charitable institutions  List";
        }

        const CaptionElement = (
            <div>
                <h3>{title}</h3>
            </div>
        );

        const MyExportCSV = (props) => {
            const handleClick = () => {
                props.onExport();
            };
            return (
                <button className={"border-0"} onClick={handleClick}>
                    <GrDocumentCsv/>
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
                    data={researchContractFundedCharitList}
                    columns={columns}
                    exportCSV={{
                        fileName: 'researchContractFundedCharitList.csv',
                        onlyExportSelection: true,
                        exportAll: true
                    }}
                    search
                >
                    {
                        props => (
                            <div>
                                <br/>
                                <div className={"row"}>
                                    <div className={"col-8"}>
                                        <h3>{CaptionElement}</h3>
                                    </div>
                                    <div className={"col-4"}>
                                        {showResearchContractFundedCharitAdd &&
                                            <ResearchContractFundedCharitAdd
                                                targetResearcher={targetResearcher}
                                                onHideAction={handleHideModal}
                                            />}
                                        {showResearchContractFundedCharitDelete &&
                                            <ResearchContractFundedCharitDelete
                                                targetResearchContractFundedCharit={targetResearchContractFundedCharit}
                                                onHideAction={handleHideModal}
                                            />}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <button
                                            className={"border-0 btn-lg"}
                                            onClick={() => setShowFilter(!showFilter)}
                                        >
                                            <MdSearch/>
                                        </button>
                                    </div>
                                    <div className="col-4">
                                        <h3><MyExportCSV {...props.csvProps}/></h3>
                                    </div>
                                    <div className="col-4">
                                        <button
                                            className="btn btn-primary"
                                            data-bs-toggle="button"
                                            onClick={() => setShowResearchContractFundedCharitAdd(true)}
                                        >
                                            <AiOutlinePlusCircle/> &nbsp; Add a Research contract funded by public or charitable institutions
                                        </button>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className={"col-4"}>
                                        {showFilter && <SearchBar {...props.searchProps} />}
                                    </div>
                                    <div className={"col-8"}>
                                        {successActivityAlert &&
                                            <Alert
                                                variant={"success"}
                                                onClose={() => setSuccessActivityAlert("")}
                                                dismissible={true}
                                            >
                                                {successActivityAlert}
                                            </Alert>}
                                        {errorActivityAlert &&
                                            <Alert
                                                variant={"danger"}
                                                onClose={() => setErrorActivityAlert("")}
                                                dismissible={true}
                                            >
                                                {errorActivityAlert}
                                            </Alert>}
                                    </div>
                                </div>
                                <hr/>
                                <BootstrapTable
                                    bootstrap4
                                    filter={filterFactory()}
                                    pagination={paginationFactory(
                                        paginationOptions(researchContractFundedCharitList.length)
                                    )}
                                    striped
                                    hover
                                    condensed
                                    selectRow={selectRow}
                                    {...props.baseProps}
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div>
        );
    }
}

export default ResearchContractFundedCharitList;
