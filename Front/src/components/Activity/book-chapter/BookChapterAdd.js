import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResearcherSelect from "../../util/ResearcherSelect";
import LoadingIcon from "../../util/LoadingIcon";
import {addBookChapter} from "../../../services/Activity/book-chapter/BookChapterActions";

function BookChapterAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction;

    // UI states
    const [showModal, setShowModal] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    // Form states
    const [researcherId, setResearcherId] = React.useState(targetResearcher ? targetResearcher.researcherId : "");
    const [chapterTitle, setChapterTitle] = React.useState("");
    const [bookTitle, setBookTitle] = React.useState("");
    const [bookChapterPublicationDate, setBookChapterPublicationDate] = React.useState("");
    const [bookChapterEditor, setBookChapterEditor] = React.useState("");
    const [bookChapterNbPage, setBookChapterNbPage] = React.useState("");
    const [bookChapterAuthors, setBookChapterAuthors] = React.useState("");
    const [bookChapterAdditionalInfo, setBookChapterAdditionalInfo] = React.useState(""); 
    const [bookChapterLanguageId, setBookChapterLanguageId] = React.useState(""); 

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
            chapterTitle: chapterTitle,
            bookTitle: bookTitle,
            bookChapterPublicationDate: bookChapterPublicationDate,
            bookChapterEditor: bookChapterEditor,
            bookChapterAuthors: bookChapterAuthors,
            bookChapterNbPage: bookChapterNbPage,
            bookChapterAdditionalInfo : bookChapterAdditionalInfo,
            bookChapterLanguageId: bookChapterLanguageId, // ✅ corrigé
        };

        addBookChapter(data)
            .then(response => {
                const msg = {
                    successMsg: "Chapitre ajouté avec un id " + response.data.idActivity,
                };
                handleClose(msg);
            })
            .catch(error => {
                console.error(error);
                const msg = {
                    errorMsg: "Erreur : chapitre non ajouté (status " + (error?.response?.status || "inconnu") + ")",
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
                        <Modal.Title>Chapitre</Modal.Title>
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
                            value={chapterTitle}
                            onChange={e => setChapterTitle(e.target.value)}
                            required
                        />

                        <label className='label'>Titre du livre</label>
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
                            onChange={e => setBookChapterPublicationDate(e.target.value)}
                            required
                        />

                        <label className='label'>Éditeur du livre</label>
                        <input
                            type="text"
                            className='input-container'
                            onChange={e => setBookChapterEditor(e.target.value)}
                            required
                        />

                        <label className='label'>Auteur(s)</label>
                        <input
                            type="text"
                            className='input-container'
                            onChange={e => setBookChapterAuthors(e.target.value)}
                            required
                        />

                        <label className='label'>Nombre de pages</label>
                        <input
                            type="number"
                            className='input-container'
                            onChange={e => setBookChapterNbPage(e.target.value)}
                            required
                        />

                        <label className='label'>Informations additionel</label>
                        <input
                            type="text"
                            className='input-container'
                            onChange={e => setBookChapterAdditionalInfo(e.target.value)}
                        />

                        <label className='label'>Langue du livre</label>
                        <select
                            className='input-container'
                            value={bookChapterLanguageId}
                            onChange={e => setBookChapterLanguageId(e.target.value)}
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

export default BookChapterAdd;
