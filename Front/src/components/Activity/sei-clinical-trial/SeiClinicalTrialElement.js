import {ListGroup} from "react-bootstrap";

const SeiClinicalTrialElement = (props) =>
    props.targetSeiClinicalTrial && props.targetSeiClinicalTrial.seiClinicalTrial ? <ListGroup horizontal={props.horizontal}>
        <ListGroup.Item variant={"primary"}>ID : {props.targetSeiClinicalTrial.idActivity}</ListGroup.Item>
        <ListGroup.Item>Titre d'essai clinique : {props.targetSeiClinicalTrial.seiClinicalTrial.titleClinicalTrial}</ListGroup.Item>
        <ListGroup.Item>Coordinateur Partenaire : {props.targetSeiClinicalTrial.seiClinicalTrial.coordinatorPartner?"Oui":"Non"}</ListGroup.Item>
        <ListGroup.Item>Date de début : {props.targetSeiClinicalTrial.seiClinicalTrial.startDate}</ListGroup.Item>
        <ListGroup.Item>Date de fin : {props.targetSeiClinicalTrial.seiClinicalTrial.endDate}</ListGroup.Item>
        <ListGroup.Item>N° d'enregistrement : {props.targetSeiClinicalTrial.seiClinicalTrial.registrationNb}</ListGroup.Item>
        <ListGroup.Item>Nom du sponsor : {props.targetSeiClinicalTrial.seiClinicalTrial.sponsorName}</ListGroup.Item>
        <ListGroup.Item>inclus Patients Nb : {props.targetSeiClinicalTrial.seiClinicalTrial.includedPatientsNb}</ListGroup.Item>
        <ListGroup.Item>financement : {props.targetSeiClinicalTrial.seiClinicalTrial.funding}</ListGroup.Item>
        <ListGroup.Item>Montant du financement : {props.targetSeiClinicalTrial.seiClinicalTrial.fundingAmount}</ListGroup.Item>
    </ListGroup> : "Target seiClinicalTrial is not send as props!"


export default SeiClinicalTrialElement