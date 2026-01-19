import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingIcon from "../../util/LoadingIcon";
import SeiClinicalTrialElement from "./SeiClinicalTrialElement";
import {deleteSeiClinicalTrial} from "../../../services/Activity/sei-clinical-trial/SeiClinicalTrialActions";

function SeiClinicalTrialDelete(props) {
    const [show, setShow] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const targetSeiClinicalTrial = props.targetSeiClinicalTrial;

    const handleClose = (msg = null) => {
        setShow(false);
        props.onHideAction(msg);
    };

    const handleDelete = () => {
        setIsLoading(true);
        deleteSeiClinicalTrial(targetSeiClinicalTrial.idActivity)
            .then(response => {
                const msg = {
                    "successMsg": "SeiClinicalTrial supprimé ayant l'id " + targetSeiClinicalTrial.idActivity,
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "SeiClinicalTrial non supprimé, response status: " + error.response.status,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false))
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Êtes-vous sûr de vouloir supprimer l'seiClinicalTrial sélectionné?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SeiClinicalTrialElement targetSeiClinicalTrial={targetSeiClinicalTrial}/>
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


export default SeiClinicalTrialDelete;

