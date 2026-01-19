import React from 'react';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {dateFilter} from 'react-bootstrap-table2-filter';
import {Alert, OverlayTrigger} from "react-bootstrap";

import 'react-datepicker/dist/react-datepicker.css';
import {Hearts} from "react-loading-icons";
import {chercheursColumnOfActivity, paginationOptions} from "../../util/BootStrapTableOptions";
import {MdSearch} from "react-icons/md";
import {AiFillDelete, AiOutlinePlusCircle} from "react-icons/ai";
import {GrDocumentCsv} from "react-icons/gr";
import InternationalCollaborationAdd from "./InternationalCollaborationAdd";

import ActivityTypes from "../../../const/ActivityTypes";
import {
    fetchListInternationalCollaborations
} from "../../../services/Activity/international-collaboration/InternationalCollaborationActions";
import {fetchResearcherActivities} from "../../../services/Researcher/ResearcherActions";
import InternationalCollaborationDelete from "./InternationalCollaborationDelete";
import Tooltip from "react-bootstrap/Tooltip";

// If targetResearcher is set in props display related information only (
// else load list des tous les internationalCollaborations du database
function InternationalCollaborationList(props) {
    // parameter constant (List Template)
    const targetResearcher = props.targetResearcher;

    // Cached state (List Template)
    const [internationalCollaborationList, setInternationalCollaborationList] = React.useState(null);

    // UI states (List Template)
    const [successActivityAlert, setSuccessActivityAlert] = React.useState('');
    const [errorActivityAlert, setErrorActivityAlert] = React.useState('');
    const [showFilter, setShowFilter] = React.useState(false);
    const {SearchBar} = Search;


    // Form state (List Template)
    const [targetInternationalCollaboration, setTargetInternationalCollaboration] = React.useState(false);
    const [showInternationalCollaborationAdd, setShowInternationalCollaborationAdd] = React.useState(false);
    const [showInternationalCollaborationDelete, setShowInternationalCollaborationDelete] = React.useState(false);
    const [listChangeCount, setListChangeCount] = React.useState(0);


    const handleHideModal = (msg = null) => {
        setShowInternationalCollaborationAdd(false);
        setShowInternationalCollaborationDelete(false);
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
            fetchListInternationalCollaborations().then(list => setInternationalCollaborationList(list))
        } else
            fetchResearcherActivities(targetResearcher.researcherId)
                .then(list => {
                    setInternationalCollaborationList(list.filter(a => a.idTypeActivity === ActivityTypes.NATIONAL_INTERNATIONAL_COLLABORATION));
                })
    }, [listChangeCount, targetResearcher]);


    if (!internationalCollaborationList) {
        return <div className="d-flex align-items-center justify-content-center">
            <Hearts fill={"grey"}/>
        </div>
    } else {
        if (internationalCollaborationList.length === 0) {
            return <div className={"row"}>
                <br/>
                <div className={"col-8"}>
                    <h3>Aucune collaboration internationale est enregistrée</h3>
                </div>
                <div className={"col-4"}>
                    {showInternationalCollaborationAdd &&
                        <InternationalCollaborationAdd targetResearcher={targetResearcher}
                                                       onHideAction={handleHideModal}/>}
                    <button className="btn btn-primary" data-bs-toggle="button"
                            onClick={() => setShowInternationalCollaborationAdd(true)}>
                        <AiOutlinePlusCircle/> &nbsp; Ajouter une internationalCollaboration
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
                            setTargetInternationalCollaboration(row)
                            setShowInternationalCollaborationDelete(true)
                        }}><AiFillDelete/></button>
                    </OverlayTrigger>
                    &nbsp;  &nbsp;
                    {row.idActivity}
                </div>)
            }
        }, {
            dataField: 'internationalCollaboration.projectTitle',
            text: 'Titre de projet',
            sort: true,
        }, {
            dataField: 'internationalCollaboration.countryStateCity',
            text: 'État Ville',
            sort: true,
        }, {
            dataField: 'internationalCollaboration.partnerEntity',
            text: 'Entité partenaire',
            sort: true,
        }, {
            dataField: 'internationalCollaboration.dateProjectStart',
            text: 'date de début',
            sort: true,
            filter: showFilter ? dateFilter() : null,
        }, {
            dataField: 'internationalCollaboration.piPartners',
            text: 'Les partenaires pi',
            hidden: true, // for csv only
        }, {
            dataField: 'internationalCollaboration.mailPartners',
            text: 'Messagerie de Partenaires',
            hidden: true, // for csv only
        }, {
            dataField: 'internationalCollaboration.strategicRecurringCollab',
            text: 'Collaboration stratégique récurrente',
            hidden: true, // for csv only
        }, {
            dataField: 'internationalCollaboration.activeProject',
            text: 'Projet actif',
            hidden: true, // for csv only
        }, {
            dataField: 'internationalCollaboration.associatedFunding',
            text: 'Financement associé',
            hidden: true, // for csv only
        }, {
            dataField: 'internationalCollaboration.numberResultingPublications',
            text: 'nombre Publications résultantes',
            hidden: true, // for csv only
        }, {
            dataField: 'internationalCollaboration.refJointPublication',
            text: 'réf Publication conjointe',
            hidden: true, // for csv only
        }, {
            dataField: 'internationalCollaboration.umrCoordinated',
            text: 'umr Coordonné',
            hidden: true, // for csv only
        }, {
            dataField: 'internationalCollaboration.agreementSigned',
            text: 'accord signé',
            hidden: true, // for csv only
        },];

        let title = "InternationalCollaboration"
        columns.push(chercheursColumnOfActivity)
        title = "Liste des internationalCollaborations pour les Chercheurs"
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
                    data={internationalCollaborationList}
                    columns={columns}
                    exportCSV={{
                        fileName: 'internationalCollaborationList.csv',
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
                                        {showInternationalCollaborationAdd &&
                                            <InternationalCollaborationAdd targetResearcher={targetResearcher}
                                                                           onHideAction={handleHideModal}/>}
                                        {showInternationalCollaborationDelete &&
                                            <InternationalCollaborationDelete
                                                targetInternationalCollaboration={targetInternationalCollaboration}
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
                                                onClick={() => setShowInternationalCollaborationAdd(true)}>
                                            <AiOutlinePlusCircle/> &nbsp; Ajouter une internationalCollaboration
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
                                    pagination={paginationFactory(paginationOptions(internationalCollaborationList.length))}
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

export default InternationalCollaborationList;
