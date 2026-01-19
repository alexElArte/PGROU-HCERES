import React from 'react';
import './Team.css';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingIcon from "../util/LoadingIcon";
import {addTeam, updateTeam} from "../../services/Team/TeamActions";

/**
 * add or edit team if present in props.targetTeam
 */
function AddTeam(props) {
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
                    "successMsg": "Mise à jour de l'équipe réussie. [id= " + teamId + "]"
                }
                handleClose(msg);
            }).catch(error => {
            console.error("Erreur lors de la mise à jour de l'équipe :", error);

            const status = error.response?.status;
            const msg = {
                errorMsg: status
                    ? `Échec de la mise à jour de l'équipe, statut de réponse : ${status}`
                    : `Échec de la mise à jour de l'équipe . ${error.message || 'Aucune réponse du serveur.'}`
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
                    "successMsg": "Equipe ajouté avec l'id " + teamId,
                }
                handleClose(msg);
            }).catch(error => {
            console.error("Erreur lors de la mise à jour de l'équipe :", error);

            const status = error.response?.status;
            const msg = {
                errorMsg: status
                    ? `Échec de l'ajout, statut de réponse : ${status}`
                    : `Échec de l'ajout. ${error.message || 'Aucune réponse du serveur.'}`
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
                            {!targetTeam && <div>Ajouter une équipe</div>}
                            {targetTeam && <div>Modifier une équipe</div>}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className='label'>
                            Nom de l'équipe
                        </label>
                        <input
                            placeholder='TeamName'
                            className='input-container'
                            name="AddTeamName"
                            type="AddTeamName"
                            value={AddTeamName}
                            onChange={e => setAddTeamName(e.target.value)}
                            required/>
                        <label className='label'>
                            Date de création
                        </label>
                        <input
                            placeholder='TeamCreationDate'
                            className='input-container'
                            name="AddTeamCreationDate"
                            type="Date"
                            value={AddTeamCreationDate}
                            onChange={e => setAddTeamCreationDate(e.target.value)}
                            required/>

                        <label className='label'>
                            Date de fin
                        </label>
                        <input
                            placeholder='TeamEndDate'
                            className='input-container'
                            name="AddTeamEndDate"
                            type="Date"
                            value={AddTeamEndDate}
                            onChange={e => setAddTeamEndDate(e.target.value)}
                            required/>

                       <label className='label'>Laboratoire</label>
                        <select
                            className='input-container'
                            value={AddTeamLaboratoryId}
                            onChange={e => setAddTeamLaboratoryId(e.target.value)}
                            required
                        >
                            <option value="">-- Choisir un laboratoire --</option>
                            <option value="1">CRTI</option>
                        </select>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => silentClose()}>
                            Close
                        </Button>
                        <Button variant="outline-primary" type={"submit"} disabled={isLoading}>
                            {isLoading ? <LoadingIcon/> : null}
                            {!targetTeam &&
                                (isLoading ? 'Ajout en cours...' : "Ajouter")
                            }
                            {targetTeam &&
                                (isLoading ? 'Mise à jour en cours...' : "Mettre à jour")
                            }
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default AddTeam;
