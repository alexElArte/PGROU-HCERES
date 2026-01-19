import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingIcon from "../../util/LoadingIcon";
import IndustrialContractElement from "./IndustrialContractElement";
import {deleteIndustrialContract} from "../../../services/Activity/industrial-contract/IndustrialContractActions";

function IndustrialContractDelete(props) {
    const [show, setShow] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const targetIndustrialContract = props.targetIndustrialContract;

    const handleClose = (msg = null) => {
        setShow(false);
        props.onHideAction(msg);
    };

    const handleDelete = () => {
        setIsLoading(true);
        deleteIndustrialContract(targetIndustrialContract.idActivity)
            .then(response => {
                const msg = {
                    "successMsg": "Industrial R&D contracts  deleted with id " + targetIndustrialContract.idActivity,
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Industrial R&D contracts not deleted, response status: " + error.response.status,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false))
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Industrial R&D contracts ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <IndustrialContractElement targetIndustrialContract={targetIndustrialContract}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
                <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
                    {isLoading ? <LoadingIcon color={"white"}/> : null}
                    {isLoading ? 'Deleting...' : 'Yes, Delete'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


export default IndustrialContractDelete;

