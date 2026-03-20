import {ListGroup} from "react-bootstrap";

const EducationElement = (props) =>
    props.targetEducation && props.targetEducation.education ? <ListGroup horizontal={props.horizontal}>
        <ListGroup.Item variant={"primary"}>ID : {props.targetEducation.idActivity}</ListGroup.Item>
        <ListGroup.Item>{props.t("activity.education.nameTeachingShort")} : {props.targetEducation.activity.education.educationCourseName}</ListGroup.Item>
        <ListGroup.Item>{props.t("activity.education.descriptionShort")} : {props.targetEducation.activity.education.educationDescription}</ListGroup.Item>
        <ListGroup.Item>{props.t("activity.education.formationShort")} : {props.targetEducation.activity.education.educationFormation}</ListGroup.Item>
        <ListGroup.Item>{props.t("activity.education.endDate")} : {props.targetEducation.activity.education.educationCompletion}</ListGroup.Item>
    </ListGroup> : "Target education is not send as props!"


export default EducationElement