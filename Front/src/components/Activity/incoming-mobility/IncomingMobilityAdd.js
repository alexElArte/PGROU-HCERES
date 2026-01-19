import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResearcherSelect from "../../util/ResearcherSelect";
import LoadingIcon from "../../util/LoadingIcon";
import {addIncomingMobility} from "../../../services/Activity/incoming-mobility/IncomingMobilityActions";

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function IncomingMobilityAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction

    // Cached state (Add Template)

    // UI states (Add Template)
    const [showModal, setShowModal] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);


    // Form state (Add Template)
    const [researcherId, setResearcherId] = React.useState(targetResearcher ? targetResearcher.researcherId : "");
    const [nameSeniorScientist, setNameSeniorScientist] = useState("");
    const [arrivalDate, setArrivalDate] = useState(null);
    const [departureDate, setDepartureDate] = useState(null);
    const [duration, setDuration] = useState(""); // number
    const [nationality, setNationality] = useState("");
    const [originalLabName, setOriginalLabName] = useState("");
    const [originaLabLocation, setOriginaLabLocation] = useState("");
    const [piPartner, setPiPartner] = useState("");
    const [projectTitle, setProjectTitle] = useState("");
    const [associatedFunding, setAssociatedFunding] = useState("");
    const [publicationReference, setPublicationReference] = useState("");
    const [strategicRecurringCollab, setStrategicRecurringCollab] = useState(false);
    const [activeProject, setActiveProject] = useState(false);
    const [umrCoordinated, setUmrCoordinated] = useState(false);
    const [agreementSigned, setAgreementSigned] = useState(false);


    const handleClose = (msg = null) => {
        setShowModal(false);
        onHideParentAction(msg);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        let data = {
            researcherId: researcherId,
            nameSeniorScientist: nameSeniorScientist,
            arrivalDate: arrivalDate,
            departureDate: departureDate,
            duration: duration,
            nationality: nationality,
            originalLabName: originalLabName,
            originaLabLocation: originaLabLocation,
            piPartner: piPartner,
            projectTitle: projectTitle,
            associatedFunding: associatedFunding,
            publicationReference: publicationReference,
            strategicRecurringCollab: strategicRecurringCollab,
            activeProject: activeProject,
            umrCoordinated: umrCoordinated,
            agreementSigned: agreementSigned
        };

        addIncomingMobility(data).then(response => {
            // const activityId = response.data.researcherId;
            const msg = {
                "successMsg": "IncomingMobility ajouté avec un id " + response.data.idActivity,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false)).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Erreur IncomingMobility non ajouté, response status: " + error.response.status,
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
                        <Modal.Title>IncomingMobility</Modal.Title>
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
                            Nom du Senior Scientist
                        </label>
                        <input
                            placeholder='Nom'
                            className='input-container'
                            name="nameSeniorScientist"
                            id="nameSeniorScientist"
                            value={nameSeniorScientist}
                            onChange={(e) => setNameSeniorScientist(e.target.value)}
                            required/>
                        <label className='label'>
                            Date d'arrivée
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setArrivalDate(e.target.value)}
                            required/>

                        <label className='label'>
                            Date de départ
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setDepartureDate(e.target.value)}
                            required/>

                        <label className='label'>
                            Durée
                        </label>
                        <input
                            type={"number"}
                            placeholder='durée'
                            className='input-container'
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required/>

                        <label className='label'>
                            Nationalité
                        </label>
                        <input
                            placeholder='nationalité'
                            className='input-container'
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                            required/>


                        <label className='label'>
                            Nom du laboratoire d'origine
                        </label>
                        <input
                            placeholder='Nom du Laboratoire origine'
                            className='input-container'
                            value={originalLabName}
                            onChange={(e) => setOriginalLabName(e.target.value)}
                            required/>

                        <label className='label'>
                            Emplacement du laboratoire origine
                        </label>
                        <input
                            placeholder='Emplacement du laboratoire origine'
                            className='input-container'
                            value={originaLabLocation}
                            onChange={(e) => setOriginaLabLocation(e.target.value)}
                            required/>

                        <label className='label'>
                            piPartner
                        </label>
                        <input
                            placeholder='Emplacement du laboratoire origine'
                            className='input-container'
                            value={piPartner}
                            onChange={(e) => setPiPartner(e.target.value)}
                            required/>

                        <label className='label'>
                            Titre du projet
                        </label>
                        <input
                            placeholder='Emplacement du laboratoire origine'
                            className='input-container'
                            value={projectTitle}
                            onChange={(e) => setProjectTitle(e.target.value)}
                            required/>

                        <label className='label'>
                            Financement associé
                        </label>
                        <input
                            placeholder='Nom du Sponsor '
                            className='input-container'
                            value={associatedFunding}
                            onChange={(e) => setAssociatedFunding(e.target.value)}
                            required/>
                        <label className='label'>
                            Référence de la publication
                        </label>
                        <input
                            placeholder='Référence de la publication'
                            className='input-container'
                            value={publicationReference}
                            onChange={(e) => setPublicationReference(e.target.value)}
                            required/>

                        <label className='label'>
                            Collaboration stratégique récurrente ?
                        </label>
                        <input
                            type="checkbox"
                            className='input-container'
                            onChange={e => setStrategicRecurringCollab(e.target.checked)}
                            />

                        <label className='label'>
                            Projet actif ?
                        </label>
                        <input
                            type="checkbox"
                            className='input-container'
                            onChange={e => setActiveProject(e.target.checked)}
                            />

                        <label className='label'>
                            Cordonné UMR ?
                        </label>
                        <input
                            type="checkbox"
                            className='input-container'
                            onChange={e => setUmrCoordinated(e.target.checked)}
                            />

                        <label className='label'>
                            Accord signé ?
                        </label>
                        <input
                            type="checkbox"
                            className='input-container'
                            onChange={e => setAgreementSigned(e.target.checked)}
                            />

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

export default IncomingMobilityAdd;
