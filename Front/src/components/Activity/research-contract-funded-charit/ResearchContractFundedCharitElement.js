import { ListGroup } from "react-bootstrap";

const ResearchContractFundedCharitElement = (props) =>
    props.targetResearchContractFundedCharit &&
        props.targetResearchContractFundedCharit.researchContractFundedCharit ? (

        <ListGroup horizontal={props.horizontal}>

            <ListGroup.Item variant={"primary"}>
                ID : {props.targetResearchContractFundedCharit.idActivity}
            </ListGroup.Item>

            <ListGroup.Item>
                Award Contract Date : {
                    props.targetResearchContractFundedCharit.researchContractFundedCharit.dateContractAward
                }
            </ListGroup.Item>

            <ListGroup.Item>
                Funding Institution : {
                    props.targetResearchContractFundedCharit.researchContractFundedCharit.fundingInstitution
                }
            </ListGroup.Item>

            <ListGroup.Item>
                Project Title : {
                    props.targetResearchContractFundedCharit.researchContractFundedCharit.projectTitle
                }
            </ListGroup.Item>

            <ListGroup.Item>
                Start Year : {
                    props.targetResearchContractFundedCharit.researchContractFundedCharit.startYear
                }
            </ListGroup.Item>

            <ListGroup.Item>
                End Year : {
                    props.targetResearchContractFundedCharit.researchContractFundedCharit.endYear
                }
            </ListGroup.Item>

            <ListGroup.Item>
                Grant Amount : {
                    props.targetResearchContractFundedCharit.researchContractFundedCharit.grantAmount
                } €
            </ListGroup.Item>

            <ListGroup.Item>
                Contract Type (id) : {
                    props.targetResearchContractFundedCharit.researchContractFundedCharit.typeResearchContractId
                }
            </ListGroup.Item>

        </ListGroup>

    ) : (
        "Target ResearchContractFundedCharit is not send as props!"
    );

export default ResearchContractFundedCharitElement;
