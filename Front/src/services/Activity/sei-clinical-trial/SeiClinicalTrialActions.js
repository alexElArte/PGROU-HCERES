import axios from "axios";
import MyGlobalVar from "../../MyGlobalVar";
import {API_URL} from "../../../constants";

export const fetchListSeiClinicalTrials = async () => {
    if (!MyGlobalVar.listeSeiClinicalTrials) {
        const response = await axios.get(API_URL + "/SeiClinicalTrials");
        MyGlobalVar.listeSeiClinicalTrials = response.data;
    }
    return MyGlobalVar.listeSeiClinicalTrials;
}

export const addSeiClinicalTrial = async (data) => {
    return await axios.post(API_URL + "/SeiClinicalTrial/Create", data).then(response => {
        if (MyGlobalVar.listeSeiClinicalTrials) {
            response = MyGlobalVar.addResearcherDataToActivity(response)
            // using method push will use same reference of table,
            // so it will not trigger change state, therefore creating copy of the array
            // using concat method
            MyGlobalVar.listeSeiClinicalTrials = MyGlobalVar.listeSeiClinicalTrials.concat([response.data])
        }
        return response
    });
}

export const deleteSeiClinicalTrial = async (idActivity) => {
    return await axios.delete(API_URL + "/SeiClinicalTrial/Delete/" + idActivity).then(response => {
        // change to a new reference => cause change state immediately
        MyGlobalVar.listeSeiClinicalTrials = MyGlobalVar.deleteActivity(MyGlobalVar.listeSeiClinicalTrials, idActivity)
        return response
    });
}