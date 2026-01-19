import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResearcherSelect from "../../util/ResearcherSelect";
import LoadingIcon from "../../util/LoadingIcon";
import {addTrainingThesis} from "../../../services/Activity/training-thesis/TrainingThesisActions";

// Si targetResearcher est présent, on l’utilise comme valeur par défaut
function TrainingThesisAdd(props) {
    // paramètres
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction;

    // UI state
    const [showModal, setShowModal] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    // Form state
    const [researcherIds, setResearcherIds] = React.useState([]); // tableau d'IDs
    

    const [phdStudentId, setPhdStudentId] = React.useState("");

    const [thesisStart, setThesisStart] = React.useState("");
    const [thesisTypeId, setThesisTypeId] = React.useState("");
    const [thesisMainFunding, setThesisMainFunding] = React.useState("");
    const [thesisDefenseDate, setThesisDefenseDate] = React.useState("");
    const [thesisDuration, setThesisDuration] = React.useState("");
    const [thesisFutur, setThesisFutur] = React.useState("");
    const [thesisNumberArticles, setThesisNumberArticles] = React.useState("");
    const [thesisNumberArticlesFirstSecondPosition, setThesisNumberArticlesFirstSecondPosition] =
        React.useState("");
    const [thesisArticlesFirstSecondPositionReferences, setThesisArticlesFirstSecondPositionReferences] =
        React.useState("");

    const handleClose = (msg = null) => {
        setShowModal(false);
        onHideParentAction(msg);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const data = {
            researcherIds: researcherIds,
            phdStudentId: phdStudentId,
            thesisStart: thesisStart,
            thesisTypeId: thesisTypeId,
            thesisMainFunding: thesisMainFunding,
            thesisDefenseDate: thesisDefenseDate,
            thesisDuration: thesisDuration,
            thesisFutur: thesisFutur,
            thesisNumberArticles: thesisNumberArticles,
            thesisNumberArticlesFirstSecondPosition: thesisNumberArticlesFirstSecondPosition,
            thesisArticlesFirstSecondPositionReferences: thesisArticlesFirstSecondPositionReferences
        };

        addTrainingThesis(data)
            .then(response => {
                const msg = {
                    successMsg: "Thèse ajoutée avec un id " + response.data.idActivity,
                };
                handleClose(msg);
            })
            .catch(error => {
                console.log(error);
                const msg = {
                    errorMsg: "Erreur, thèse non ajoutée, response status: " + (error?.response?.status ?? "inconnu"),
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
                        <Modal.Title>Ajouter une thèse (TrainingThesis)</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <label className='label'>
                            Researcher
                        </label>
                        <ResearcherSelect
                            isMulti={true}
                            targetResearcher={targetResearcher} // optionnel, si tu veux pré-remplir
                            onchange={React.useCallback((researcherIds) => setResearcherIds(researcherIds), [])}
                        />

                        {/* PhD Student */}
                        <label className='label'>
                            Doctorant (ID PhdStudent)
                        </label>
                        <input
                            placeholder='ID du doctorant'
                            className='input-container'
                            name="phdStudentId"
                            type="number"
                            value={phdStudentId}
                            onChange={e => setPhdStudentId(e.target.value)}
                            required
                        />

                        {/* Date de début */}
                        <label className='label'>
                            Date de début de thèse
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            value={thesisStart}
                            onChange={e => setThesisStart(e.target.value)}
                            required
                        />

                        {/* Type de thèse (id) */}
                        <label className='label'>
                            Type de thèse (thesisTypeId)
                        </label>
                        <input
                            placeholder='Type de thèse (id)'
                            className='input-container'
                            name="thesisTypeId"
                            type="number"
                            value={thesisTypeId}
                            onChange={e => setThesisTypeId(e.target.value)}
                            required
                        />

                        {/* Financement principal */}
                        <label className='label'>
                            Financement principal
                        </label>
                        <input
                            placeholder='Financement principal'
                            className='input-container'
                            name="thesisMainFunding"
                            type="text"
                            value={thesisMainFunding}
                            onChange={e => setThesisMainFunding(e.target.value)}
                        />

                        {/* Date de soutenance */}
                        <label className='label'>
                            Date de soutenance (optionnelle)
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            value={thesisDefenseDate}
                            onChange={e => setThesisDefenseDate(e.target.value)}
                        />

                        {/* Durée de la thèse */}
                        <label className='label'>
                            Durée de la thèse (en années)
                        </label>
                        <input
                            placeholder='Durée'
                            className='input-container'
                            name="thesisDuration"
                            type="number"
                            value={thesisDuration}
                            onChange={e => setThesisDuration(e.target.value)}
                            required
                        />

                        {/* Futur après thèse */}
                        <label className='label'>
                            Futur après la thèse
                        </label>
                        <textarea
                            placeholder='Projet futur après la thèse'
                            className='textarea'
                            name="thesisFutur"
                            value={thesisFutur}
                            onChange={e => setThesisFutur(e.target.value)}
                        />

                        {/* Nombre d’articles */}
                        <label className='label'>
                            Nombre d’articles
                        </label>
                        <input
                            placeholder="Nombre d'articles"
                            className='input-container'
                            name="thesisNumberArticles"
                            type="number"
                            value={thesisNumberArticles}
                            onChange={e => setThesisNumberArticles(e.target.value)}
                        />

                        {/* Articles 1ère/2ème position */}
                        <label className='label'>
                            Nombre d’articles (1ère/2ème position)
                        </label>
                        <input
                            placeholder="Nombre d'articles (1ère/2ème position)"
                            className='input-container'
                            name="thesisNumberArticlesFirstSecondPosition"
                            type="number"
                            value={thesisNumberArticlesFirstSecondPosition}
                            onChange={e => setThesisNumberArticlesFirstSecondPosition(e.target.value)}
                        />

                        {/* Références des articles 1ère/2ème position */}
                        <label className='label'>
                            Références des articles (1ère/2ème position)
                        </label>
                        <textarea
                            placeholder='Références des articles'
                            className='textarea'
                            name="thesisArticlesFirstSecondPositionReferences"
                            value={thesisArticlesFirstSecondPositionReferences}
                            onChange={e => setThesisArticlesFirstSecondPositionReferences(e.target.value)}
                        />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="outline-primary" type="submit" disabled={isLoading}>
                            {isLoading ? <LoadingIcon/> : null}
                            {isLoading ? 'Ajout en cours...' : 'Ajouter'}
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default TrainingThesisAdd;
