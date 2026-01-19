import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import TeamElement from "./TeamElement";
import LoadingIcon from "../util/LoadingIcon";
import {deleteTeam} from "../../services/Team/TeamActions";

function DeleteTeam(props) {
    const [show, setShow] = useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const targetTeam = props.targetTeam;
    const silentClose = () => {
        setShow(false);
        props.onHideAction();
    };

    const handleClose = (msg) => {
        setShow(false);
        props.onHideAction(msg);
    };

    const handleDelete = () => {
        setIsLoading(true);
        deleteTeam(targetTeam.teamId)
            .then(response => {
                const msg = {
                    "teamDeleted": targetTeam,
                    "successMsg": "Equipe supprimé ayant l'id " + targetTeam.teamId,
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Equipe non supprimé, response status: " + error.response.status,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false));
    }

    return (
        <Modal show={show} onHide={silentClose}>
            <Modal.Header closeButton>
                <Modal.Title>Êtes-vous sûr de vouloir supprimer l'équipe sélectionné?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TeamElement targetTeam={targetTeam} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={silentClose}>
                    Non
                </Button>
                <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
                    {isLoading ? <LoadingIcon color={"white"}/> : null}
                    {isLoading ? 'Suppression en cours...' : 'Oui, Supprimer'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


export default DeleteTeam;

