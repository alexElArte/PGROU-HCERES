import React from 'react';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {dateFilter, numberFilter, textFilter} from 'react-bootstrap-table2-filter';
import {Alert, OverlayTrigger} from "react-bootstrap";

import 'react-datepicker/dist/react-datepicker.css';
import {Audio} from "react-loading-icons";
import {chercheursColumnOfActivity, paginationOptions} from "../../util/BootStrapTableOptions";
import {MdSearch} from "react-icons/md";
import {AiFillDelete, AiOutlinePlusCircle} from "react-icons/ai";
import {GrDocumentCsv} from "react-icons/gr";

import ActivityTypes from "../../../const/ActivityTypes";
import {fetchListPatents} from "../../../services/Activity/patent/PatentActions";
import {fetchResearcherActivities} from "../../../services/Researcher/ResearcherActions";
import PatentDelete from "./PatentDelete";
import PatentAdd from "./PatentAdd";
import Tooltip from "react-bootstrap/Tooltip";

// If targetResearcher is set in props display related information only (
// else load list des tous les patents du database
function PatentList(props) {
    // parameter constant (List Template)
    const targetResearcher = props.targetResearcher;

    // Cached state (List Template)
    const [patentList, setPatentList] = React.useState(null);

    // UI states (List Template)
    const [successActivityAlert, setSuccessActivityAlert] = React.useState('');
    const [errorActivityAlert, setErrorActivityAlert] = React.useState('');
    const [showFilter, setShowFilter] = React.useState(false);
    const {SearchBar} = Search;


    // Form state (List Template)
    const [targetPatent, setTargetPatent] = React.useState(false);
    const [showPatentAdd, setShowPatentAdd] = React.useState(false);
    const [showPatentDelete, setShowPatentDelete] = React.useState(false);
    const [listChangeCount, setListChangeCount] = React.useState(0);


    const handleHideModal = (msg = null) => {
        setShowPatentAdd(false);
        setShowPatentDelete(false);
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
            fetchListPatents().then(list => setPatentList(list))
        } else
            fetchResearcherActivities(targetResearcher.researcherId)
                .then(list => {
                    setPatentList(list.filter(a => a.idTypeActivity === ActivityTypes.PATENT_LICENCE_INVENTION_DISCLOSURE));
                })
    }, [listChangeCount, targetResearcher]);


    if (!patentList) {
        return <div className="d-flex align-items-center justify-content-center">
            <Audio stroke={"black"}/>
        </div>
    } else {
        if (patentList.length === 0) {
            return <div className={"row"}>
                <br/>
                <div className={"col-8"}>
                    <h3>Aucun Brevet n'est enregistré</h3>
                </div>
                <div className={"col-4"}>
                    {showPatentAdd &&
                        <PatentAdd targetResearcher={targetResearcher} onHideAction={handleHideModal}/>}
                    <button className="btn btn-primary" data-bs-toggle="button"
                            onClick={() => setShowPatentAdd(true)}>
                        <AiOutlinePlusCircle/> &nbsp; Ajouter un Brevet
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
                            setTargetPatent(row)
                            setShowPatentDelete(true)
                        }}><AiFillDelete/></button>
                    </OverlayTrigger>
                    &nbsp;  &nbsp;
                    {row.idActivity}
                </div>)
            }
        }, {
            dataField: 'patent.title',
            text: "Titre",
            sort: true,
            // filter: showFilter ? textFilter() : null,
            // hidden: true, // for csv only
        }, {
            dataField: 'patent.registrationDate',
            text: "Date d'inscription",
            sort: true,
            filter: showFilter ? dateFilter() : null,
            // hidden: true, // for csv only
        }, {
            dataField: 'patent.filingDate',
            text: "Date de dépôt",
            sort: true,
            filter: showFilter ? dateFilter() : null,
            hidden: true, // for csv only
        }, {
            dataField: 'patent.acceptationDate',
            text: "Date d'acceptation",
            sort: true,
            filter: showFilter ? dateFilter() : null,
            hidden: true, // for csv only
        }, {
            dataField: 'patent.licensingDate',
            text: "Date de licence",
            sort: true,
            filter: showFilter ? dateFilter() : null,
            hidden: true, // for csv only
        }, {
            dataField: 'patent.inventors',
            text: "Inventeurs",
            sort: true,
            // filter: showFilter ? textFilter() : null,
            // hidden: true, // for csv only
        }, {
            dataField: 'patent.coOwners',
            text: "Copropriétaires",
            sort: true,
            filter: showFilter ? textFilter({placeholder: 'Copropriétaires...'}) : null,
            hidden: true, // for csv only
        }, {
            dataField: 'patent.priorityNumber',
            text: "Numéro de priorité",
            sort: true,
            filter: showFilter ? numberFilter() : null,
            hidden: true, // for csv only
        }, {
            dataField: 'patent.priorityDate',
            text: "Date de priorité",
            sort: true,
            filter: showFilter ? dateFilter() : null,
            hidden: true, // for csv only
        }, {
            dataField: 'patent.publicationNumber',
            text: "Numéro de publication",
            sort: true,
            // filter: showFilter ? textFilter() : null,
            // hidden: true, // for csv only
        }, {
            dataField: 'patent.publicationDate',
            text: "Date de publication",
            sort: true,
            // filter: showFilter ? dateFilter() : null,
            // hidden: true, // for csv only
        }, {
            dataField: 'patent.inpiLink',
            text: "Lien inpi",
            sort: true,
            filter: showFilter ? textFilter({placeholder: 'Lien inpi...'}) : null,
            hidden: true, // for csv only
        }, {
            dataField: 'patent.status',
            text: "Statut",
            sort: true,
            filter: showFilter ? textFilter({placeholder: 'Statut...'}) : null,
            hidden: true, // for csv only
        }, {
            dataField: 'patent.pctExtensionObtained',
            text: "Pct extension obtenue",
            sort: true,
            filter: showFilter ? textFilter({placeholder: 'Pct extension obtenue...'}) : null,
            hidden: true, // for csv only
        }, {
            dataField: 'patent.publicationNumberPctExtension',
            text: "Numéro de publication Pct Extension",
            sort: true,
            filter: showFilter ? textFilter({placeholder: 'Numéro de publication Pct Extension...'}) : null,
            hidden: true, // for csv only
        }, {
            dataField: 'patent.publicationDatePctExtension',
            text: "Publication Date Pct Prolongation",
            sort: true,
            filter: showFilter ? dateFilter() : null,
            hidden: true, // for csv only
        }, {
            dataField: 'patent.internationalExtension',
            text: "Extension internationale",
            sort: true,
            filter: showFilter ? textFilter({placeholder: 'Extension internationale...'}) : null,
            hidden: true, // for csv only
        }, {
            dataField: 'patent.publicationNumberInternationalExtension',
            text: "Numéro de publication Extension internationale",
            sort: true,
            filter: showFilter ? textFilter({placeholder: 'Numéro de publication Extension internationale...'}) : null,
            hidden: true, // for csv only
        }, {
            dataField: 'patent.publicationDateInternationalExtension',
            text: "Date de publication Extension internationale",
            sort: true,
            filter: showFilter ? dateFilter() : null,
            hidden: true, // for csv only
        }, {
            dataField: 'patent.refTransferContract',
            text: "Ref Contrat de Transfert",
            sort: true,
            filter: showFilter ? textFilter({placeholder: 'Ref Contrat de Transfert...'}) : null,
            hidden: true, // for csv only
        }, {
            dataField: 'patent.nameCompanyInvolved',
            text: "Nom Société impliquée",
            sort: true,
            filter: showFilter ? textFilter({placeholder: 'Nom Société impliquée...'}) : null,
            hidden: true, // for csv only
        }, {
            dataField: 'patent.typePatentId.nameChoice',
            text: "Nom Choix",
            sort: true,
            // filter: showFilter ? textFilter() : null,
            // hidden: true, // for csv only
        }];

        let title = "Patent"
        if (!targetResearcher) {
            columns.push(chercheursColumnOfActivity)
            title = "Liste des patents pour les Chercheurs"
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
                    data={patentList}
                    columns={columns}
                    exportCSV={{
                        fileName: 'patentList.csv',
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
                                        {showPatentAdd &&
                                            <PatentAdd targetResearcher={targetResearcher}
                                                       onHideAction={handleHideModal}/>}
                                        {showPatentDelete &&
                                            <PatentDelete targetPatent={targetPatent}
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
                                                onClick={() => setShowPatentAdd(true)}>
                                            <AiOutlinePlusCircle/> &nbsp; Ajouter une patent
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
                                    pagination={paginationFactory(paginationOptions(patentList.length))}
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

export default PatentList;
