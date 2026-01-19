import axios from "axios";
import MyGlobalVar from "../MyGlobalVar";
import {API_URL} from "../../constants";

export const fetchListInstitutions = async () => {
    if (!MyGlobalVar.listeInstitutions) {
        const response = await axios.get(API_URL + "/Institutions");
        MyGlobalVar.listeInstitutions = response.data;
    }
    return MyGlobalVar.listeInstitutions;
}

export const addInstitution = async (data) => {
    return await axios.post(API_URL + "/Institution/Create", data).then(response => {
        if (MyGlobalVar.listeInstitutions) {
            response = MyGlobalVar.addResearcherDataToActivity(response)
            // using method push will use same reference of table,
            // so it will not trigger change state, therefore creating copy of the array
            // using concat method
            MyGlobalVar.listeInstitutions = MyGlobalVar.listeInstitutions.concat([response.data])
        }
        return response
    });
}

export const deleteInstitution = async (idInstitution) => {
    return await axios.delete(API_URL + "/Institution/Delete/" + idInstitution).then(response => {
        // change to a new reference => cause change state immediately
        MyGlobalVar.listeInstitutions = MyGlobalVar.deleteActivity(MyGlobalVar.listeInstitutions, idInstitution)
        return response
    });
}