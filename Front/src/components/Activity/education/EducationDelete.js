import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingIcon from "../../util/LoadingIcon";
import EducationElement from "./EducationElement";
import {deleteEducation} from "../../../services/Activity/education/EducationActions";

function EducationDelete(props) {
    const { t } = props;

    const [show, setShow] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const targetEducation = props.targetEducation;

    const handleClose = (msg = null) => {
        setShow(false);
        props.onHideAction(msg);
    };

    const handleDelete = () => {
        setIsLoading(true);
        deleteEducation(targetEducation.idActivity)
            .then(response => {
                const msg = {
                    "successMsg": t("activity.education.success delete") + " " + targetEducation.idActivity,
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": t("activity.education.error delete") + " " + targetEducation.idActivity,
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false))
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{t("common.confirm delete")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EducationElement targetEducation={targetEducation}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Non
                </Button>
                <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
                    {isLoading ? <LoadingIcon color={"white"}/> : null}
                    {isLoading ? 'Suppression en cours...' : 'Oui, Supprimer'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


export default EducationDelete;

