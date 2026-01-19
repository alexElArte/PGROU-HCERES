import {ListGroup} from "react-bootstrap";

const PlatformElement = (props) =>
    props.targetPlatform && props.targetPlatform.platform ? <ListGroup horizontal={props.horizontal}>
        <ListGroup.Item variant={"primary"}>ID : {props.targetPlatform.idActivity}</ListGroup.Item>
        <ListGroup.Item>Date de creation : {props.targetPlatform.platform.creationDate}</ListGroup.Item>
        <ListGroup.Item>Description : {props.targetPlatform.platform.description}</ListGroup.Item>
        <ListGroup.Item>Affiliation : {props.targetPlatform.platform.affiliation}</ListGroup.Item>
        <ListGroup.Item>Labellisation : {props.targetPlatform.platform.labellisation}</ListGroup.Item>
        <ListGroup.Item>Open Private Researchers : {props.targetPlatform.platform.openPrivateResearchers? "Oui": "Non"}</ListGroup.Item>
    </ListGroup> : "Target platform is not send as props!"


export default PlatformElement