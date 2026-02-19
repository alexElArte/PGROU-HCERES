import { ListGroup } from "react-bootstrap";
import { withTranslation } from "react-i18next";

const PostDocElement = (props) => {
  const { t, targetPostDoc, horizontal } = props;

  const postDoc = targetPostDoc.postDoc;

  return (
    <ListGroup horizontal={horizontal}>
      <ListGroup.Item variant="primary">ID : {targetPostDoc.idActivity}</ListGroup.Item>
      <ListGroup.Item>{t("activity.post-docs.namePostDoc")} : {postDoc.namePostDoc}</ListGroup.Item>
      <ListGroup.Item>{t("activity.post-docs.nameSupervisor")} : {postDoc.nameSupervisor}</ListGroup.Item>
      <ListGroup.Item>{t("activity.post-docs.arrivalDate")} : {postDoc.arrivalDate}</ListGroup.Item>
      <ListGroup.Item>{t("activity.post-docs.departureDate")} : {postDoc.departureDate}</ListGroup.Item>
      <ListGroup.Item>{t("activity.post-docs.duration")} : {postDoc.duration}</ListGroup.Item>
      <ListGroup.Item>{t("activity.post-docs.nationality")} : {postDoc.nationality}</ListGroup.Item>
      <ListGroup.Item>{t("activity.post-docs.originalLab")} : {postDoc.originalLab}</ListGroup.Item>
      <ListGroup.Item>{t("activity.post-docs.associatedFunding")} : {postDoc.associatedFunding}</ListGroup.Item>
      <ListGroup.Item>{t("activity.post-docs.associatedPubliRef")} : {postDoc.associatedPubliRef}</ListGroup.Item>
    </ListGroup>
  );
};

export default withTranslation()(PostDocElement);
