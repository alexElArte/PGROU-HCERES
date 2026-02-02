import React, { Component } from 'react';
// import these 2 import to show sort icon on table
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import { FaEdit } from "react-icons/fa";
import { AiFillDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { GrDocumentCsv } from "react-icons/gr";
import { Oval } from 'react-loading-icons'
import AddTeam from "./AddTeam";
import { Alert, OverlayTrigger, Tooltip } from "react-bootstrap";
import DeleteTeam from "./DeleteTeam";
import { MdPendingActions } from "react-icons/md";
import { paginationOptions } from "../util/BootStrapTableOptions";
import TeamMembersList from "./TeamMembersList";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import { VscEyeClosed } from "react-icons/vsc";
import { MdSearch } from "react-icons/md";
import { fetchListTeams } from "../../services/Team/TeamActions";
import { fetchListResearchers } from "../../services/Researcher/ResearcherActions";

import { withTranslation } from 'react-i18next';

class Team extends Component {
    constructor() {
        super()
        this.state = {
            teams: [],
            researchers: [],          // 🔹 tous les chercheurs
            loading: false,
            showAddTeam: false,
            showDeleteTeam: false,
            showMembers: false,
            teamSuccessAlert: "",
            teamErrorAlert: "",
            showFilter: false,
            targetTeam: null,
            teamMembers: [],
        }

        this.onHideModalTeam = this.onHideModalTeam.bind(this);
        this.showTooltip = this.showTooltip.bind(this);
        this.onHideModalActivity = this.onHideModalActivity.bind(this);
    }

    onHideModalTeam(messages) {
        this.setState({
            showAddTeam: false,
            showDeleteTeam: false,
        })
        // silent close
        if (!messages) return;

        if (messages.successMsg) {
            // la liste des équipes a pu changer
            fetchListTeams().then(list => {
                this.setState({
                    teams: list,
                    teamSuccessAlert: messages.successMsg,
                })
            })
        } else {
            this.setState({
                // display error message
                teamErrorAlert: messages.errorMsg,
            })
        }
    }

    onHideModalActivity(messages = null) {
        // silent close
        if (!messages) return;

        if (messages.successMsg) {
            this.setState({
                teamSuccessAlert: messages.successMsg,
            });
        }

        if (messages.errorMsg) {
            this.setState({
                teamErrorAlert: messages.errorMsg,
            });
        }
    }

    async componentDidMount() {
        this.setState({ loading: true });

        try {
            // 🔹 on récupère équipes et chercheurs en parallèle
            const [teams, researchers] = await Promise.all([
                fetchListTeams(),
                fetchListResearchers()
            ]);

            this.setState({
                teams,
                researchers,
                loading: false,
            });
        } catch (e) {
            console.error("Erreur chargement équipes/chercheurs", e);
            this.setState({ loading: false });
        }
    }

    // 🔹 renvoie la liste des chercheurs d'une équipe à partir de this.state.researchers
    getResearchersOfTeam = (team) => {
        const { researchers } = this.state;
        if (!team || !Array.isArray(researchers)) return [];

        return researchers.filter(r =>
            Array.isArray(r?.belongsTeamList) &&
            r.belongsTeamList.some(bt =>
                // adapte selon ta structure réelle :
                // dans Researcher, tu fais bt.team.teamName
                bt.team && bt.team.teamId === team.teamId
            )
        );
    };

    showTooltip(props) {
        return <Tooltip id="button-tooltip">
            {props}
        </Tooltip>
    }

    render() {

        const { t } = this.props;

        if (!this.state.loading) {
            const columns = [{
                dataField: 'teamId',
                text: 'ID',
                sort: true,
                headerAlign: 'center',
                align: 'center',
                style: { width: '8%' },
                filter: this.state.showFilter ? textFilter({ placeholder: 'Filtrer ID' }) : null,
            },
            {
                dataField: 'teamName',
                text: t('team.team'),
                sort: true,
                headerAlign: 'center',
                filter: this.state.showFilter ? textFilter({ placeholder: t('team.filter by name') }) : null,
            },
            {
                dataField: 'teamCreation',
                text: t('team.creation date'),
                sort: true,
                headerAlign: 'center',
                align: 'center',
                formatter: (cell) => {
                    if (!cell) return '';
                    const date = new Date(cell);
                    return date.toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    });
                },
                filter: this.state.showFilter ? textFilter({ placeholder: 'aaaa-mm-jj' }) : null,
            },
            {
                dataField: 'teamEnd',
                text: t('team.end date'),
                sort: true,
                headerAlign: 'center',
                align: 'center',
                formatter: (cell) => {
                    if (!cell) return '';
                    const date = new Date(cell);
                    return date.toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    });
                },
                filter: this.state.showFilter ? textFilter({ placeholder: 'aaaa-mm-jj' }) : null,
            },
            {
                dataField: 'teamLaboratoryId',
                text: t('team.laboratory'),
                sort: true,
                headerAlign: 'center',
                align: 'center',
                formatter: (cell, row) => {
                    // Affichage dans le tableau
                    if (row.laboratory && row.laboratory.laboratoryName) {
                        return row.laboratory.laboratoryName;
                    }
                    return cell || '—';
                },
                csvFormatter: (cell, row) => {
                    // Valeur utilisée dans le CSV
                    if (row.laboratory && row.laboratory.laboratoryName) {
                        return row.laboratory.laboratoryName;
                    }
                    // à défaut, on met l’ID s’il existe, sinon on laisse vide
                    return cell || '';
                },
                filter: this.state.showFilter ? textFilter({ placeholder: 'Nom labo ou ID' }) : null,
            },
            {
                dataField: 'memberCount',
                text: t('team.number of members'),
                sort: true,
                headerAlign: 'center',
                align: 'center',
                formatter: (cell, row) => {
                    const nb = this.getResearchersOfTeam(row).length;
                    return nb;
                },
                sortValue: (cell, row) => {
                    return this.getResearchersOfTeam(row).length;
                },
                csvFormatter: (cell, row) => {
                    // 🔹 utilisé pour le CSV
                    return this.getResearchersOfTeam(row).length;
                }
            },
            {
                dataField: 'actionColumn',
                isDummyField: true,
                text: 'Edit',
                csvExport: false,
                formatter: (cell, row) => {
                    return (
                        <div className="btn-group" role="group">
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={this.showTooltip("Afficher les membres de l'équipe")}
                            >
                                <button
                                    onClick={() => {
                                        this.setState(prev => {
                                            const sameRow = prev.targetTeam && prev.targetTeam.teamId === row.teamId;
                                            const nextShow = sameRow ? !prev.showMembers : true;
                                            return {
                                                targetTeam: row,
                                                showMembers: nextShow,
                                            };
                                        });
                                    }}
                                    className="btn btn-outline-secondary"
                                >
                                    <MdPendingActions />
                                </button>
                            </OverlayTrigger>

                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={this.showTooltip("Modifier les informations de l'équipe")}
                            >
                                <button onClick={() => {
                                    this.setState({
                                        targetTeam: row,
                                        showAddTeam: true
                                    })
                                }} className="btn btn-outline-info">
                                    <FaEdit /></button>
                            </OverlayTrigger>

                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={this.showTooltip("Supprimer l'équipe")}
                            >
                                <button className="btn btn-outline-danger" onClick={() => {
                                    this.setState({
                                        targetTeam: row,
                                        showDeleteTeam: true
                                    })
                                }}><AiFillDelete /></button>
                            </OverlayTrigger>
                        </div>
                    )
                }
            }];

            const defaultSorted = [{
                dataField: 'teamId',
                order: 'asc'
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
                            }}> {t('team.title')}
                            </h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <button className={"border-0 btn-lg"}
                                onClick={(e) => this.setState({ showFilter: !this.state.showFilter })}>{
                                    <MdSearch />}
                            </button>
                        </div>
                        <div className="col-4">
                            <MyExportCSV  {...props.tableProps.csvProps} className="big-button"
                                onClick={this.handleClick} />
                        </div>

                        <div className="col-4">
                            <button className="btn btn-primary btn-lg btn-icon-text" data-bs-toggle="button" onClick={() => {
                                this.setState({
                                    targetTeam: null,
                                    showAddTeam: true
                                })
                            }}>
                                <AiOutlinePlusCircle /> 
                                <span>{t('team.add')}</span>
                            </button>
                            {this.state.teamSuccessAlert && (
                                <Alert className={"alert-success "} onClose={() => this.setState({
                                    teamSuccessAlert: ""
                                })}
                                    dismissible={true}>{this.state.teamSuccessAlert}
                                </Alert>)}
                            {this.state.teamErrorAlert && (
                                <Alert className={"alert-danger"} onClose={() => this.setState({
                                    teamErrorAlert: ""
                                })}
                                    dismissible={true}>{this.state.teamErrorAlert}
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
                            <GrDocumentCsv />}
                    </button>
                );
            };

            const selectRow = {
                mode: 'checkbox',
                clickToSelect: true
            };

            return (
                <div className="container">
                    {this.state.showAddTeam && (<AddTeam targetTeam={this.state.targetTeam}
                        onHideAction={this.onHideModalTeam} />)}
                    {this.state.showDeleteTeam && (
                        <DeleteTeam targetTeam={this.state.targetTeam}
                            onHideAction={this.onHideModalTeam} />)}

                    <div className="team-list-table">
                        <ToolkitProvider
                            bootstrap4
                            keyField="teamId"
                            data={this.state.teams}
                            columns={columns}
                            exportCSV={{
                                fileName: 'teamList.csv',
                                onlyExportSelection: true,
                                exportAll: true
                            }}
                            search
                        >
                            {
                                props => (
                                    <BootstrapTable
                                        defaultSorted={defaultSorted}
                                        pagination={paginationFactory(paginationOptions(this.state.teams.length))}
                                        filter={filterFactory()}
                                        caption={<CaptionElement tableProps={props} />}
                                        striped
                                        hover
                                        condensed
                                        selectRow={selectRow}
                                        {...props.baseProps} />
                                )
                            }
                        </ToolkitProvider>
                    </div>

                    <Collapse in={this.state.showMembers && !!this.state.targetTeam}>
                        <div className="mt-3">
                            <Button
                                variant="secondary"
                                className="mb-2"
                                onClick={() => this.setState({ showMembers: false })}
                            >
                                <VscEyeClosed /> Masquer les membres
                            </Button>

                            {this.state.targetTeam && (
                                <TeamMembersList
                                    team={this.state.targetTeam}
                                    allResearchers={this.state.researchers}
                                    teamResearchers={this.getResearchersOfTeam(this.state.targetTeam)}
                                />
                            )}
                        </div>
                    </Collapse>

                </div>
            );
        }

        return (
            <div className="container">
                <div className="d-flex align-items-center justify-content-center">
                    <h1>
                        {this.props.t('team.loading')}
                        <Oval className="ml-2" stroke={"black"} />
                    </h1>
                </div>
            </div>
        )
    }

}

export default withTranslation()(Team);