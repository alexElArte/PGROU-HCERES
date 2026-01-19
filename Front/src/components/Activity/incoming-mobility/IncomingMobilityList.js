import React from 'react';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {dateFilter} from 'react-bootstrap-table2-filter';
import {Alert, OverlayTrigger} from "react-bootstrap";

import 'react-datepicker/dist/react-datepicker.css';
import {Rings} from "react-loading-icons";
import {chercheursColumnOfActivity, paginationOptions} from "../../util/BootStrapTableOptions";
import {MdSearch} from "react-icons/md";
import {AiFillDelete, AiOutlinePlusCircle} from "react-icons/ai";
import {GrDocumentCsv} from "react-icons/gr";
import IncomingMobilityAdd from "./IncomingMobilityAdd";

import ActivityTypes from "../../../const/ActivityTypes";
import {fetchListIncomingMobilities} from "../../../services/Activity/incoming-mobility/IncomingMobilityActions";
import {fetchResearcherActivities} from "../../../services/Researcher/ResearcherActions";
import IncomingMobilityDelete from "./IncomingMobilityDelete";
import Tooltip from "react-bootstrap/Tooltip";

// If targetResearcher is set in props display related information only (
// else load list des tous les incomingMobilities du database
function IncomingMobilityList(props) {
    // parameter constant (List Template)
    const targetResearcher = props.targetResearcher;

    // Cached state (List Template)
    const [incomingMobilityList, setIncomingMobilityList] = React.useState(null);

    // UI states (List Template)
    const [successActivityAlert, setSuccessActivityAlert] = React.useState('');
    const [errorActivityAlert, setErrorActivityAlert] = React.useState('');
    const [showFilter, setShowFilter] = React.useState(false);
    const {SearchBar} = Search;


    // Form state (List Template)
    const [targetIncomingMobility, setTargetIncomingMobility] = React.useState(false);
    const [showIncomingMobilityAdd, setShowIncomingMobilityAdd] = React.useState(false);
    const [showIncomingMobilityDelete, setShowIncomingMobilityDelete] = React.useState(false);
    const [listChangeCount, setListChangeCount] = React.useState(0);


    const handleHideModal = (msg = null) => {
        setShowIncomingMobilityAdd(false);
        setShowIncomingMobilityDelete(false);
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
            fetchListIncomingMobilities().then(list => setIncomingMobilityList(list))
        } else
            fetchResearcherActivities(targetResearcher.researcherId)
                .then(list => {
                    setIncomingMobilityList(list.filter(a => a.idTypeActivity === ActivityTypes.INCOMING_MOBILITY));
                })
    }, [listChangeCount, targetResearcher]);


    if (!incomingMobilityList) {
        return <div className="d-flex align-items-center justify-content-center">
            <Rings stroke={"black"}/>
        </div>
    } else {
        if (incomingMobilityList.length === 0) {
            return <div className={"row"}>
                <br/>
                <div className={"col-8"}>
                    <h3>Aucune mobilié entrantes n'est enregistrée</h3>
                </div>
                <div className={"col-4"}>
                    {showIncomingMobilityAdd &&
                        <IncomingMobilityAdd targetResearcher={targetResearcher} onHideAction={handleHideModal}/>}
                    <button className="btn btn-primary" data-bs-toggle="button"
                            onClick={() => setShowIncomingMobilityAdd(true)}>
                        <AiOutlinePlusCircle/> &nbsp; Ajouter une mobilité entrante
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
            formatter: (cell, row) => {
                return (<div>
                    <OverlayTrigger
                        placement="bottom"
                        delay={{show: 250, hide: 400}}
                        overlay={deleteTooltip}
                    >
                        <button className="btn btn-outline-danger btn-sm" onClick={() => {
                            setTargetIncomingMobility(row)
                            setShowIncomingMobilityDelete(true)
                        }}><AiFillDelete/></button>
                    </OverlayTrigger>
                    &nbsp;  &nbsp;
                    {row.idActivity}
                </div>)
            }
        }, {
            dataField: 'incomingMobility.nameSeniorScientist',
            text: 'nom Scientifique principal',
            sort: true,
        }, {
            dataField: 'incomingMobility.departureDate',
            text: 'Date de départ',
            sort: true,
        }, {
            dataField: 'incomingMobility.arrivalDate',
            text: 'Date d\'arrivée',
            sort: true,
            filter: showFilter ? dateFilter() : null,
        }, {
            dataField: 'incomingMobility.duration',
            text: 'Durée',
            sort: true,
            filter: showFilter ? dateFilter() : null,
        }, {
            dataField: 'incomingMobility.nationality',
            text: 'Nationalité',
            sort: true,
        }, {
            dataField: 'incomingMobility.originalLabName',
            text: 'Nom du laboratoire d\'origine',
            hidden: true, // for csv only
        }, {
            dataField: 'incomingMobility.originaLabLocation',
            text: 'Emplacement du laboratoire d\'origine',
            hidden: true, // for csv only
        }, {
            dataField: 'incomingMobility.piPartner',
            text: 'Partenaire pi',
            hidden: true, // for csv only
        }, {
            dataField: 'incomingMobility.projectTitle',
            text: 'Titre du projet',
            sort: true
        }, {
            dataField: 'incomingMobility.associatedFunding',
            text: 'Financement associé',
            hidden: true, // for csv only
        }, {
            dataField: 'incomingMobility.publicationReference',
            text: 'Publication Référence',
            hidden: true, // for csv only
        }, {
            dataField: 'incomingMobility.strategicRecurringCollab',
            text: 'Collaboration stratégique récurrente',
            hidden: true, // for csv only
        }, {
            dataField: 'incomingMobility.activeProject',
            text: 'Projet actif',
            hidden: true, // for csv only
        }, {
            dataField: 'incomingMobility.umrCoordinated',
            text: 'umr Coordonné',
            hidden: true, // for csv only
        }, {
            dataField: 'incomingMobility.agreementSigned',
            text: 'Accord signé',
            hidden: true, // for csv only
        },];

        let title = "IncomingMobility"
        if (!targetResearcher) {
            columns.push(chercheursColumnOfActivity)
            title = "Liste des incomingMobilities pour les Chercheurs"
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
                    data={incomingMobilityList}
                    columns={columns}
                    exportCSV={{
                        fileName: 'incomingMobilityList.csv',
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
                                        {showIncomingMobilityAdd &&
                                            <IncomingMobilityAdd targetResearcher={targetResearcher}
                                                                 onHideAction={handleHideModal}/>}
                                        {showIncomingMobilityDelete &&
                                            <IncomingMobilityDelete targetIncomingMobility={targetIncomingMobility}
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
                                                onClick={() => setShowIncomingMobilityAdd(true)}>
                                            <AiOutlinePlusCircle/> &nbsp; Ajouter une incomingMobility
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
                                    pagination={paginationFactory(paginationOptions(incomingMobilityList.length))}
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

export default IncomingMobilityList;
