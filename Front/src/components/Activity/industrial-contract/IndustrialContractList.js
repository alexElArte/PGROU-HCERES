import React from 'react';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {dateFilter, numberFilter} from 'react-bootstrap-table2-filter';
import {Alert, OverlayTrigger} from "react-bootstrap";

import 'react-datepicker/dist/react-datepicker.css';
import {Grid} from "react-loading-icons";
import {chercheursColumnOfActivity, paginationOptions} from "../../util/BootStrapTableOptions";
import {MdSearch} from "react-icons/md";
import {AiFillDelete, AiOutlinePlusCircle} from "react-icons/ai";
import {GrDocumentCsv} from "react-icons/gr";
import IndustrialContractAdd from "./IndustrialContractAdd";

import ActivityTypes from "../../../const/ActivityTypes";
import {fetchListIndustrialContracts} from "../../../services/Activity/industrial-contract/IndustrialContractActions";
import {fetchResearcherActivities} from "../../../services/Researcher/ResearcherActions";
import IndustrialContractDelete from "./IndustrialContractDelete";
import Tooltip from "react-bootstrap/Tooltip";

// If targetResearcher is set in props display related information only (
// else load list des tous les industrialContracts du database
function IndustrialContractList(props) {
    // parameter constant (List Template)
    const targetResearcher = props.targetResearcher;

    // Cached state (List Template)
    const [industrialContractList, setIndustrialContractList] = React.useState(null);

    // UI states (List Template)
    const [successActivityAlert, setSuccessActivityAlert] = React.useState('');
    const [errorActivityAlert, setErrorActivityAlert] = React.useState('');
    const [showFilter, setShowFilter] = React.useState(false);
    const {SearchBar} = Search;


    // Form state (List Template)
    const [targetIndustrialContract, setTargetIndustrialContract] = React.useState(false);
    const [showIndustrialContractAdd, setShowIndustrialContractAdd] = React.useState(false);
    const [showIndustrialContractDelete, setShowIndustrialContractDelete] = React.useState(false);
    const [listChangeCount, setListChangeCount] = React.useState(0);


    const handleHideModal = (msg = null) => {
        setShowIndustrialContractAdd(false);
        setShowIndustrialContractDelete(false);
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
           fetchListIndustrialContracts().then(list => {
               if (!targetResearcher) {
                   setIndustrialContractList(list);
               } else {
                   const filtered = list.filter(a =>
                       Array.isArray(a.researcherList) &&
                       a.researcherList.some(r => r.researcherIds === targetResearcher.researcherIds)
                   );
                   setIndustrialContractList(filtered);
               }
           });
       }, [listChangeCount, targetResearcher]);


    if (!industrialContractList) {
        return <div className="d-flex align-items-center justify-content-center">
            <Grid fill={"grey"}/>
        </div>
    } else {
        if (industrialContractList.length === 0) {
            return <div className={"row"}>
                <br/>
                <div className={"col-8"}>
                    <h3>No Industrial R&D contracts saved </h3>
                </div>
                <div className={"col-4"}>
                    {showIndustrialContractAdd &&
                        <IndustrialContractAdd targetResearcher={targetResearcher} onHideAction={handleHideModal}/>}
                    <button className="btn btn-primary" data-bs-toggle="button"
                            onClick={() => setShowIndustrialContractAdd(true)}>
                        <AiOutlinePlusCircle/> &nbsp; Add a Industrial R&D contract
                    </button>
                </div>
            </div>;
        }
        const deleteTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Delete activity
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
                        delay={{show: 250, hide: 400}}
                        overlay={deleteTooltip}
                    >
                        <button className="btn btn-outline-danger btn-sm" onClick={() => {
                            setTargetIndustrialContract(row)
                            setShowIndustrialContractDelete(true)
                        }}><AiFillDelete/></button>
                    </OverlayTrigger>
                    &nbsp;  &nbsp;
                    {row.idActivity}
                </div>)
            }
        }, {
            dataField: 'seiIndustrialRDContract.projectTitle',
            text: 'Project Title',
            sort: true,
        }, {
            dataField: 'seiIndustrialRDContract.nameCompanyInvolved',
            text: 'Company Name',
            sort: true,
        }, {
            dataField: 'seiIndustrialRDContract.agreementAmount',
            text: 'Agreement Amount',
            sort: true,
            filter: showFilter ? numberFilter() : null,
        }, {
            dataField: 'seiIndustrialRDContract.associatedPubliRef',
            text: 'Associated Publication reference',
            sort: true,
        }, {
            dataField: 'seiIndustrialRDContract.startDate',
            text: 'Departure Date',
            sort: true,
            filter: showFilter ? dateFilter() : null,
        }, {
            dataField: 'seiIndustrialRDContract.endDate',
            text: 'End Date',
            sort: true,
            filter: showFilter ? dateFilter() : null,
        }];

        let title = "IndustrialContract"
        if (!targetResearcher) {
            columns.push(chercheursColumnOfActivity)
            title = "Industrial R&D contracts List for researcher"
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
                    <GrDocumentCsv/>}
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
                    data={industrialContractList}
                    columns={columns}
                    exportCSV={{
                        fileName: 'industrialContractList.csv',
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
                                        {showIndustrialContractAdd &&
                                            <IndustrialContractAdd targetResearcher={targetResearcher}
                                                                   onHideAction={handleHideModal}/>}
                                        {showIndustrialContractDelete &&
                                            <IndustrialContractDelete
                                                targetIndustrialContract={targetIndustrialContract}
                                                onHideAction={handleHideModal}/>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <button className={"border-0 btn-lg"}
                                                onClick={(e) => setShowFilter(!showFilter)}>{
                                            <MdSearch/>}
                                        </button>
                                    </div>
                                    <div className="col-4">
                                        <h3>{<MyExportCSV  {...props.csvProps}/>}</h3>
                                    </div>
                                    <div className="col-4">
                                        <button className="btn btn-primary" data-bs-toggle="button"
                                                onClick={() => setShowIndustrialContractAdd(true)}>
                                            <AiOutlinePlusCircle/> &nbsp; add a Industrial R&D contract
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
                                <hr/>
                                <BootstrapTable
                                    bootstrap4
                                    filter={filterFactory()}
                                    pagination={paginationFactory(paginationOptions(industrialContractList.length))}
                                    striped
                                    hover
                                    condensed
                                    selectRow={ selectRow }
                                    {...props.baseProps} />
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div>
        );
    }
}

export default IndustrialContractList;
