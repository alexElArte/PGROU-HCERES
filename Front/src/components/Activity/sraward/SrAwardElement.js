import {ListGroup} from "react-bootstrap";

const SrAwardElement = (props) =>
    props.targetSrAward && props.targetSrAward.srAward ? <ListGroup horizontal={props.horizontal}>
        <ListGroup.Item variant={"primary"}>ID : {props.targetSrAward.idActivity}</ListGroup.Item>
        <ListGroup.Item>Name : {props.targetSrAward.srAward.awardeeName}</ListGroup.Item>
        <ListGroup.Item>Description : {props.targetSrAward.srAward.description}</ListGroup.Item>
        <ListGroup.Item>Completetion : {props.targetSrAward.srAward.awardDate}</ListGroup.Item>
    </ListGroup> : "Target SrAward is not send as props!"


export default SrAwardElement