import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingIcon from "../../util/LoadingIcon";
import TrainingThesisElement from "./TrainingThesisElement";
import { deleteTrainingThesis } from "../../../services/Activity/training-thesis/TrainingThesisActions";

function TrainingThesisDelete(props) {
    const [show, setShow] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const targetTrainingThesis = props.targetTrainingThesis;

    const handleClose = (msg = null) => {
        setShow(false);
        props.onHideAction(msg);
    };

    const handleDelete = () => {
        setIsLoading(true);
        deleteTrainingThesis(targetTrainingThesis.idActivity)
            .then(response => {
                const msg = {
                    successMsg: "Thèse supprimée ayant l'id " + targetTrainingThesis.idActivity,
                };
                handleClose(msg);
            })
            .catch(error => {
                console.log(error);
                const msg = {
                    errorMsg: "Thèse non supprimée, response status: " + (error?.response?.status ?? "inconnu"),
                };
                handleClose(msg);
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Êtes-vous sûr de vouloir supprimer la thèse sélectionnée ?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TrainingThesisElement targetTrainingThesis={targetTrainingThesis} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Non
                </Button>
                <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
                    {isLoading ? <LoadingIcon color={"white"} /> : null}
                    {isLoading ? 'Suppression en cours...' : 'Oui, Supprimer'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TrainingThesisDelete;
