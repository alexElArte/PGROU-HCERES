import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingIcon from "../../util/LoadingIcon";
import OutgoingMobilityElement from "./OutgoingMobilityElement";
import {deleteOutgoingMobility} from "../../../services/Activity/outgoing-mobility/OutgoingMobilityActions";

function OutgoingMobilityDelete(props) {
    const [show, setShow] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const targetOutgoingMobility = props.targetOutgoingMobility;

    const handleClose = (msg = null) => {
        setShow(false);
        props.onHideAction(msg);
    };

    const handleDelete = () => {
        setIsLoading(true);
        deleteOutgoingMobility(targetOutgoingMobility.idActivity)
            .then(response => {
                const msg = {
                    "successMsg": "OutgoingMobility supprimé ayant l'id " + targetOutgoingMobility.idActivity,
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "OutgoingMobility non supprimé, response status: " + error.response.status,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false))
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Êtes-vous sûr de vouloir supprimer l'outgoingMobility sélectionné?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <OutgoingMobilityElement targetOutgoingMobility={targetOutgoingMobility}/>
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


export default OutgoingMobilityDelete;

