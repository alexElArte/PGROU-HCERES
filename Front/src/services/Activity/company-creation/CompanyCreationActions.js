import axios from "axios";
import MyGlobalVar from "../../MyGlobalVar";
import {API_URL} from "../../../constants";

export const fetchListCompanyCreations = async () => {
    if (!MyGlobalVar.listeCompanyCreations) {
        const response = await axios.get(API_URL + "/CompanyCreations");
        MyGlobalVar.listeCompanyCreations = response.data;
    }
    return MyGlobalVar.listeCompanyCreations;
}

export const addCompanyCreation = async (data) => {
    return await axios.post(API_URL + "/CompanyCreation/Create", data).then(response => {
        if (MyGlobalVar.listeCompanyCreations) {
            response = MyGlobalVar.addResearcherDataToActivity(response)
            // using method push will use same reference of table,
            // so it will not trigger change state, therefore creating copy of the array
            // using concat method
            MyGlobalVar.listeCompanyCreations = MyGlobalVar.listeCompanyCreations.concat([response.data])
        }
        return response
    });
}

export const deleteCompanyCreation = async (idActivity) => {
    return await axios.delete(API_URL + "/CompanyCreation/Delete/" + idActivity).then(response => {
        // change to a new reference => cause change state immediately
        MyGlobalVar.listeCompanyCreations = MyGlobalVar.deleteActivity(MyGlobalVar.listeCompanyCreations, idActivity)
        return response
    });
}