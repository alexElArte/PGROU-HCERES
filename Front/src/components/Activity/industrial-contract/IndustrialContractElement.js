import {ListGroup} from "react-bootstrap";

const IndustrialContractElement = (props) =>
    props.targetIndustrialContract && props.targetIndustrialContract.seiIndustrialRDContract ? <ListGroup horizontal={props.horizontal}>
        <ListGroup.Item variant={"primary"}>ID : {props.targetIndustrialContract.idActivity}</ListGroup.Item>
        <ListGroup.Item>Project Title : {props.targetIndustrialContract.seiIndustrialRDContract.projectTitle}</ListGroup.Item>
        <ListGroup.Item>Company Involved Name : {props.targetIndustrialContract.seiIndustrialRDContract.nameCompanyInvolved}</ListGroup.Item>
        <ListGroup.Item>Agreement Amount : {props.targetIndustrialContract.seiIndustrialRDContract.agreementAmount}</ListGroup.Item>
        <ListGroup.Item>Associated Publication References: {props.targetIndustrialContract.seiIndustrialRDContract.associatedPubliRef}</ListGroup.Item>
        <ListGroup.Item>Departure Date : {props.targetIndustrialContract.seiIndustrialRDContract.startDate}</ListGroup.Item>
        <ListGroup.Item>End Date : {props.targetIndustrialContract.seiIndustrialRDContract.endDate}</ListGroup.Item>
    </ListGroup> : "Target industrialContract is not send as props!"


export default IndustrialContractElement