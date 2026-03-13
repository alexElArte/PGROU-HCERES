import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResearcherElement from "./ResearcherElement";
import LoadingIcon from "../util/LoadingIcon";
import {deleteResearcher} from "../../services/Researcher/ResearcherActions";
import {useTranslation} from "react-i18next";

function DeleteResearcher(props) {
    const { t } = useTranslation();
    const [show, setShow] = useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const targetResearcher = props.targetResearcher;
    const silentClose = () => {
        setShow(false);
        props.onHideAction();
    };

    const handleClose = (msg) => {
        setShow(false);
        props.onHideAction(msg);
    };

    const handleDelete = () => {
        setIsLoading(true);
        deleteResearcher(targetResearcher.researcherId)
            .then(response => {
                const msg = {
                    "researcherDeleted": targetResearcher,
                    "successMsg": t("members.researcher delete success", {id: targetResearcher.researcherId}),
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const status = error.response?.status;
            const msg = {
                "errorMsg": t("members.researcher delete failed status", {status: status ?? "unknown"}),
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false));
    }

    return (
        <Modal show={show} onHide={silentClose}>
            <Modal.Header closeButton>
                <Modal.Title>{t("members.confirm delete researcher")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ResearcherElement targetResearcher={targetResearcher} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={silentClose}>
                    {t("common.no")}
                </Button>
                <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
                    {isLoading ? <LoadingIcon color={"white"}/> : null}
                    {isLoading ? t("common.deleting") : t("common.yes delete")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


export default DeleteResearcher;

