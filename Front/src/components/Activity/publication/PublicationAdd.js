import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResearcherSelect from "../../util/ResearcherSelect";
import LoadingIcon from "../../util/LoadingIcon";
import {addPublication} from "../../../services/Activity/publication/PublicationActions";

function PublicationAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction;

    // UI states
    const [showModal, setShowModal] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    // Form states
    const [researcherId, setResearcherId] = React.useState(targetResearcher ? targetResearcher.researcherId : "");
    const [publicationTitle, setPublicationTitle] = React.useState("");
    const [publicationDate, setPublicationDate] = React.useState("");
    const [publicationSource, setPublicationSource] = React.useState("");
    const [publicationPmid, setPublicationPmid] = React.useState("");
    const [publicationAuthors, setPublicationAuthors] = React.useState("");
    const [publicationImpactFactor, setPublicationImpactFactor] = React.useState("");
    const [publicationTypeId, setPublicationTypeId] = React.useState(""); // ✅ renommé pour correspondre au backend

    const handleClose = (msg = null) => {
        setShowModal(false);
        onHideParentAction(msg);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        
        const data = {
            researcherId: researcherId,
            publicationTitle: publicationTitle,
            publicationDate: publicationDate,
            publicationSource: publicationSource,
            publicationAuthors: publicationAuthors,
            publicationPmid: publicationPmid,
            publicationImpactFactor: publicationImpactFactor,
            publicationTypeId: publicationTypeId,
        };

        addPublication(data)
            .then(response => {
                const msg = {
                    successMsg: "Publication ajouté avec un id " + response.data.idActivity,
                };
                handleClose(msg);
            })
            .catch(error => {
                console.error(error);
                const msg = {
                    errorMsg: "Erreur : publication non ajouté (status " + (error?.response?.status || "inconnu") + ")",
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
                        <Modal.Title>Publication</Modal.Title>
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
                            value={publicationTitle}
                            onChange={e => setPublicationTitle(e.target.value)}
                            required
                        />

                        <label className='label'>Date de publication</label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setPublicationDate(e.target.value)}
                            required
                        />

                        <label className='label'>Source de la publication</label>
                        <input
                            type="text"
                            className='input-container'
                            onChange={e => setPublicationSource(e.target.value)}
                            required
                        />

                        <label className='label'>Auteur(s)</label>
                        <input
                            type="text"
                            className='input-container'
                            onChange={e => setPublicationAuthors(e.target.value)}
                            required
                        />

                        <label className='label'>Publication Pmid</label>
                        <input
                            type="text"
                            maxLength={16}
                            className='input-container'
                            onChange={e => setPublicationPmid(e.target.value)}
                            required
                        />

                        <label className='label'>Publication Impact factor</label>
                        <input
                            type="number"
                            className='input-container'
                            onChange={e => setPublicationImpactFactor(e.target.value)}
                            required
                        />

                        <label className='label'>Type de la publication</label>
                        <select
                            className='input-container'
                            value={publicationTypeId}
                            onChange={e => setPublicationTypeId(e.target.value)}
                            required
                        >
                            <option value="">-- Choisir un type de publication --</option>
                            <option value="1">Publication</option>
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

export default PublicationAdd;
