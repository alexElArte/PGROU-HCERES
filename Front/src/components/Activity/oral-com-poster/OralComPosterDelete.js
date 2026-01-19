import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingIcon from "../../util/LoadingIcon";
import OralComPosterElement from "./OralComPosterElement";
import {deleteOralComPoster} from "../../../services/Activity/oral-com-poster/OralComPosterActions";

function OralComPosterDelete(props) {
    const [show, setShow] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const targetOralComPoster = props.targetOralComPoster;

    const handleClose = (msg = null) => {
        setShow(false);
        props.onHideAction(msg);
    };

    const handleDelete = () => {
        setIsLoading(true);
        deleteOralComPoster(targetOralComPoster.idActivity)
            .then(response => {
                const msg = {
                    "successMsg": "OralComPoster supprimé ayant l'id " + targetOralComPoster.idActivity,
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "OralComPoster non supprimé, response status: " + error.response.status,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false))
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Êtes-vous sûr de vouloir supprimer l'oralComPoster sélectionné?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <OralComPosterElement targetOralComPoster={targetOralComPoster}/>
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


export default OralComPosterDelete;

