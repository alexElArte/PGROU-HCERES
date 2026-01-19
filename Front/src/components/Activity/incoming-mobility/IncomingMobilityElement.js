import {ListGroup} from "react-bootstrap";

const IncomingMobilityElement = (props) =>
    props.targetIncomingMobility && props.targetIncomingMobility.incomingMobility ? <ListGroup horizontal={props.horizontal}>
        <ListGroup.Item variant={"primary"}>ID : {props.targetIncomingMobility.idActivity}</ListGroup.Item>
        <ListGroup.Item>Nom scientifique principal : {props.targetIncomingMobility.incomingMobility.nameSeniorScientist}</ListGroup.Item>
        <ListGroup.Item>Date de départ : {props.targetIncomingMobility.incomingMobility.departureDate}</ListGroup.Item>
        <ListGroup.Item>Date d'arrivée : {props.targetIncomingMobility.incomingMobility.arrivalDate}</ListGroup.Item>
        <ListGroup.Item>Durée : {props.targetIncomingMobility.incomingMobility.duration}</ListGroup.Item>
        <ListGroup.Item>Nationalité : {props.targetIncomingMobility.incomingMobility.nationality}</ListGroup.Item>
        <ListGroup.Item>Nom du laboratoire d'origine : {props.targetIncomingMobility.incomingMobility.originalLabName}</ListGroup.Item>
        <ListGroup.Item>Emplacement du laboratoire d'origine : {props.targetIncomingMobility.incomingMobility.originaLabLocation}</ListGroup.Item>
        <ListGroup.Item>Partenaire pi : {props.targetIncomingMobility.incomingMobility.piPartner}</ListGroup.Item>
        <ListGroup.Item>Titre du projet : {props.targetIncomingMobility.incomingMobility.projectTitle}</ListGroup.Item>
        <ListGroup.Item>Financement associé : {props.targetIncomingMobility.incomingMobility.associatedFunding}</ListGroup.Item>
        <ListGroup.Item>Publication Référence : {props.targetIncomingMobility.incomingMobility.publicationReference}</ListGroup.Item>
        <ListGroup.Item>Collaboration stratégique récurrente ?: {props.targetIncomingMobility.incomingMobility.strategicRecurringCollab?"Oui": "Non"}</ListGroup.Item>
        <ListGroup.Item>Projet actif ?: {props.targetIncomingMobility.incomingMobility.activeProject?"Oui": "Non"}</ListGroup.Item>
        <ListGroup.Item>umr Coordonné ? : {props.targetIncomingMobility.incomingMobility.umrCoordinated?"Oui": "Non"}</ListGroup.Item>
        <ListGroup.Item>Accord signé ? : {props.targetIncomingMobility.incomingMobility.agreementSigned?"Oui": "Non"}</ListGroup.Item>
    </ListGroup> : "Target incomingMobility is not send as props!"


export default IncomingMobilityElement