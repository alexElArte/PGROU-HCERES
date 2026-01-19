import axios from "axios";
import MyGlobalVar from "../../MyGlobalVar";
import {API_URL} from "../../../constants";

export const fetchListResearchContractFundedCharit = async () => {
    if (!MyGlobalVar.listeResearchContractFundedCharit) {
        const response = await axios.get(API_URL + "/ResearchContractFundedCharits");
        MyGlobalVar.listeResearchContractFundedCharit = response.data;
    }
    return MyGlobalVar.listeResearchContractFundedCharit;
}

export const addResearchContractFundedCharit = async (data) => {
    return await axios.post(API_URL + "/ResearchContractFundedCharit/Create", data)
        .then(response => {

            if (MyGlobalVar.listeResearchContractFundedCharit) {
                response = MyGlobalVar.addResearcherDataToActivity(response);

                // concat pour forcer la mise à jour de React
                MyGlobalVar.listeResearchContractFundedCharit =
                    MyGlobalVar.listeResearchContractFundedCharit.concat([response.data]);
            }

            return response;
        });
}

export const deleteResearchContractFundedCharit = async (idActivity) => {
    return await axios.delete(API_URL + "/ResearchContractFundedCharit/Delete/" + idActivity)
        .then(response => {

            // suppression + recréation d'un nouvel array => déclenche un rerender
            MyGlobalVar.listeResearchContractFundedCharit =
                MyGlobalVar.deleteActivity(MyGlobalVar.listeResearchContractFundedCharit, idActivity);

            return response;
        });
}
