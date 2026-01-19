import React from 'react';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {dateFilter, textFilter} from 'react-bootstrap-table2-filter';
import {Alert, OverlayTrigger} from "react-bootstrap";

import 'react-datepicker/dist/react-datepicker.css';
import {Audio} from "react-loading-icons";
import {chercheurColumnSingle, paginationOptions} from "../../util/BootStrapTableOptions";
import {ImFilter} from "react-icons/im";
import {AiFillDelete, AiOutlinePlusCircle} from "react-icons/ai";
import {GrDocumentCsv} from "react-icons/gr";

import {fetchListContracts, fetchResearcherContracts} from "../../../services/Other/contract/ContractActions";
import ContractDelete from "./ContractDelete";
import ContractAdd from "./ContractAdd";
import Tooltip from "react-bootstrap/Tooltip";

// If targetResearcher is set in props display related information only (
// else load list des tous les contrats du database
function ContractList(props) {
    // parameter constant (List Template)
    const targetResearcher = props.targetResearcher;

    // Cached state (List Template)
    const [contractList, setContractList] = React.useState(null);

    // UI states (List Template)
    const [successAlert, setSuccessAlert] = React.useState('');
    const [errorAlert, setErrorAlert] = React.useState('');
    const [showFilter, setShowFilter] = React.useState(false);
    const {SearchBar} = Search;


    // Form state (List Template)
    const [targetContract, setTargetContract] = React.useState(false);
    const [showContractAdd, setShowContractAdd] = React.useState(false);
    const [showContractDelete, setShowContractDelete] = React.useState(false);
    const [listChangeCount, setListChangeCount] = React.useState(0);


    const handleHideModal = (msg = null) => {
        setShowContractAdd(false);
        setShowContractDelete(false);
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
            setSuccessAlert(messages.successMsg)
        }

        if (messages.errorMsg) {
            setErrorAlert(messages.errorMsg)
        }
    }


    React.useEffect(() => {
        if (!targetResearcher) {
            // attention that method always change reference to variable not only its content
            fetchListContracts().then(list => {
                setContractList(list)
            })
        } else
            fetchResearcherContracts(targetResearcher.researcherId)
                .then(list => setContractList(list))
    }, [listChangeCount, targetResearcher]);


    if (!contractList) {
        return <div className="d-flex align-items-center justify-content-center">
            <Audio stroke={"black"}/>
        </div>
    } else {
        if (contractList.length === 0) {
            return <div className={"row"}>
                <br/>
                <div className={"col-8"}>
                    <h3>Aucun contrat n'est enregistré</h3>
                </div>
                <div className={"col-4"}>
                    {showContractAdd &&
                        <ContractAdd targetResearcher={targetResearcher} onHideAction={handleHideModal}/>}
                    <button className="btn btn-success" data-bs-toggle="button"
                            onClick={() => setShowContractAdd(true)}>
                        <AiOutlinePlusCircle/> &nbsp; Ajouter un contrat
                    </button>
                </div>
            </div>;
        }
        const deleteTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Supprimer le contrat
            </Tooltip>
        )
        const columns = [{
            dataField: 'contractId',
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
                            setTargetContract(row)
                            setShowContractDelete(true)
                        }}><AiFillDelete/></button>
                    </OverlayTrigger>
                    &nbsp;  &nbsp;
                    {row.contractId}
                </div>)
            }
        }, {
            dataField: 'status.statusName',
            text: 'Status',
            sort: true,
            filter: showFilter ? textFilter() : null,
        },{
            dataField: 'contractType.contractTypeName',
            text: 'Type de contrat',
            sort: true,
            filter: showFilter ? textFilter() : null,
        },{
            dataField: 'startContract',
            text: 'Départ',
            sort: true,
            filter: showFilter ? dateFilter() : null,
        }, {
            dataField: 'endContract',
            text: 'Fin',
            sort: true,
            filter: showFilter ? dateFilter() : null,
        }, {
            dataField: 'functionContract',
            text: 'Fonction',
            sort: true,
        }];

        let title = "Contrat"
        if (!targetResearcher) {
            columns.push(chercheurColumnSingle)
            title = "Liste des contrats pour les Chercheurs"
        }
        const CaptionElement = <div>
            <h3> {title} - &nbsp;
                <button className={"border-0"}
                        onClick={(e) => setShowFilter(!showFilter)}>{
                    <ImFilter/>}
                </button>
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
                    keyField="contractId"
                    data={contractList}
                    columns={columns}
                    exportCSV={{
                        fileName: 'contractList.csv',
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
                                        {showContractAdd &&
                                            <ContractAdd targetResearcher={targetResearcher}
                                                          onHideAction={handleHideModal}/>}
                                        {showContractDelete &&
                                            <ContractDelete targetContract={targetContract}
                                                             onHideAction={handleHideModal}/>}
                                        <button className="btn btn-success" data-bs-toggle="button"
                                                onClick={() => setShowContractAdd(true)}>
                                            <AiOutlinePlusCircle/> &nbsp; Ajouter un contrat
                                        </button>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className={"col-4"}>
                                        {showFilter && <SearchBar {...props.searchProps} />}
                                    </div>
                                    <div className={"col-4"}>
                                        <h3>{showFilter && <MyExportCSV  {...props.csvProps}/>}</h3>
                                    </div>
                                    <div className={"col-4"}>
                                        {successAlert && <Alert variant={"success"}
                                                                        onClose={() => setSuccessAlert("")}
                                                                        dismissible={true}>{successAlert}</Alert>}
                                        {errorAlert && <Alert variant={"danger"}
                                                                      onClose={() => setErrorAlert("")}
                                                                      dismissible={true}>{errorAlert}</Alert>}
                                    </div>
                                </div>
                                <hr/>
                                <BootstrapTable
                                    bootstrap4
                                    filter={filterFactory()}
                                    pagination={paginationFactory(paginationOptions(contractList.length))}
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

export default ContractList;