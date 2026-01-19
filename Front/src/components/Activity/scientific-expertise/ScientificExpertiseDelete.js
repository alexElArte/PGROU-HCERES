import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingIcon from "../../util/LoadingIcon";
import ScientificExpertiseElement from "./ScientificExpertiseElement";
import {deleteScientificExpertise} from "../../../services/Activity/scientific-expertise/ScientificExpertiseActions";

function ScientificExpertiseDelete(props) {
    const [show, setShow] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const targetScientificExpertise = props.targetScientificExpertise;

    const handleClose = (msg = null) => {
        setShow(false);
        props.onHideAction(msg);
    };

    const handleDelete = () => {
        setIsLoading(true);
        deleteScientificExpertise(targetScientificExpertise.idActivity)
            .then(response => {
                const msg = {
                    "successMsg": "ScientificExpertise supprimé ayant l'id " + targetScientificExpertise.idActivity,
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "ScientificExpertise non supprimé, response status: " + error.response.status,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false))
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Êtes-vous sûr de vouloir supprimer l'scientificExpertise sélectionné?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ScientificExpertiseElement targetScientificExpertise={targetScientificExpertise}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
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


export default ScientificExpertiseDelete;

