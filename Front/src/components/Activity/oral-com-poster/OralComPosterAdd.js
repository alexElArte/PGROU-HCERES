import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResearcherSelect from "../../util/ResearcherSelect";
import LoadingIcon from "../../util/LoadingIcon";
import {addOralComPoster} from "../../../services/Activity/oral-com-poster/OralComPosterActions";

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function OralComPosterAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction

    // Cached state (Add Template)

    // UI states (Add Template)
    const [showModal, setShowModal] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);


    // Form state (Add Template)
    const [researcherId, setResearcherId] = React.useState(targetResearcher ? targetResearcher.researcherId : "");
    const [OralComPosterTitle, setOralComPosterTitle] = React.useState("");
    const [OralComPosterDate, setOralComPosterDate] = React.useState("");
    const [Authors, setAuthors] = React.useState("");
    const [MeetingName, setMeetingName] = React.useState("");
    const [MeetingYear, setMeetingYear] = React.useState("");
    const [MeetingLocation, setMeetingLocation] = React.useState("");
    const [MeetingStart, setMeetingStart] = React.useState("");
    const [MeetingEnd, setMeetingEnd] = React.useState("");
    const [TypeOralComPosterName, setTypeOralComPosterName] = React.useState("");


    const handleClose = (msg = null) => {
        setShowModal(false);
        onHideParentAction(msg);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        let data = {
            researcherId: researcherId,
            TypeOralComPosterName: TypeOralComPosterName,
            MeetingEnd: MeetingEnd,
            MeetingStart: MeetingStart,
            MeetingLocation: MeetingLocation,
            MeetingYear: MeetingYear,
            MeetingName: MeetingName,
            Authors: Authors,
            OralComPosterDate: OralComPosterDate,
            OralComPosterTitle: OralComPosterTitle
        };

        addOralComPoster(data).then(response => {
            // const activityId = response.data.researcherId;
            const msg = {
                "successMsg": "OralComPoster ajouté avec un id " + response.data.idActivity,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false)).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Erreur OralComPoster non ajouté, response status: " + error.response.status,
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
                        <Modal.Title>OralComPoster</Modal.Title>
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
                            Oral Communication Title
                        </label>
                        <input
                            placeholder='OralComPosterTitle'
                            className='input-container'
                            name="OralComPosterTitle"
                            type="OralComPosterTitle"
                            value={OralComPosterTitle}
                            onChange={e => setOralComPosterTitle(e.target.value)}
                            required/>

                        <label className='label'>
                            Oral Communication Date
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setOralComPosterDate(e.target.value)}
                            required/>


                        <label className='label'>
                            Authors
                        </label>
                        <input
                            placeholder='Authors '
                            className='input-container'
                            name="Authors"
                            type="Authors"
                            value={Authors}
                            onChange={e => setAuthors(e.target.value)}
                            required/>

                        <label className='label'>
                            Meeting Name
                        </label>
                        <input
                            placeholder='MeetingName'
                            type="MeetingName"
                            className='input-container'
                            name="MeetingName"
                            value={MeetingName}
                            onChange={e => setMeetingName(e.target.value)}
                            required/>

                        <label className='label'>
                            Meeting Year
                        </label>
                        <input
                            type="number"
                            placeholder='MeetingYear'
                            className='input-container'
                            value={MeetingYear}
                            onChange={e => setMeetingYear(e.target.value)}
                            required/>

                        <label className='label'>
                            Meeting Location
                        </label>
                        <input
                            placeholder='MeetingLocation '
                            className='input-container'
                            name="MeetingLocation"
                            type="MeetingLocation"
                            value={MeetingLocation}
                            onChange={e => setMeetingLocation(e.target.value)}
                            required/>

                        <label className='label'>
                            Meeting Start
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setMeetingStart(e.target.value)}
                            required/>

                        <label className='label'>
                            Meeting End
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setMeetingEnd(e.target.value)}
                            required/>

                        <label className='label'>
                            Type Oral CommunicationName
                        </label>
                        <input
                            placeholder='TypeOralComPosterName '
                            className='input-container'
                            name="TypeOralComPosterName"
                            type="TypeOralComPosterName"
                            value={TypeOralComPosterName}
                            onChange={e => setTypeOralComPosterName(e.target.value)}
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

export default OralComPosterAdd;
