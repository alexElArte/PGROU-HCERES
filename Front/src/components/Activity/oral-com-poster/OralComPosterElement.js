import {ListGroup} from "react-bootstrap";

const OralComPosterElement = (props) =>
    props.targetOralComPoster && props.targetOralComPoster.oralComPoster ? <ListGroup horizontal={props.horizontal}>
        <ListGroup.Item variant={"primary"}>ID : {props.targetOralComPoster.idActivity}</ListGroup.Item>
        <ListGroup.Item>Titre : {props.targetOralComPoster.oralComPoster.oralComPosterTitle}</ListGroup.Item>
        <ListGroup.Item>Auteurs : {props.targetOralComPoster.oralComPoster.authors}</ListGroup.Item>
        <ListGroup.Item>Date : {props.targetOralComPoster.oralComPoster.oralComPosterDat}</ListGroup.Item>
        <ListGroup.Item>Identifiant de la réunion : {props.targetOralComPoster.oralComPoster.meeting.meetingId}</ListGroup.Item>
        <ListGroup.Item>Nom de la réunion : {props.targetOralComPoster.oralComPoster.meeting.meetingName}</ListGroup.Item>
        <ListGroup.Item>Année de réunion : {props.targetOralComPoster.oralComPoster.meeting.meetingYear}</ListGroup.Item>
        <ListGroup.Item>Lieu de réunion : {props.targetOralComPoster.oralComPoster.meeting.meetingLocation}</ListGroup.Item>
        <ListGroup.Item>Date de début de la réunion : {props.targetOralComPoster.oralComPoster.meeting.meetingStart}</ListGroup.Item>
        <ListGroup.Item>Date de fin de réunion : {props.targetOralComPoster.oralComPoster.meeting.meetingEnd}</ListGroup.Item>
    </ListGroup> : "Target oralComPoster is not send as props!"


export default OralComPosterElement