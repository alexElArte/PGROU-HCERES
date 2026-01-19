import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingIcon from "../../util/LoadingIcon";
import ContractElement from "./ContractElement";
import {deleteContract} from "../../../services/Other/contract/ContractActions";

function ContractDelete(props) {
    const [show, setShow] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const targetContract = props.targetContract;

    const handleClose = (msg = null) => {
        setShow(false);
        props.onHideAction(msg);
    };

    const handleDelete = () => {
        setIsLoading(true);
        deleteContract(targetContract)
            .then(response => {
                const msg = {
                    "successMsg": "Contrat supprimé ayant l'id " + targetContract.contractId,
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Contrat non supprimé, response status: " + error.response.status,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false))
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Êtes-vous sûr de vouloir supprimer le contrat sélectionné?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ContractElement targetContract={targetContract}/>
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


export default ContractDelete;