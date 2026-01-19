import {ListGroup} from "react-bootstrap";

const ReviewArticleElement = (props) =>
    props.targetReviewArticle && props.targetReviewArticle.reviewArticle ? <ListGroup horizontal={props.horizontal}>
        <ListGroup.Item variant={"primary"}>ID : {props.targetReviewArticle.idActivity}</ListGroup.Item>
        <ListGroup.Item>Année : {props.targetReviewArticle.reviewArticle.year}</ListGroup.Item>
        <ListGroup.Item>Nombre de revue d'article : {props.targetReviewArticle.reviewArticle.nbReviewedArticles}</ListGroup.Item>
        <ListGroup.Item>Facteur d'impact : {props.targetReviewArticle.reviewArticle.impactFactor}</ListGroup.Item>
        <ListGroup.Item>Nom du journal : {props.targetReviewArticle.reviewArticle.journal.journalName}</ListGroup.Item>


    </ListGroup> : "Target reviewArticle is not send as props!"


export default ReviewArticleElement