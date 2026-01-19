import React from 'react';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import {Alert, OverlayTrigger} from "react-bootstrap";

import 'react-datepicker/dist/react-datepicker.css';
import {Circles} from "react-loading-icons";
import {chercheursColumnOfActivity, paginationOptions} from "../../util/BootStrapTableOptions";
import {MdSearch} from "react-icons/md";
import {AiFillDelete, AiOutlinePlusCircle} from "react-icons/ai";
import {GrDocumentCsv} from "react-icons/gr";
import OralComPosterAdd from "./OralComPosterAdd";

import ActivityTypes from "../../../const/ActivityTypes";
import {fetchListOralComPosters} from "../../../services/Activity/oral-com-poster/OralComPosterActions";
import {fetchResearcherActivities} from "../../../services/Researcher/ResearcherActions";
import OralComPosterDelete from "./OralComPosterDelete";
import Tooltip from "react-bootstrap/Tooltip";

// If targetResearcher is set in props display related information only (
// else load list des tous les oralComPosters du database
function OralComPosterList(props) {
    // parameter constant (List Template)
    const targetResearcher = props.targetResearcher;

    // Cached state (List Template)
    const [oralComPosterList, setOralComPosterList] = React.useState(null);

    // UI states (List Template)
    const [successActivityAlert, setSuccessActivityAlert] = React.useState('');
    const [errorActivityAlert, setErrorActivityAlert] = React.useState('');
    const [showFilter, setShowFilter] = React.useState(false);
    const {SearchBar} = Search;


    // Form state (List Template)
    const [targetOralComPoster, setTargetOralComPoster] = React.useState(false);
    const [showOralComPosterAdd, setShowOralComPosterAdd] = React.useState(false);
    const [showOralComPosterDelete, setShowOralComPosterDelete] = React.useState(false);
    const [listChangeCount, setListChangeCount] = React.useState(0);


    const handleHideModal = (msg = null) => {
        setShowOralComPosterAdd(false);
        setShowOralComPosterDelete(false);
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
            fetchListOralComPosters().then(list => setOralComPosterList(list))
        } else
            fetchResearcherActivities(targetResearcher.researcherId)
                .then(list => {
                    setOralComPosterList(list.filter(a => a.idTypeActivity === ActivityTypes.INVITED_ORAL_COMMUNICATION));
                })
    }, [listChangeCount, targetResearcher]);


    if (!oralComPosterList) {
        return <div className="d-flex align-items-center justify-content-center">
            <Circles stroke={"black"}/>
        </div>
    } else {
        if (oralComPosterList.length === 0) {
            return <div className={"row"}>
                <br/>
                <div className={"col-8"}>
                    <h3>Aucune Communication Orale est enregistrée</h3>
                </div>
                <div className={"col-4"}>
                    {showOralComPosterAdd &&
                        <OralComPosterAdd targetResearcher={targetResearcher} onHideAction={handleHideModal}/>}
                    <button className="btn btn-primary" data-bs-toggle="button"
                            onClick={() => setShowOralComPosterAdd(true)}>
                        <AiOutlinePlusCircle/> &nbsp; Ajouter une Communication Oral
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
                            setTargetOralComPoster(row)
                            setShowOralComPosterDelete(true)
                        }}><AiFillDelete/></button>
                    </OverlayTrigger>
                    &nbsp;  &nbsp;
                    {row.idActivity}
                </div>)
            }
        }, {
            dataField: 'oralComPoster.oralComPosterTitle',
            text: 'Titre',
            sort: true,
        }, {
            dataField: 'oralComPoster.authors',
            text: 'Auteurs',
        }, {
            dataField: 'oralComPoster.oralComPosterDat',
            text: 'Date',
            sort: true,
            hidden: true, // for csv only
        }, {
            dataField: 'oralComPoster.meeting.meetingId',
            text: 'Identifiant de la réunion',
            hidden: true, // for csv only
        }, {
            dataField: 'oralComPoster.meeting.meetingName',
            text: 'Nom de la réunion',
            hidden: false,
        }, {
            dataField: 'oralComPoster.meeting.meetingYear',
            text: 'Année de réunion',
            hidden: true, // for csv only
        }, {
            dataField: 'oralComPoster.meeting.meetingLocation',
            text: 'Lieu de réunion',
            hidden: true, // for csv only
        }, {
            dataField: 'oralComPoster.meeting.meetingStart',
            text: 'Date de la réunion',
            hidden: false,
        }, {
            dataField: 'oralComPoster.meeting.meetingEnd',
            text: 'Date de fin de réunion',
            hidden: true, // for csv only
        },];

        let title = "OralComPoster"
        if (!targetResearcher) {
            columns.push(chercheursColumnOfActivity)
            title = "Liste des communications orales posters"
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
                    data={oralComPosterList}
                    columns={columns}
                    exportCSV={{
                        fileName: 'oralComPosterList.csv',
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
                                        {showOralComPosterAdd &&
                                            <OralComPosterAdd targetResearcher={targetResearcher}
                                                              onHideAction={handleHideModal}/>}
                                        {showOralComPosterDelete &&
                                            <OralComPosterDelete targetOralComPoster={targetOralComPoster}
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
                                                onClick={() => setShowOralComPosterAdd(true)}>
                                            <AiOutlinePlusCircle/> &nbsp; Ajouter une oralComPoster
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
                                    pagination={paginationFactory(paginationOptions(oralComPosterList.length))}
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

export default OralComPosterList;
