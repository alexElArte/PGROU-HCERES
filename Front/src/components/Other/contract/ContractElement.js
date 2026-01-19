import {ListGroup} from "react-bootstrap";

const ContractElement = (props) =>
    props.targetContract ? <ListGroup horizontal={props.horizontal}>
        <ListGroup.Item variant={"primary"}>ID : {props.targetContract.contractId}</ListGroup.Item>
        <ListGroup.Item>Status : {props.targetContract.status.statusName}</ListGroup.Item>
        <ListGroup.Item>Type de Contrat : {props.targetContract.contractType.contractTypeName}</ListGroup.Item>
        <ListGroup.Item>Départ : {props.targetContract.startContract}</ListGroup.Item>
        <ListGroup.Item>Fin : {props.targetContract.endContract}</ListGroup.Item>
        <ListGroup.Item>Fonction : {props.targetContract.functionContract}</ListGroup.Item>
    </ListGroup> : "Target contract is not send as props!"


export default ContractElement