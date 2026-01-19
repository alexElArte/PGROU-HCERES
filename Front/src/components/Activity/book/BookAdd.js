import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResearcherSelect from "../../util/ResearcherSelect";
import LoadingIcon from "../../util/LoadingIcon";
import {addBook} from "../../../services/Activity/book/BookActions";

function BookAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction;

    // UI states
    const [showModal, setShowModal] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    // Form states
    const [researcherId, setResearcherId] = React.useState(targetResearcher ? targetResearcher.researcherId : "");
    const [bookTitle, setBookTitle] = React.useState("");
    const [bookPublicationDate, setBookPublicationDate] = React.useState("");
    const [bookEditor, setBookEditor] = React.useState("");
    const [bookNbPage, setBookNbPage] = React.useState("");
    const [bookAuthors, setBookAuthors] = React.useState("");
    const [bookLanguageId, setBookLanguageId] = React.useState(""); 

    const handleClose = (msg = null) => {
        setShowModal(false);
        onHideParentAction(msg);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        // ✅ on envoie exactement les clés que ton service Java attend
        const data = {
            researcherId: researcherId,
            bookTitle: bookTitle,
            bookPublicationDate: bookPublicationDate,
            bookEditor: bookEditor,
            bookAuthors: bookAuthors,
            bookNbPage: bookNbPage,
            bookLanguageId: bookLanguageId, // ✅ corrigé
        };

        addBook(data)
            .then(response => {
                const msg = {
                    successMsg: "Livre ajouté avec un id " + response.data.idActivity,
                };
                handleClose(msg);
            })
            .catch(error => {
                console.error(error);
                const msg = {
                    errorMsg: "Erreur : livre non ajouté (status " + (error?.response?.status || "inconnu") + ")",
                };
                handleClose(msg);
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <div>
            <Modal show={showModal} onHide={handleClose}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Livre</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className='label'>Chercheur</label>
                        <ResearcherSelect
                            targetResearcher={targetResearcher}
                            onchange={React.useCallback(resId => setResearcherId(resId), [])}
                        />

                        <label className='label'>Titre</label>
                        <input
                            type="text"
                            placeholder="Titre"
                            className="input-container"
                            value={bookTitle}
                            onChange={e => setBookTitle(e.target.value)}
                            required
                        />

                        <label className='label'>Date de publication</label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setBookPublicationDate(e.target.value)}
                            required
                        />

                        <label className='label'>Éditeur du livre</label>
                        <input
                            type="text"
                            className='input-container'
                            onChange={e => setBookEditor(e.target.value)}
                            required
                        />

                        <label className='label'>Auteur(s)</label>
                        <input
                            type="text"
                            className='input-container'
                            onChange={e => setBookAuthors(e.target.value)}
                            required
                        />

                        <label className='label'>Nombre de pages</label>
                        <input
                            type="number"
                            className='input-container'
                            onChange={e => setBookNbPage(e.target.value)}
                            required
                        />

                        <label className='label'>Langue du livre</label>
                        <select
                            className='input-container'
                            value={bookLanguageId}
                            onChange={e => setBookLanguageId(e.target.value)}
                            required
                        >
                            <option value="">-- Choisir une langue --</option>
                            <option value="1">Français</option>
                            <option value="2">Anglais</option>
                        </select>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Fermer
                        </Button>
                        <Button variant="outline-primary" type="submit" disabled={isLoading}>
                            {isLoading ? <LoadingIcon /> : null}
                            {isLoading ? 'Ajout en cours...' : 'Ajouter'}
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default BookAdd;
