import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingIcon from "../../util/LoadingIcon";
import SrAwardElement from "./SrAwardElement";
import {deleteSrAward} from "../../../services/Activity/sraward/SrAwardActions";

function SrAwardDelete(props) {
    const [show, setShow] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const targetSrAward = props.targetSrAward;

    const handleClose = (msg = null) => {
        setShow(false);
        props.onHideAction(msg);
    };

    const handleDelete = () => {
        setIsLoading(true);
        deleteSrAward(targetSrAward.idActivity)
            .then(response => {
                const msg = {
                    "successMsg": "Scientific recognition - Awards id is deleted" + targetSrAward.idActivity,
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Scientific recognition - Awards failed to delete, response status: " + error.response.status,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false))
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete the Scientific recognition - Awards ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SrAwardElement targetSrAward={targetSrAward}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
                <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
                    {isLoading ? <LoadingIcon color={"white"}/> : null}
                    {isLoading ? 'Deleting  ...' : 'Yes, Delete'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


export default SrAwardDelete;

