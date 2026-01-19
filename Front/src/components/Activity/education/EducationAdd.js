import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {addEducation} from "../../../services/Activity/education/EducationActions";
import ResearcherSelect from "../../util/ResearcherSelect";
import LoadingIcon from "../../util/LoadingIcon";

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function EducationAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction

    // UI states (Add Template)
    const [showModal, setShowModal] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);


    // Form state (Add Template)
    const [researcherId, setResearcherId] = React.useState(targetResearcher ? targetResearcher.researcherId : "");
    const [educationCourseName, setEducationCourseName] = React.useState("");
    const [educationFormation, setEducationFormation] = React.useState("");
    const [educationDescription, setEducationDescription] = React.useState("");
    const [educationInvolvementName, setEducationInvolvementName] = React.useState("");
    const [educationLevelText, setEducationLevelText] = React.useState("");
    const [educationCompletionDate, setEducationCompletionDate] = React.useState("");


    const handleClose = (msg = null) => {
        setShowModal(false);
        onHideParentAction(msg);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        let data = {
            researcherId: researcherId,
            educationCourseName: educationCourseName,
            educationFormation: educationFormation,
            educationDescription: educationDescription,
            educationInvolvementName: educationInvolvementName,
            educationLevelText: educationLevelText,
            educationCompletion: educationCompletionDate
        };

        addEducation(data).then(response => {
            // const activityId = response.data.researcherId;
            const msg = {
                "successMsg": "Education ajouté avec un id " + response.data.idActivity,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false)).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Erreur Education non ajouté, response status: " + error.response.status,
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
                        <Modal.Title>Education</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className='label'>
                            Chercheur
                        </label>
                        <ResearcherSelect
                            targetResearcher={targetResearcher}
                            onchange={React.useCallback(resId => setResearcherId(resId), [])}
                        />
                        <label className='label'>
                            Nom du cours d'éducation
                        </label>
                        <input
                            placeholder='educationCourseName'
                            className='input-container'
                            name="educationCourseName"
                            type="educationCourseName"
                            value={educationCourseName}
                            onChange={e => setEducationCourseName(e.target.value)}
                            required/>

                        <label className='label'>
                            Formation d'éducation
                        </label>
                        <input
                            placeholder='educationFormation'
                            className='input-container'
                            name="educationFormation"
                            type="educationFormation"
                            value={educationFormation}
                            onChange={e => setEducationFormation(e.target.value)}
                            required/>

                        <label className='label'>
                            Description de l'éducation
                        </label>
                        <input
                            placeholder='educationDescription'
                            className='input-container'
                            name="educationDescription"
                            type="educationDescription"
                            value={educationDescription}
                            onChange={e => setEducationDescription(e.target.value)}
                            required/>

                        <label className='label'>
                            Texte sur la participation à l'éducation
                        </label>
                        <input
                            placeholder='educationInvolvementName'
                            className='input-container'
                            name="educationInvolvementName"
                            type="educationInvolvementName"
                            value={educationInvolvementName}
                            onChange={e => setEducationInvolvementName(e.target.value)}
                            required/>

                        <label className='label'>
                            Niveau d'éducation
                        </label>
                        <input
                            placeholder='educationLevelText'
                            className='input-container'
                            name="educationLevelText"
                            type="educationLevelText"
                            value={educationLevelText}
                            onChange={e => setEducationLevelText(e.target.value)}
                            required/>

                        <label className='label'>
                            Achèvement de l'éducation
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setEducationCompletionDate(e.target.value)}
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

export default EducationAdd;
