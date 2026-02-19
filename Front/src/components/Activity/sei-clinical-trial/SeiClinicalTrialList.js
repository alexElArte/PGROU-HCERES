import React from 'react';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {dateFilter, textFilter} from 'react-bootstrap-table2-filter';
import {Alert, OverlayTrigger} from "react-bootstrap";

import 'react-datepicker/dist/react-datepicker.css';
import {Puff} from "react-loading-icons";
import {chercheursColumnOfActivity, paginationOptions} from "../../util/BootStrapTableOptions";
import {MdSearch} from "react-icons/md";
import {AiFillDelete, AiOutlinePlusCircle} from "react-icons/ai";
import {GrDocumentCsv} from "react-icons/gr";
import SeiClinicalTrialAdd from "./SeiClinicalTrialAdd";

import ActivityTypes from "../../../const/ActivityTypes";
import {fetchListSeiClinicalTrials} from "../../../services/Activity/sei-clinical-trial/SeiClinicalTrialActions";
import {fetchResearcherActivities} from "../../../services/Researcher/ResearcherActions";
import SeiClinicalTrialDelete from "./SeiClinicalTrialDelete";
import Tooltip from "react-bootstrap/Tooltip";

// If targetResearcher is set in props display related information only (
// else load list des tous les seiClinicalTrials du database
function SeiClinicalTrialList(props) {
    // parameter constant (List Template)
    const targetResearcher = props.targetResearcher;

    // Cached state (List Template)
    const [seiClinicalTrialList, setSeiClinicalTrialList] = React.useState(null);

    // UI states (List Template)
    const [successActivityAlert, setSuccessActivityAlert] = React.useState('');
    const [errorActivityAlert, setErrorActivityAlert] = React.useState('');
    const [showFilter, setShowFilter] = React.useState(false);
    const {SearchBar} = Search;


    // Form state (List Template)
    const [targetSeiClinicalTrial, setTargetSeiClinicalTrial] = React.useState(false);
    const [showSeiClinicalTrialAdd, setShowSeiClinicalTrialAdd] = React.useState(false);
    const [showSeiClinicalTrialDelete, setShowSeiClinicalTrialDelete] = React.useState(false);
    const [listChangeCount, setListChangeCount] = React.useState(0);


    const handleHideModal = (msg = null) => {
        setShowSeiClinicalTrialAdd(false);
        setShowSeiClinicalTrialDelete(false);
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
        if (!targetResearcher) {
            // attention that method always change reference to variable not only its content
            fetchListSeiClinicalTrials().then(list => setSeiClinicalTrialList(list))
        } else
            fetchResearcherActivities(targetResearcher.researcherId)
                .then(list => {
                    setSeiClinicalTrialList(list.filter(a => a.idTypeActivity === ActivityTypes.SEI_CLINICAL_TRIAL));
                })
    }, [listChangeCount, targetResearcher]);


    if (!seiClinicalTrialList) {
        return <div className="d-flex align-items-center justify-content-center">
            <Puff stroke={"black"}/>
        </div>
    } else {
        if (seiClinicalTrialList.length === 0) {
            return <div className={"row"}>
                <br/>
                <div className={"col-8"}>
                    <h3>Aucun essai clinique n'est enregistré</h3>
                </div>
                <div className={"col-4"}>
                    {showSeiClinicalTrialAdd &&
                        <SeiClinicalTrialAdd targetResearcher={targetResearcher} onHideAction={handleHideModal}/>}
                    <button className="btn btn-primary" data-bs-toggle="button"
                            onClick={() => setShowSeiClinicalTrialAdd(true)}>
                        <AiOutlinePlusCircle/> &nbsp; Ajouter un essai clinique
                    </button>
                </div>
            </div>;
        }
        const deleteTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Supprimer l'activité
            </Tooltip>
        )
        const columns = [{
            dataField: 'idActivity',
            text: 'ID',
            sort: true,
            filter: showFilter ? textFilter({placeholder: 'ID...'}) : null,
            formatter: (cell, row) => {
                return (<div>
                    <OverlayTrigger
                        placement="bottom"
                        delay={{show: 250, hide: 400}}
                        overlay={deleteTooltip}
                    >
                        <button className="btn btn-outline-danger btn-sm" onClick={() => {
                            setTargetSeiClinicalTrial(row)
                            setShowSeiClinicalTrialDelete(true)
                        }}><AiFillDelete/></button>
                    </OverlayTrigger>
                    &nbsp;  &nbsp;
                    {row.idActivity}
                </div>)
            }
        }, {
            dataField: 'seiClinicalTrial.titleClinicalTrial',
            text: 'Titre',
            sort: true,
        }, {
            dataField: 'seiClinicalTrial.coordinatorPartner',
            text: 'Coordinateur Partenaire',
        }, {
            dataField: 'seiClinicalTrial.startDate',
            text: 'Date de début',
            sort: true,
            filter: showFilter ? dateFilter() : null,
        }, {
            dataField: 'seiClinicalTrial.endDate',
            text: 'Date de fin',
            sort: true,
            filter: showFilter ? dateFilter() : null,
        }, {
            dataField: 'seiClinicalTrial.registrationNb',
            text: 'N° d\'enregistrement',
            sort: true,
        }, {
            dataField: 'seiClinicalTrial.sponsorName',
            text: 'Nom du sponsor',
            sort: true,
        }, {
            dataField: 'seiClinicalTrial.includedPatientsNb',
            text: 'inclus Patients Nb',
            hidden: true, // for csv only
        }, {
            dataField: 'seiClinicalTrial.funding',
            text: 'financement',
            hidden: true, // for csv only
        }, {
            dataField: 'seiClinicalTrial.fundingAmount',
            text: 'Montant du financement',
            hidden: true, // for csv only
        },];

        let title = "SeiClinicalTrial"
        if (!targetResearcher) {
            columns.push(chercheursColumnOfActivity)
            title = "Liste des seiClinicalTrials pour les Chercheurs"
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
                    data={seiClinicalTrialList}
                    columns={columns}
                    exportCSV={{
                        fileName: 'seiClinicalTrialList.csv',
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
                                        {showSeiClinicalTrialAdd &&
                                            <SeiClinicalTrialAdd targetResearcher={targetResearcher}
                                                                 onHideAction={handleHideModal}/>}
                                        {showSeiClinicalTrialDelete &&
                                            <SeiClinicalTrialDelete targetSeiClinicalTrial={targetSeiClinicalTrial}
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
                                                onClick={() => setShowSeiClinicalTrialAdd(true)}>
                                            <AiOutlinePlusCircle/> &nbsp; Ajouter une seiClinicalTrial
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
                                    pagination={paginationFactory(paginationOptions(seiClinicalTrialList.length))}
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

export default SeiClinicalTrialList;
