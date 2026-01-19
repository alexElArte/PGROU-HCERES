import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResearcherSelect from "../../util/ResearcherSelect";
import LoadingIcon from "../../util/LoadingIcon";
import {addReviewArticle} from "../../../services/Activity/review-article/ReviewArticleActions";

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function ReviewArticleAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction

    // Cached state (Add Template)

    // UI states (Add Template)
    const [showModal, setShowModal] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);


    // Form state (Add Template)
    const [researcherId, setResearcherId] = React.useState(targetResearcher ? targetResearcher.researcherId : "");
    const [impactFactor, setImpactFactor] = React.useState("");
    const [year, setYear] = React.useState("");
    const [journalName, setJournalName] = React.useState("");
    const [nbReviewedArticles, setNbReviewedArticles] = React.useState("");


    const handleClose = (msg = null) => {
        setShowModal(false);
        onHideParentAction(msg);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        let data = {
            researcherId: researcherId,
            impactFactor: impactFactor,
            journalName: journalName,
            year: year,
            nbReviewedArticles: nbReviewedArticles
        };

        addReviewArticle(data).then(response => {
            // const activityId = response.data.researcherId;
            const msg = {
                "successMsg": "ReviewArticle ajouté avec un id " + response.data.idActivity,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false)).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Erreur ReviewArticle non ajouté, response status: " + error.response.status,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false))
    }

    return (
        <div>
            <Modal show={showModal} onHide={handleClose}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>ReviewArticle</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <label className='label'>
                            Chercheur
                        </label>
                        <ResearcherSelect
                            targetResearcher={targetResearcher}
                            onchange={React.useCallback(resId => setResearcherId(resId),[])}
                        />
                        <label className='label'>
                            Année
                        </label>
                        <input
                            placeholder='Année'
                            className='input-container'
                            name="year"
                            type="year"
                            value={year}
                            onChange={e => setYear(e.target.value)}
                            required/>

                        <label className='label'>
                            Facteur d'impact
                        </label>
                        <input
                            type="number"
                            placeholder="Facteur d'impact"
                            className='input-container'
                            value={impactFactor}
                            onChange={e => setImpactFactor(e.target.value)}
                            required/>

                        <label className='label'>
                            Nom du journal
                        </label>
                        <input
                            placeholder='Nom du journal '
                            className='input-container'
                            name="journalName"
                            type="journalName"
                            value={journalName}
                            onChange={e => setJournalName(e.target.value)}
                            required/>

                        <label className='label'>
                            Nombre d'article revues
                        </label>
                        <input
                            type="number"
                            placeholder='Nom de la fonction'
                            className='input-container'
                            value={nbReviewedArticles}
                            onChange={e => setNbReviewedArticles(e.target.value)}
                            required/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="outline-primary" type={"submit"} disabled={isLoading}>
                            {isLoading ? <LoadingIcon/> : null}
                            {isLoading ? 'Ajout en cours...' : 'Ajouter'}
                        </Button>

                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default ReviewArticleAdd;
