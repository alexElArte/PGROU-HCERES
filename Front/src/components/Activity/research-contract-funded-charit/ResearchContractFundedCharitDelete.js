import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingIcon from "../../util/LoadingIcon";
import ResearchContractFundedCharitElement from "./ResearchContractFundedCharitElement";
import {deleteResearchContractFundedCharit} from "../../../services/Activity/research-contract-funded-charit/ResearchContractFundedCharitActions";

function ResearchContractFundedCharitDelete(props) {
    const [show, setShow] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const targetResearchContractFundedCharit = props.targetResearchContractFundedCharit;

    const handleClose = (msg = null) => {
        setShow(false);
        props.onHideAction(msg);
    };

    const handleDelete = () => {
        setIsLoading(true);
        deleteResearchContractFundedCharit(targetResearchContractFundedCharit.idActivity)
            .then(response => {
                const msg = {
                    successMsg:
                        "ResearchContractFundedCharit deleted with id " +
                        targetResearchContractFundedCharit.idActivity,
                };
                handleClose(msg);
            })
            .catch(error => {
                console.log(error);
                const status = error?.response?.status ?? "unknown";
                const msg = {
                    errorMsg:
                        "ResearchContractFundedCharit not deleted, response status: " +
                        status,
                };
                handleClose(msg);
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Are you sure you want to delete the selected activity?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ResearchContractFundedCharitElement
                    targetResearchContractFundedCharit={targetResearchContractFundedCharit}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
                <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
                    {isLoading ? <LoadingIcon color={"white"}/> : null}
                    {isLoading ? "Deleting..." : "Yes, delete"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ResearchContractFundedCharitDelete;
