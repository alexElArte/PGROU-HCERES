import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingIcon from "../../util/LoadingIcon";
import IncomingMobilityElement from "./IncomingMobilityElement";
import {deleteIncomingMobility} from "../../../services/Activity/incoming-mobility/IncomingMobilityActions";

function IncomingMobilityDelete(props) {
    const [show, setShow] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const targetIncomingMobility = props.targetIncomingMobility;

    const handleClose = (msg = null) => {
        setShow(false);
        props.onHideAction(msg);
    };

    const handleDelete = () => {
        setIsLoading(true);
        deleteIncomingMobility(targetIncomingMobility.idActivity)
            .then(response => {
                const msg = {
                    "successMsg": "IncomingMobility supprimé ayant l'id " + targetIncomingMobility.idActivity,
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "IncomingMobility non supprimé, response status: " + error.response.status,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false))
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Êtes-vous sûr de vouloir supprimer l'incomingMobility sélectionné?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <IncomingMobilityElement targetIncomingMobility={targetIncomingMobility}/>
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


export default IncomingMobilityDelete;

