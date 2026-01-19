import {ListGroup} from "react-bootstrap";

const TeamElement = (props) =>
    props.targetTeam ? <ListGroup horizontal={props.horizontal}>
        <ListGroup.Item variant={"primary"}>ID : {props.targetTeam.teamId}</ListGroup.Item>
        <ListGroup.Item>Name : {props.targetTeam.teamName}</ListGroup.Item>
        <ListGroup.Item>Date : {props.targetTeam.teamCreationDate}</ListGroup.Item>
    </ListGroup> : "Target team is not send as props!"


export default TeamElement