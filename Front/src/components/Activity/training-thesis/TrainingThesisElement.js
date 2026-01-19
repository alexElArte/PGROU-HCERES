import { ListGroup } from "react-bootstrap";

const TrainingThesisElement = (props) =>
    props.targetTrainingThesis && props.targetTrainingThesis.trainingThesis ?
        <ListGroup horizontal={props.horizontal}>
            <ListGroup.Item variant="primary">
                ID : {props.targetTrainingThesis.idActivity}
            </ListGroup.Item>
            <ListGroup.Item>
                Début : {props.targetTrainingThesis.trainingThesis.thesisStart}
            </ListGroup.Item>
            <ListGroup.Item>
                Durée : {props.targetTrainingThesis.trainingThesis.thesisDuration} an(s)
            </ListGroup.Item>
            <ListGroup.Item>
                Financement : {props.targetTrainingThesis.trainingThesis.thesisMainFunding}
            </ListGroup.Item>
            <ListGroup.Item>
                Soutenance :
                {" "}
                {props.targetTrainingThesis.trainingThesis.thesisDefenseDate
                    ? props.targetTrainingThesis.trainingThesis.thesisDefenseDate
                    : "Non renseignée"}
            </ListGroup.Item>
            <ListGroup.Item>
                Futur :
                {" "}
                {props.targetTrainingThesis.trainingThesis.thesisFutur
                    ? props.targetTrainingThesis.trainingThesis.thesisFutur
                    : "Non renseigné"}
            </ListGroup.Item>
            <ListGroup.Item>
                Articles : {props.targetTrainingThesis.trainingThesis.thesisNumberArticles ?? "?"}
            </ListGroup.Item>
            <ListGroup.Item>
                Articles (1ère/2ème pos.) : {props.targetTrainingThesis.trainingThesis.thesisNumberArticlesFirstSecondPosition ?? "?"}
            </ListGroup.Item>
            <ListGroup.Item>
                Références :
                {" "}
                {props.targetTrainingThesis.trainingThesis.thesisArticlesFirstSecondPositionReferences
                    ? props.targetTrainingThesis.trainingThesis.thesisArticlesFirstSecondPositionReferences
                    : "Aucune"}
            </ListGroup.Item>
        </ListGroup>
        : "Target TrainingThesis is not sent as props!";

export default TrainingThesisElement;
