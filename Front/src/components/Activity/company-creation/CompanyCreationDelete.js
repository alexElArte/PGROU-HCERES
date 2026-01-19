import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingIcon from "../../util/LoadingIcon";
import CompanyCreationElement from "./CompanyCreationElement";
import {deleteCompanyCreation} from "../../../services/Activity/company-creation/CompanyCreationActions";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function CompanyCreationDelete(props) {
    const [show, setShow] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const targetCompanyCreation = props.targetCompanyCreation;
    const deleteTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Activity will be deleted
        </Tooltip>
    )

    const handleClose = (msg = null) => {
        setShow(false);
        props.onHideAction(msg);
    };

    const handleDelete = () => {
        setIsLoading(true);
        deleteCompanyCreation(targetCompanyCreation.idActivity)
            .then(response => {
                const msg = {
                    "successMsg": "Creation of company / start up deleted with id " + targetCompanyCreation.idActivity,
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Creation of company / start up not deleted, response status: " + error.response.status,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false))
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delte Creation of company / start up ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CompanyCreationElement targetCompanyCreation={targetCompanyCreation}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>

                <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={deleteTooltip}
                >
                <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
                    {isLoading ? <LoadingIcon color={"white"}/> : null}
                    {isLoading ? 'Deleting...' : 'Yes, Delete'}
                </Button>
                </OverlayTrigger>
            </Modal.Footer>
        </Modal>
    );
}


export default CompanyCreationDelete;

