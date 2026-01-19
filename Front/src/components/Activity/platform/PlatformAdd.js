import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResearcherSelect from "../../util/ResearcherSelect";
import LoadingIcon from "../../util/LoadingIcon";
import {addPlatform} from "../../../services/Activity/platform/PlatformActions";

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function PlatformAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction

    // Cached state (Add Template)

    // UI states (Add Template)
    const [showModal, setShowModal] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);


    // Form state (Add Template)
    const [researcherId, setResearcherId] = React.useState(targetResearcher ? targetResearcher.researcherId : "");
    const [labellisation, setLabellisation] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [managers, setManagers] = React.useState("");
    const [affiliation, setAffiliation] = React.useState("");
    const [creationDate, setCreationDate] = React.useState("");
    const [isOpenPrivateResearchers, setIsOpenPrivateResearchers] = React.useState(false);


    const handleClose = (msg = null) => {
        setShowModal(false);
        onHideParentAction(msg);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        let data = {
            researcherId: researcherId,
            labellisation: labellisation,
            description: description,
            managers: managers,
            affiliation: affiliation,
            creationDate: creationDate,
            openPrivateResearchers: isOpenPrivateResearchers
        };

        addPlatform(data).then(response => {
            // const activityId = response.data.researcherId;
            const msg = {
                "successMsg": "Platform ajouté avec un id " + response.data.idActivity,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false)).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Erreur Platform non ajouté, response status: " + error.response.status,
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
                        <Modal.Title>Platform</Modal.Title>
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
                            Date de création
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setCreationDate(e.target.value)}
                            required/>

                        <label className='label'>
                            Description
                        </label>
                        <input
                            placeholder='Description'
                            className='input-container'
                            name="description"
                            type="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required/>


                        <label className='label'>
                            Managers
                        </label>
                        <input
                            placeholder='Managers '
                            className='input-container'
                            name="managers"
                            type="managers"
                            value={managers}
                            onChange={e => setManagers(e.target.value)}
                            required/>

                        <label className='label'>
                            Affiliation
                        </label>
                        <input
                            placeholder='Affiliation'
                            className='input-container'
                            name="affiliation"
                            type="affiliation"
                            value={affiliation}
                            onChange={e => setAffiliation(e.target.value)}
                            required/>

                        <label className='label'>
                            Labellisation
                        </label>
                        <input
                            placeholder='Labellisation'
                            className='input-container'
                            name="labellisation"
                            type="labellisation"
                            value={labellisation}
                            onChange={e => setLabellisation(e.target.value)}
                            required/>
                        <label className='label'>
                            open private researchers
                        </label>
                        <input
                            type="checkbox"
                            className='input-container'
                            onChange={e => setIsOpenPrivateResearchers(e.target.checked)}
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

export default PlatformAdd;
