import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingIcon from "../../util/LoadingIcon";
import BookElement from "./BookElement";
import {deleteBook} from "../../../services/Activity/book/BookActions";

function BookDelete(props) {
    const [show, setShow] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const targetBook = props.targetBook;

    const handleClose = (msg = null) => {
        setShow(false);
        props.onHideAction(msg);
    };

    const handleDelete = () => {
        setIsLoading(true);
        deleteBook(targetBook.idActivity)
            .then(response => {
                const msg = {
                    "successMsg": "Livre supprimé ayant l'id " + targetBook.idActivity,
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Livre non supprimé, response status: " + error.response.status,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false))
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Êtes-vous sûr de vouloir supprimer le livre sélectionné?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <BookElement targetBook={targetBook}/>
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


export default BookDelete;

