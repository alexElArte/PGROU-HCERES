import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingIcon from "../../util/LoadingIcon";
import PublicationElement from "./PublicationElement";
import {deletePublication} from "../../../services/Activity/publication/PublicationActions";

function PublicationDelete(props) {
    const [show, setShow] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const targetPublication = props.targetPublication;

    const handleClose = (msg = null) => {
        setShow(false);
        props.onHideAction(msg);
    };

    const handleDelete = () => {
        setIsLoading(true);
        deletePublication(targetPublication.idActivity)
            .then(response => {
                const msg = {
                    "successMsg": "Publication supprimé ayant l'id " + targetPublication.idActivity,
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Publication non supprimé, response status: " + error.response.status,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false))
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Êtes-vous sûr de vouloir supprimer la publication sélectionné?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PublicationElement targetPublication={targetPublication}/>
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


export default PublicationDelete;

