import React from 'react';
import './Team.css';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingIcon from "../util/LoadingIcon";
import {addTeam, updateTeam} from "../../services/Team/TeamActions";
import {useTranslation} from "react-i18next";

/**
 * add or edit team if present in props.targetTeam
 */
function AddTeam(props) {
    const { t } = useTranslation();
    const [showModal, setShowModal] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    const targetTeam = props.targetTeam;

    const silentClose = () => {
        setShowModal(false);
        props.onHideAction();
    };

    const handleClose = (msg) => {
        setShowModal(false);
        props.onHideAction(msg);
    };

    const [AddTeamName, setAddTeamName] = React.useState(targetTeam ? targetTeam.teamName : "");
    const [AddTeamCreationDate, setAddTeamCreationDate] = React.useState(targetTeam ? targetTeam.teamCreationDate : "");
    const [AddTeamLaboratoryId, setAddTeamLaboratoryId] = React.useState(targetTeam ? targetTeam.teamLaboratoryId : "");
    const [AddTeamEndDate, setAddTeamEndDate] = React.useState(targetTeam ? targetTeam.teamEndDate : "");
    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            "teamName": AddTeamName,
            "teamCreationDate": AddTeamCreationDate,
            "teamLaboratoryId": AddTeamLaboratoryId,
            "teamEndDate": AddTeamEndDate,
        };
        if (targetTeam) {
            handleUpdateTeam(data)
        } else {
            handleAddTeam(data)
        }
    }

    const handleUpdateTeam = (data) => {
        setIsLoading(true)
        updateTeam(targetTeam.teamId, data)
            .then(response => {
                const teamId = response.data.teamId;
                const msg = {
                    "teamUpdated": response.data,
                    "successMsg": t("team.update success", {id: teamId})
                }
                handleClose(msg);
            }).catch(error => {
            console.error("Erreur lors de la mise à jour de l'équipe :", error);

            const status = error.response?.status;
            const msg = {
                errorMsg: status
                    ? t("team.update failed status", {status})
                    : t("team.update failed", {
                        message: error.message || t("team.no server response")
                    })
            };
            handleClose(msg);
        })
            .finally(() => setIsLoading(false))
    }

    const handleAddTeam = (data) => {
        setIsLoading(true);
        addTeam(data)
            .then(response => {
                const teamId = response.data.teamId;
                const msg = {
                    "TeamAdded": response.data,
                    "successMsg": t("team.add success", {id: teamId}),
                }
                handleClose(msg);
            }).catch(error => {
            console.error("Erreur lors de la mise à jour de l'équipe :", error);

            const status = error.response?.status;
            const msg = {
                errorMsg: status
                    ? t("team.add failed status", {status})
                    : t("team.add failed", {
                        message: error.message || t("team.no server response")
                    })
            };
            handleClose(msg);
        })
            .finally(() => setIsLoading(false))
    }

    return (
        <div>
            <Modal show={showModal} onHide={() => silentClose()}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {!targetTeam && <div>{t("team.add team title")}</div>}
                            {targetTeam && <div>{t("team.update team title")}</div>}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className='label'>
                            {t("team.name")}
                        </label>
                        <input
                            placeholder={t("team.name")}
                            className='input-container'
                            name="AddTeamName"
                            type="text"
                            value={AddTeamName}
                            onChange={e => setAddTeamName(e.target.value)}
                            required/>
                        <label className='label'>
                            {t("team.creation date")}
                        </label>
                        <input
                            placeholder={t("team.creation date")}
                            className='input-container'
                            name="AddTeamCreationDate"
                            type="date"
                            value={AddTeamCreationDate}
                            onChange={e => setAddTeamCreationDate(e.target.value)}
                            required/>

                        <label className='label'>
                            {t("team.end date")}
                        </label>
                        <input
                            placeholder={t("team.end date")}
                            className='input-container'
                            name="AddTeamEndDate"
                            type="date"
                            value={AddTeamEndDate}
                            onChange={e => setAddTeamEndDate(e.target.value)}
                            required/>

                       <label className='label'>{t("team.laboratory")}</label>
                        <select
                            className='input-container'
                            value={AddTeamLaboratoryId}
                            onChange={e => setAddTeamLaboratoryId(e.target.value)}
                            required
                        >
                            <option value="">{t("team.choose laboratory")}</option>
                            <option value="1">CRTI</option>
                        </select>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => silentClose()}>
                            {t("common.cancel")}
                        </Button>
                        <Button variant="outline-primary" type={"submit"} disabled={isLoading}>
                            {isLoading ? <LoadingIcon/> : null}
                            {!targetTeam &&
                                (isLoading ? t("team.add in progress") : t("common.add"))
                            }
                            {targetTeam &&
                                (isLoading ? t("team.update in progress") : t("team.update action"))
                            }
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default AddTeam;
