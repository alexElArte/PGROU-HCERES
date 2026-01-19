import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResearcherSelect from "../../util/ResearcherSelect";
import LoadingIcon from "../../util/LoadingIcon";
import {addResearchContractFundedCharit} from "../../../services/Activity/research-contract-funded-charit/ResearchContractFundedCharitActions";

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function ResearchContractFundedCharitAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction;

    // UI states (Add Template)
    const [showModal, setShowModal] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    // Form state (adapté à ResearchContractFundedCharit)
        const [researcherIds, setResearcherIds] = React.useState([]); // tableau d'IDs
    

    const [dateContractAward, setDateContractAward] = React.useState("");
    const [fundingInstitution, setFundingInstitution] = React.useState("");
    const [projectTitle, setProjectTitle] = React.useState("");
    const [startYear, setStartYear] = React.useState("");
    const [endYear, setEndYear] = React.useState("");
    const [grantAmount, setGrantAmount] = React.useState("");
    const [typeResearchContractId, setTypeResearchContractId] = React.useState("");

    const handleClose = (msg = null) => {
        setShowModal(false);
        onHideParentAction(msg);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const data = {
            researcherIds: researcherIds,
            dateContractAward: dateContractAward,
            fundingInstitution: fundingInstitution,
            projectTitle: projectTitle,
            startYear: startYear ? parseInt(startYear, 10) : null,
            endYear: endYear ? parseInt(endYear, 10) : null,
            grantAmount: grantAmount ? parseInt(grantAmount, 10) : null,
            typeResearchContractId: typeResearchContractId
                ? parseInt(typeResearchContractId, 10)
                : null,
        };

        addResearchContractFundedCharit(data)
            .then(response => {
                const msg = {
                    successMsg:
                        "Research contract funded by public or charitable institutions add with an id " +
                        response.data.idActivity,
                };
                handleClose(msg);
            })
            .catch(error => {
                console.log(error);
                const msg = {
                    errorMsg:
                        "Erreur Research contract funded by public or charitable institutions not added,  response status: " +
                        (error.response ? error.response.status : "inconnue"),
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
                        <Modal.Title>Add an Research contract funded by public or charitable institutions </Modal.Title>
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
                            Award Contract Date
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setDateContractAward(e.target.value)}
                            required
                        />

                        <label className='label'>
                            Funding Institution
                        </label>
                        <input
                            type="text"
                            placeholder="Institution"
                            className='input-container'
                            value={fundingInstitution}
                            onChange={e => setFundingInstitution(e.target.value)}
                            required
                        />

                        <label className='label'>
                            Project Title
                        </label>
                        <input
                            type="text"
                            placeholder="Project Title"
                            className='input-container'
                            value={projectTitle}
                            onChange={e => setProjectTitle(e.target.value)}
                            required
                        />

                        <label className='label'>
                            Start Year
                        </label>
                        <input
                            type="number"
                            className='input-container'
                            placeholder="Ex : 2024"
                            value={startYear}
                            onChange={e => setStartYear(e.target.value)}
                            required
                        />

                        <label className='label'>
                            End Year
                        </label>
                        <input
                            type="number"
                            className='input-container'
                            placeholder="Ex : 2027"
                            value={endYear}
                            onChange={e => setEndYear(e.target.value)}
                            required
                        />

                        <label className='label'>
                            Grant Amount (€)
                        </label>
                        <input
                            type="number"
                            className='input-container'
                            placeholder="Ex : 50000"
                            value={grantAmount}
                            onChange={e => setGrantAmount(e.target.value)}
                            required
                        />

                        <label className='label'>
                            Contract Type (id)
                        </label>
                        <input
                            type="number"
                            className='input-container'
                            placeholder="Contract Type"
                            value={typeResearchContractId}
                            onChange={e => setTypeResearchContractId(e.target.value)}
                            required
                        />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="outline-primary" type="submit" disabled={isLoading}>
                            {isLoading ? <LoadingIcon/> : null}
                            {isLoading ? 'Adding...' : 'Add'}
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default ResearchContractFundedCharitAdd;
