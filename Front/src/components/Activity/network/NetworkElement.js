import { ListGroup } from "react-bootstrap";
import { withTranslation } from "react-i18next";

const NetworkElement = (props) => {
  const { t, targetNetwork, horizontal } = props;
  
  const network = targetNetwork.network;

  return (
    <ListGroup horizontal={horizontal}>
      <ListGroup.Item variant="primary">ID : {targetNetwork.idActivity}</ListGroup.Item>
      <ListGroup.Item>{t("activity.network.nameNetwork")} : {network.nameNetwork}</ListGroup.Item>
      <ListGroup.Item>{t("activity.network.startDate")} : {network.startDate}</ListGroup.Item>
      <ListGroup.Item>{t("activity.network.activeNetwork")} : {network.activeNetwork}</ListGroup.Item>
      <ListGroup.Item>{t("activity.network.associatedFunding")} : {network.associatedFunding}</ListGroup.Item>
      <ListGroup.Item>{t("activity.network.nbResultingPublications")} : {network.nbResultingPublications}</ListGroup.Item>
      <ListGroup.Item>{t("activity.network.refResultingPublications")} : {network.refResultingPublications}</ListGroup.Item>
      <ListGroup.Item>{t("activity.network.umrCoordinated")} : {network.umrCoordinated}</ListGroup.Item>
      <ListGroup.Item>{t("activity.network.agreementSigned")} : {network.agreementSigned}</ListGroup.Item>
    </ListGroup>
  );
};

export default withTranslation()(NetworkElement);
