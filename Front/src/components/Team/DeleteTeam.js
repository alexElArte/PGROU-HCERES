import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import TeamElement from "./TeamElement";
import LoadingIcon from "../util/LoadingIcon";
import {deleteTeam} from "../../services/Team/TeamActions";
import {useTranslation} from "react-i18next";

function DeleteTeam(props) {
    const { t } = useTranslation();
    const [show, setShow] = useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const targetTeam = props.targetTeam;
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
        deleteTeam(targetTeam.teamId)
            .then(response => {
                const msg = {
                    "teamDeleted": targetTeam,
                    "successMsg": t("team.delete success", {id: targetTeam.teamId}),
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const status = error.response?.status;
            const msg = {
                "errorMsg": t("team.delete failed status", {status: status ?? "unknown"}),
            }
            handleClose(msg);
        })
            .finally(() => setIsLoading(false));
    }

    return (
        <Modal show={show} onHide={silentClose}>
            <Modal.Header closeButton>
                <Modal.Title>{t("team.confirm delete selected")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TeamElement targetTeam={targetTeam} />
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


export default DeleteTeam;

