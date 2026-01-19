import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingIcon from "../../util/LoadingIcon";
import EditorialActivityElement from "./EditorialActivityElement";
import {deleteEditorialActivity} from "../../../services/Activity/editorial-activity/EditorialActivityActions";

function EditorialActivityDelete(props) {
    const [show, setShow] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const targetEditorialActivity = props.targetEditorialActivity;

    const handleClose = (msg = null) => {
        setShow(false);
        props.onHideAction(msg);
    };

    const handleDelete = () => {
        setIsLoading(true);
        deleteEditorialActivity(targetEditorialActivity.idActivity)
            .then(response => {
                const msg = {
                    "successMsg": "EditorialActivity supprimé ayant l'id " + targetEditorialActivity.idActivity,
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "EditorialActivity non supprimé, response status: " + error.response.status,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false))
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Êtes-vous sûr de vouloir supprimer l'editorialActivity sélectionné?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditorialActivityElement targetEditorialActivity={targetEditorialActivity}/>
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


export default EditorialActivityDelete;

