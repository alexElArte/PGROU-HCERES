import React, {Component} from 'react';
// import these 2 import to show sort icon on table
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';

import {FaEdit} from "react-icons/fa";
import {AiFillDelete, AiOutlinePlusCircle} from "react-icons/ai";
import {GrDocumentCsv} from "react-icons/gr";
import {Oval} from 'react-loading-icons'
import AddResearcher from "./AddResearcher";
import {Alert, OverlayTrigger, Tooltip} from "react-bootstrap";
import DeleteResearcher from "./DeleteResearcher";
import {MdPendingActions} from "react-icons/md";
import {paginationOptions} from "../util/BootStrapTableOptions";
import ActivityList from "../Activity/ActivityList";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import {VscEyeClosed} from "react-icons/vsc";
import {MdSearch} from "react-icons/md";
import {fetchListResearchers} from "../../services/Researcher/ResearcherActions";


class Researcher extends Component {
    constructor() {
        super()
        this.state = {
            researchers: [],
            loading: false,
            showAddResearcher: false,
            showDeleteResearcher: false,
            showActivities: false,
            researcherSuccessAlert: "",
            researcherErrorAlert: "",
            showFilter: false,
            targetResearcher: null,
        }

        this.onHideModalResearcher = this.onHideModalResearcher.bind(this);
        this.showTooltip = this.showTooltip.bind(this);
        this.onHideModalActivity = this.onHideModalActivity.bind(this);
    }

    onHideModalResearcher(messages) {
        this.setState({
            showAddResearcher: false,
            showDeleteResearcher: false,
        })
        // silent close
        if (!messages) return;

        if (messages.successMsg) {
            // the global variable list is updated, so we need to update the state
            fetchListResearchers().then(list => {
                this.setState({
                    researchers: list,
                    researcherSuccessAlert: messages.successMsg,
                })
            })
        } else {
            this.setState(prevState => ({
                // display error message
                researcherErrorAlert: messages.errorMsg,
            }))
        }
    }

    onHideModalActivity(messages = null) {
        // silent close
        if (!messages) return;

        if (messages.successMsg) {
            this.setState({
                researcherSuccessAlert: messages.successMsg,
            });
        }

        if (messages.errorMsg) {
            this.setState({
                researcherErrorAlert: messages.errorMsg,
            });
        }
    }


    async componentDidMount() {
        this.setState({loading: true})
        fetchListResearchers().then(list => {
            this.setState({
                researchers: list,
                loading: false,
            })
        })
    }

    showTooltip(props) {
        return <Tooltip id="button-tooltip">
            {props}
        </Tooltip>
    }

    render() {
        if (!this.state.loading) {
            const columns = [{
                dataField: 'researcherId',
                text: 'ID',
                sort: true,
                search: true,
                filter: this.state.showFilter ? textFilter() : null,
            }, {
                dataField: 'researcherName',
                text: 'Name',
                sort: true,
                filter: this.state.showFilter ? textFilter() : null,
            }, {
                dataField: 'researcherSurname',
                text: 'Surname',
                sort: true,
                filter: this.state.showFilter ? textFilter() : null,
            }, {
                dataField: 'researcherEmail',
                text: 'Email',
                sort: true,
                filter: this.state.showFilter ? textFilter() : null,
            }, /**{
                dataField: 'belongsTeamList',
                text: 'Equipe',
                sort: true,
                filter: this.state.showFilter ? textFilter() : null,
                formatter: (cell, row) => {
                    let allTeams = ''
                    for (let i = 0; i < row.belongsTeamList.length; i++) {
                        allTeams += row.belongsTeamList[i].team.teamName + '\n'
                    }
                    return allTeams;
                },
                csvFormatter: (cell, row, rowIndex) => {
                    let allTeams = ''
                    for (let i = 0; i < row.belongsTeamList.length; i++) {
                        allTeams += row.belongsTeamList[i].team.teamName + ' - '
                    }
                    return allTeams;
                }
            },*/
                {
                    dataField: 'belongsTeamList.team.teamName',
                    text: 'Team',
                    sort: true,
                    filter: this.state.showFilter ? textFilter() : null,
                    formatter: (cell, row) => {
                        const teamNames = row.belongsTeamList.map((bt) => bt.team.teamName);
                        return teamNames.join(', ');
                    },
                    csvFormatter: (cell, row, rowIndex) => {
                        const teamNames = row.belongsTeamList.map((bt) => bt.team.teamName);
                        return teamNames.join(', ');
                    },
                },
            {
                dataField: 'lastResearcherStatus',
                text: 'Statut',
                sort: true,
                filter: this.state.showFilter ? textFilter() : null,
            }, {
                dataField: 'actionColumn',
                isDummyField: true,
                text: 'Edit',
                csvExport: false,
                formatter: (cell, row) => {
                    return (
                        <div className="btn-group" role="group">
                            <OverlayTrigger
                                placement="bottom"
                                delay={{show: 250, hide: 400}}
                                overlay={this.showTooltip("Afficher les activités du chercheur")}
                            >
                                <button onClick={() => {
                                    this.setState({
                                        showActivities: this.state.targetResearcher === row ? !this.state.showActivities : false,
                                        targetResearcher: row,
                                    })
                                    // refresh contents by alternating sate
                                    if (this.state.targetResearcher !== row) {
                                        setTimeout(() => {
                                            this.setState({
                                                showActivities: true
                                            })
                                        })
                                    }
                                }} className={"btn btn-outline-secondary"}>
                                    <MdPendingActions/>
                                </button>
                            </OverlayTrigger>

                            <OverlayTrigger
                                placement="bottom"
                                delay={{show: 250, hide: 400}}
                                overlay={this.showTooltip("Modifier les informations du chercheur")}
                            >
                                <button onClick={() => {
                                    this.setState({
                                        targetResearcher: row,
                                        showAddResearcher: true
                                    })
                                }} className="btn btn-outline-info">
                                    <FaEdit/></button>
                            </OverlayTrigger>

                            <OverlayTrigger
                                placement="bottom"
                                delay={{show: 250, hide: 400}}
                                overlay={this.showTooltip("Supprimer le chercheur")}
                            >
                                <button className="btn btn-outline-danger" onClick={() => {
                                    this.setState({
                                        targetResearcher: row,
                                        showDeleteResearcher: true
                                    })
                                }}><AiFillDelete/></button>
                            </OverlayTrigger>
                        </div>
                    )
                }
            }];

            const defaultSorted = [{
                dataField: 'researcherId', // if dataField is not match to any column you defined, it will be ignored.
                order: 'asc' // desc or asc
            }];

            const CaptionElement = (props) => (

                <div className={"container text-center"}>
                    <div className="row">
                        <div className="col-12">
                            <h3 style={{
                                borderRadius: '0.25em',
                                textAlign: 'center',
                                color: 'darkblue',
                                border: '1px solid darkblue',
                                padding: '0.5em'
                            }}> Members list
                            </h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <button className={"border-0 btn-lg"}
                                    onClick={(e) => this.setState({showFilter: !this.state.showFilter})}>{
                                <MdSearch/>}
                            </button>
                        </div>
                        <div className="col-4">
                            <MyExportCSV  {...props.tableProps.csvProps} className="big-button"
                                          onClick={this.handleClick}/>
                        </div>


                        <div className="col-4">
                            <button className="btn btn-primary btn-lg" data-bs-toggle="button" onClick={() => {
                                this.setState({
                                    targetResearcher: null,
                                    showAddResearcher: true
                                })
                            }}>
                                <AiOutlinePlusCircle/> &nbsp; Ajouter un membre
                            </button>
                            {this.state.researcherSuccessAlert && (
                                <Alert className={"alert-success "} onClose={() => this.setState({
                                    researcherSuccessAlert: ""
                                })}
                                       dismissible={true}>{this.state.researcherSuccessAlert}
                                </Alert>)}
                            {this.state.researcherErrorAlert && (
                                <Alert className={"alert-danger"} onClose={() => this.setState({
                                    researcherErrorAlert: ""
                                })}
                                       dismissible={true}>{this.state.researcherErrorAlert}
                                </Alert>)}
                        </div>
                    </div>
                </div>

            );

            const MyExportCSV = (props) => {
                const handleClick = () => {
                    props.onExport();
                };
                return (
                    <button className={"border-0  btn-lg"}
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
                <div className="container">
                    {this.state.showAddResearcher && (<AddResearcher targetResearcher={this.state.targetResearcher}
                                                                     onHideAction={this.onHideModalResearcher}/>)}
                    {this.state.showDeleteResearcher && (
                        <DeleteResearcher targetResearcher={this.state.targetResearcher}
                                          onHideAction={this.onHideModalResearcher}/>)}

                    <ToolkitProvider
                        bootstrap4
                        keyField="researcherId"
                        data={this.state.researchers}
                        columns={columns}
                        exportCSV={{
                            fileName: 'researcherList.csv',
                            onlyExportSelection: true,
                            exportAll: true
                        }}
                        search
                    >
                        {
                            props => (
                                <BootstrapTable
                                    defaultSorted={defaultSorted}
                                    pagination={paginationFactory(paginationOptions(this.state.researchers.length))}
                                    filter={filterFactory()}
                                    caption={<CaptionElement tableProps={props}/>}
                                    striped
                                    hover
                                    condensed
                                    selectRow={ selectRow }
                                    {...props.baseProps} />
                            )
                        }
                    </ToolkitProvider>

                    <Collapse in={this.state.showActivities}>
                        <div>
                            <Button onClick={() => this.setState({showActivities: false})}><VscEyeClosed/></Button>
                            {this.state.showActivities &&
                                <ActivityList targetResearcher={this.state.targetResearcher}/>}
                        </div>
                    </Collapse>
                </div>
            );
        }

        return (
            <div className="container">
                <div className="d-flex align-items-center justify-content-center">
                    <h1>
                        Téléchargement des données des chercheurs
                        <Oval className="ml-2" stroke={"black"}/>
                    </h1>
                </div>
            </div>
        )
    }

}

export default Researcher;