import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResearcherSelect from "../../util/ResearcherSelect";
import LoadingIcon from "../../util/LoadingIcon";
import {addPostDoc} from "../../../services/Activity/post-doc/PostDocActions";

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function PostDocAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction

    // Cached state (Add Template)

    // UI states (Add Template)
    const [showModal, setShowModal] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);


    // Form state (Add Template)
    const [researcherIds, setResearcherIds] = React.useState([]); // tableau d'IDs
    const [titre, setTitre] = React.useState("");
    const [duree, setDuree] = React.useState(""); // number
    const [nationality, setNationality] = React.useState("");
    const [labo, setLabo] = React.useState("");
    const [associatedFunding, setAssociatedFunding] = React.useState("");
    const [associatedPubliRef, setAssociatedPubliRef] = React.useState("");
    const [arrivalDate, setArrivalDate] = React.useState("");
    const [departureDate, setDepartureDate] = React.useState("");


    const handleClose = (msg = null) => {
        setShowModal(false);
        onHideParentAction(msg);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        let data = {
            researcherIds: researcherIds,
            postDocName: titre,
            arrivalDate: arrivalDate,
            departureDate: departureDate,
            duration: duree,
            nationality: nationality,
            originalLab: labo,
            associatedFunding: associatedFunding,
            associatedPubliRef: associatedPubliRef,
        };

        addPostDoc(data).then(response => {
            // const activityId = response.data.researcherId;
            const msg = {
                "successMsg": "Post-docs added with an id " + response.data.idActivity,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false)).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Error Post-docs not added, response status: " + error.response.status,
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
                        <Modal.Title>Post-docs </Modal.Title>
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
                        <label className='label'>
                            Post-docs Title
                        </label>
                        <input
                            placeholder='Post-docs Title'
                            className='input-container'
                            value={titre}
                            onChange={e => setTitre(e.target.value)}
                            required/>

                    


                        <label className='label'>
                            Arrival Date
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setArrivalDate(e.target.value)}
                            required/>

                        <label className='label'>
                            Departure Date
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setDepartureDate(e.target.value)}
                            required/>


                        <label className='label'>
                            Duration
                        </label>
                        <input
                            type="number"
                            placeholder='Time (Year)'
                            className='input-container'
                            value={duree}
                            onChange={e => setDuree(e.target.value)}
                            required/>


                        <label className='label'>
                            Nationality
                        </label>
                        <input
                            placeholder='Nationality'
                            className='input-container'
                            value={nationality}
                            onChange={e => setNationality(e.target.value)}
                            required/>

                        <label className='label'>
                            Laboritory
                        </label>
                        <input
                            placeholder='Name'
                            className='input-container'
                            value={labo}
                            onChange={e => setLabo(e.target.value)}
                            required/>

                        <label className='label'>
                            Associated Funding
                        </label>
                        <input
                            placeholder='Nom du laboratoire'
                            className='input-container'
                            value={associatedFunding}
                            onChange={e => setAssociatedFunding(e.target.value)}
                            required/>

                        <label className='label'>
                            Associated Publication References
                        </label>
                        <input
                            placeholder='References'
                            className='input-container'
                            value={associatedPubliRef}
                            onChange={e => setAssociatedPubliRef(e.target.value)}
                            required/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="outline-primary" type={"submit"} disabled={isLoading}>
                            {isLoading ? <LoadingIcon/> : null}
                            {isLoading ? 'Adding...' : 'Add'}
                        </Button>

                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default PostDocAdd;
