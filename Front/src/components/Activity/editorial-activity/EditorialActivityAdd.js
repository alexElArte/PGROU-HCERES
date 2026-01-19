import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResearcherSelect from "../../util/ResearcherSelect";
import LoadingIcon from "../../util/LoadingIcon";
import {addEditorialActivity} from "../../../services/Activity/editorial-activity/EditorialActivityActions";

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function EditorialActivityAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction

    // Cached state (Add Template)

    // UI states (Add Template)
    const [showModal, setShowModal] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);


    // Form state (Add Template)
    const [researcherId, setResearcherId] = React.useState(targetResearcher ? targetResearcher.researcherId : "");
    const [impactFactor, setImpactFactor] = React.useState(""); // number
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    const [journalName, setJournalName] = React.useState("");
    const [functionName, setFunctionName] = React.useState("");

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
            startDate: startDate,
            endDate: endDate,
            journalName: journalName,
            functionName: functionName
        };

        addEditorialActivity(data).then(response => {
            // const activityId = response.data.researcherId;
            const msg = {
                "successMsg": "EditorialActivity ajouté avec un id " + response.data.idActivity,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false)).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Erreur EditorialActivity non ajouté, response status: " + error.response.status,
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
                        <Modal.Title>EditorialActivity</Modal.Title>
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
                            Facteur d'impact
                        </label>
                        <input
                            type="number"
                            placeholder="Facteur d'impact"
                            className='input-container'
                            onChange={e => setImpactFactor(e.target.value)}
                            required/>

                        <label className='label'>
                            Date de départ
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setStartDate(e.target.value)}
                            required/>

                        <label className='label'>
                            Date de fin
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setEndDate(e.target.value)}
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
                            Nom de la fonction editoriale
                        </label>
                        <input
                            placeholder='Nom de la fonction'
                            className='input-container'
                            name="functionName"
                            type="functionName"
                            value={functionName}
                            onChange={e => setFunctionName(e.target.value)}
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

export default EditorialActivityAdd;
