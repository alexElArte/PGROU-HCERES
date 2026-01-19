import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResearcherElement from "./ResearcherElement";
import LoadingIcon from "../util/LoadingIcon";
import {deleteResearcher} from "../../services/Researcher/ResearcherActions";

function DeleteResearcher(props) {
    const [show, setShow] = useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const targetResearcher = props.targetResearcher;
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
        deleteResearcher(targetResearcher.researcherId)
            .then(response => {
                const msg = {
                    "researcherDeleted": targetResearcher,
                    "successMsg": "Researcher supprimé ayant l'id " + targetResearcher.researcherId,
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Researcher non supprimé, response status: " + error.response.status,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false));
    }

    return (
        <Modal show={show} onHide={silentClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete researcher ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ResearcherElement targetResearcher={targetResearcher} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={silentClose}>
                    No
                </Button>
                <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
                    {isLoading ? <LoadingIcon color={"white"}/> : null}
                    {isLoading ? 'Suppression en cours...' : 'Oui, Supprimer'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


export default DeleteResearcher;

