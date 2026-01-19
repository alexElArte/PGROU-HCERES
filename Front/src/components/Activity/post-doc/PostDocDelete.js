import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingIcon from "../../util/LoadingIcon";
import PostDocElement from "./PostDocElement";
import {deletePostDoc} from "../../../services/Activity/post-doc/PostDocActions";

function PostDocDelete(props) {
    const [show, setShow] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const targetPostDoc = props.targetPostDoc;

    const handleClose = (msg = null) => {
        setShow(false);
        props.onHideAction(msg);
    };

    const handleDelete = () => {
        setIsLoading(true);
        deletePostDoc(targetPostDoc.idActivity)
            .then(response => {
                const msg = {
                    "successMsg": "Post-docs deleted with an id " + targetPostDoc.idActivity,
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Post-docs not deleted, response status: " + error.response.status,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false))
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Post-docs ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PostDocElement targetPostDoc={targetPostDoc}/>
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


export default PostDocDelete;

