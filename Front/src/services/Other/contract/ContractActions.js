import axios from "axios";
import MyGlobalVar from "../../MyGlobalVar";
import {API_URL} from "../../../constants";
import {fetchListResearchers} from "../../Researcher/ResearcherActions";

export const fetchListContracts = async () => {
    if (!MyGlobalVar.listeContracts) {
        const response = await axios.get(API_URL + "/Contracts");
        await fetchListResearchers()
        response.data = response.data.map(c => MyGlobalVar.addSingleResearcherDataToEntity(c))
        MyGlobalVar.listeContracts = response.data;
    }
    return MyGlobalVar.listeContracts;
}


export const fetchResearcherContracts = async (researcherId) => {
    const response = await axios.get(API_URL + "/Contract/Researcher/" + researcherId);
    return response.data.map(c => MyGlobalVar.addSingleResearcherDataToEntity(c))
}

export const addContract = async (data) => {
    return await axios.post(API_URL + "/Contract/Create", data).then(response => {
        if (MyGlobalVar.listeContracts) {
            response.data = MyGlobalVar.addSingleResearcherDataToEntity(response.data)
            response.data = MyGlobalVar.addStatuteDataToEntity(response.data)
            response.data = MyGlobalVar.addContractTypeDataToEntity(response.data)
            // using method push will use same reference of table,
            // so it will not trigger change state, therefore creating copy of the array
            // using concat method
            MyGlobalVar.listeContracts = MyGlobalVar.listeContracts.concat([response.data])
        }
        return response
    });
}

export const deleteContract = async (targetContract) => {
    return await axios.delete(API_URL + "/Contract/Delete/" + targetContract.contractId).then(response => {
        // change to a new reference => cause change state immediately
        MyGlobalVar.listeContracts = MyGlobalVar?.listeContracts?.filter(ctr => ctr.contractId !== targetContract.contractId)
        return response
    });
}