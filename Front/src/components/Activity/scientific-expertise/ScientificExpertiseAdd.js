import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResearcherSelect from "../../util/ResearcherSelect";
import LoadingIcon from "../../util/LoadingIcon";
import {addScientificExpertise} from "../../../services/Activity/scientific-expertise/ScientificExpertiseActions";

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function ScientificExpertiseAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction

    // Cached state (Add Template)

    // UI states (Add Template)
    const [showModal, setShowModal] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);


    // Form state (Add Template)
    const [researcherId, setResearcherId] = React.useState(targetResearcher ? targetResearcher.researcherId : "");
    const [typeName, setTypeName] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [description, setDescription] = useState("");


    const handleClose = (msg = null) => {
        setShowModal(false);
        onHideParentAction(msg);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        let data = {
            researcherId: researcherId,
            ScientificExpertiseTypeName: typeName,
            ScientificExpertiseDescription: description,
            ScientificExpertiseStartDate: startDate,
            ScientificExpertiseEndDate: endDate
        };

        addScientificExpertise(data).then(response => {
            // const activityId = response.data.researcherId;
            const msg = {
                "successMsg": "ScientificExpertise ajouté avec un id " + response.data.idActivity,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false)).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Erreur ScientificExpertise non ajouté, response status: " + error.response.status,
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
                        <Modal.Title>ScientificExpertise</Modal.Title>
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
                            Nom du Type
                        </label>
                        <input
                            placeholder='Nom du type'
                            className='input-container'
                            name="typeName"
                            id="typeName"
                            value={typeName}
                            onChange={(e) => setTypeName(e.target.value)}
                            required/>
                        <label className='label'>
                            Date de début
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
                            description
                        </label>
                        <input
                            placeholder='description'
                            className='input-container'
                            name="description"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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

export default ScientificExpertiseAdd;
