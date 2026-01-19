import {ListGroup} from "react-bootstrap";

const PatentElement = (props) =>
    props.targetPatent && props.targetPatent.patent ? <ListGroup horizontal={props.horizontal}>
        <ListGroup.Item variant={"primary"}>ID : {props.targetPatent.idActivity}</ListGroup.Item>
            <ListGroup.Item>Titre : {props.targetPatent.patent.title}</ListGroup.Item>
            <ListGroup.Item>Date d'inscription : {props.targetPatent.patent.registrationDate}</ListGroup.Item>
            <ListGroup.Item>Date de dépôt : {props.targetPatent.patent.filingDate}</ListGroup.Item>
            <ListGroup.Item>Date d'acceptation : {props.targetPatent.patent.acceptationDate}</ListGroup.Item>
            <ListGroup.Item>Date de licence : {props.targetPatent.patent.licensingDate}</ListGroup.Item>
            <ListGroup.Item>Inventeurs : {props.targetPatent.patent.inventors}</ListGroup.Item>
            <ListGroup.Item>Copropriétaires : {props.targetPatent.patent.coOwners}</ListGroup.Item>
            <ListGroup.Item>Numéro de priorité : {props.targetPatent.patent.priorityNumber}</ListGroup.Item>
            <ListGroup.Item>Date de priorité : {props.targetPatent.patent.priorityDate}</ListGroup.Item>
            <ListGroup.Item>Numéro de publication : {props.targetPatent.patent.publicationNumber}</ListGroup.Item>
            <ListGroup.Item>Date de publication : {props.targetPatent.patent.publicationDate}</ListGroup.Item>
            <ListGroup.Item>Lien inpi : {props.targetPatent.patent.inpiLink}</ListGroup.Item>
            <ListGroup.Item>Statut : {props.targetPatent.patent.status?'True':'False'}</ListGroup.Item>
            <ListGroup.Item>Pct extension obtenue : {props.targetPatent.patent.pctExtensionObtained?'True':'False'}</ListGroup.Item>
            <ListGroup.Item>Numéro de publication Pct Extension : {props.targetPatent.patent.publicationNumberPctExtension}</ListGroup.Item>
            <ListGroup.Item>Publication Date Pct Prolongation : {props.targetPatent.patent.publicationDatePctExtension}</ListGroup.Item>
            <ListGroup.Item>Extension internationale : {props.targetPatent.patent.internationalExtension?'True':'False'}</ListGroup.Item>
            <ListGroup.Item>Numéro de publication Extension internationale : {props.targetPatent.patent.publicationNumberInternationalExtension}</ListGroup.Item>
            <ListGroup.Item>Date de publication Extension internationale : {props.targetPatent.patent.publicationDateInternationalExtension}</ListGroup.Item>
            <ListGroup.Item>Ref Contrat de Transfert : {props.targetPatent.patent.refTransferContract}</ListGroup.Item>
            <ListGroup.Item>Nom Société impliquée : {props.targetPatent.patent.nameCompanyInvolved}</ListGroup.Item>
            <ListGroup.Item>Nom Choix : {props.targetPatent.patent.typePatentId.nameChoice}</ListGroup.Item>
    </ListGroup> : "Target patent is not send as props!"


export default PatentElement