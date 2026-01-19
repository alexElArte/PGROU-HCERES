import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingIcon from "../../util/LoadingIcon";
import InternationalCollaborationElement from "./InternationalCollaborationElement";
import {deleteInternationalCollaboration} from "../../../services/Activity/international-collaboration/InternationalCollaborationActions";

function InternationalCollaborationDelete(props) {
    const [show, setShow] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const targetInternationalCollaboration = props.targetInternationalCollaboration;

    const handleClose = (msg = null) => {
        setShow(false);
        props.onHideAction(msg);
    };

    const handleDelete = () => {
        setIsLoading(true);
        deleteInternationalCollaboration(targetInternationalCollaboration.idActivity)
            .then(response => {
                const msg = {
                    "successMsg": "InternationalCollaboration supprimé ayant l'id " + targetInternationalCollaboration.idActivity,
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "InternationalCollaboration non supprimé, response status: " + error.response.status,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false))
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Êtes-vous sûr de vouloir supprimer l'internationalCollaboration sélectionné?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InternationalCollaborationElement targetInternationalCollaboration={targetInternationalCollaboration}/>
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


export default InternationalCollaborationDelete;

