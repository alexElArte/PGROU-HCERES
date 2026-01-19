import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
    addInternationalCollaboration
} from "../../../services/Activity/international-collaboration/InternationalCollaborationActions";
import ResearcherSelect from "../../util/ResearcherSelect";
import LoadingIcon from "../../util/LoadingIcon";

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function InternationalCollaborationAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction

    // Cached state (Add Template)

    // UI states (Add Template)
    const [showModal, setShowModal] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);


    // Form state (Add Template)
    const [researcherIds, setResearcherIds] = React.useState(targetResearcher ? [targetResearcher.researcherId] : []);
    const [DateProjectStart, setDateProjectStart] = React.useState("");
    const [PartnerEntity, setPartnerEntity] = React.useState("");
    const [CountryStateCity, setCountryStateCity] = React.useState("");
    const [PiPartners, setPiPartners] = React.useState("");
    const [MailPartners, setMailPartners] = React.useState("");
    const [ProjectTitle, setProjectTitle] = React.useState("");
    const [StrategicRecurringCollab, setStrategicRecurringCollab] = React.useState(false);
    const [ActiveProject, setActiveProject] = React.useState(false);
    const [AssociatedFunding, setAssociatedFunding] = React.useState("");
    const [NumberResultingPublications, setNumberResultingPublications] = React.useState("");
    const [RefJointPublication, setRefJointPublication] = React.useState("");
    const [UmrCoordinated, setUmrCoordinated] = React.useState(false);
    const [AgreementSigned, setAgreementSigned] = React.useState(false);
    const [NameChoice, setNameChoice] = React.useState("");


    const handleClose = (msg = null) => {
        setShowModal(false);
        onHideParentAction(msg);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        let data = {
            researcherIds: researcherIds,
            NameChoice: NameChoice,
            AgreementSigned: AgreementSigned,
            UmrCoordinated: UmrCoordinated,
            RefJointPublication: RefJointPublication,
            NumberResultingPublications: NumberResultingPublications,
            AssociatedFunding: AssociatedFunding,
            ActiveProject: ActiveProject,
            StrategicRecurringCollab: StrategicRecurringCollab,
            ProjectTitle: ProjectTitle,
            MailPartners: MailPartners,
            PiPartners: PiPartners,
            CountryStateCity: CountryStateCity,
            PartnerEntity: PartnerEntity,
            DateProjectStart: DateProjectStart
        };

        addInternationalCollaboration(data).then(response => {
            const msg = {
                "successMsg": "InternationalCollaboration ajouté avec un id " + response.data.idActivity,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false)).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Erreur InternationalCollaboration non ajouté, response status: " + error.response.status,
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
                        <Modal.Title>InternationalCollaboration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <label className='label'>
                            Chercheurs
                        </label>
                        <ResearcherSelect
                            targetResearcher={targetResearcher}
                            isMulti
                            onchange={React.useCallback(resIds => setResearcherIds(resIds),[])}
                        />

                        <label className='label'>
                            Date Project Start
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setDateProjectStart(e.target.value)}
                            required/>

                        <label className='label'>
                            Partner Entity
                        </label>
                        <input
                            placeholder='Partner Entity'
                            className='input-container'
                            name="PartnerEntity"
                            type="PartnerEntity"
                            value={PartnerEntity}
                            onChange={e => setPartnerEntity(e.target.value)}
                            required/>


                        <label className='label'>
                            Country State City
                        </label>
                        <input
                            placeholder='Country State City '
                            className='input-container'
                            name="CountryStateCity"
                            type="CountryStateCity"
                            value={CountryStateCity}
                            onChange={e => setCountryStateCity(e.target.value)}
                            required/>

                        <label className='label'>
                            Pi Partners
                        </label>
                        <input
                            placeholder='PiPartners'
                            type="PiPartners"
                            className='input-container'
                            name="PiPartners"
                            value={PiPartners}
                            onChange={e => setPiPartners(e.target.value)}
                            required/>

                        <label className='label'>
                            Mail Partners
                        </label>
                        <input
                            placeholder='Mail Partners'
                            className='input-container'
                            name="MailPartners"
                            type="MailPartners"
                            value={MailPartners}
                            onChange={e => setMailPartners(e.target.value)}
                            required/>

                        <label className='label'>
                            Project Title
                        </label>
                        <input
                            placeholder='ProjetcTitle '
                            className='input-container'
                            onChange={e => setProjectTitle(e.target.value)}
                            required/>

                        <label className='label'>
                            StrategicRecurringCollab
                        </label>
                        <input
                            type="checkbox"
                            className='input-container'
                            onChange={e => setStrategicRecurringCollab(e.target.checked)}
                            />

                        <label className='label'>
                            Active Project
                        </label>
                        <input
                            type="checkbox"
                            className='input-container'
                            onChange={e => setActiveProject(e.target.checked)}
                            />

                        <label className='label'>
                            Associated Funding
                        </label>
                        <input
                            placeholder='AssociatedFunding '
                            className='input-container'
                            name="AssociatedFunding"
                            type="AssociatedFunding"
                            value={AssociatedFunding}
                            onChange={e => setAssociatedFunding(e.target.value)}
                            required/>

                        <label className='label'>
                            Number Resulting Publications
                        </label>
                        <input
                            type="number"
                            placeholder='NumberResultingPublications '
                            className='input-container'
                            value={NumberResultingPublications}
                            onChange={e => setNumberResultingPublications(e.target.value)}
                            required/>

                        <label className='label'>
                            Ref Joint Publication
                        </label>
                        <input
                            placeholder='RefJointPublication '
                            className='input-container'
                            name="RefJointPublication"
                            type="RefJointPublication"
                            value={RefJointPublication}
                            onChange={e => setRefJointPublication(e.target.value)}
                            required/>

                        <label className='label'>
                            Umr Coordinated
                        </label>
                        <input
                            type="checkbox"
                            className='input-container'
                            onChange={e => setUmrCoordinated(e.target.checked)}
                            />

                        <label className='label'>
                            Agreement Signed
                        </label>
                        <input
                            type="checkbox"
                            className='input-container'
                            onChange={e => setAgreementSigned(e.target.checked)}
                            />

                        <label className='label'>
                            Name Choice
                        </label>
                        <input
                            placeholder='NameChoice '
                            className='input-container'
                            name="NameChoice"
                            type="NameChoice"
                            value={NameChoice}
                            onChange={e => setNameChoice(e.target.value)}
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

export default InternationalCollaborationAdd;
