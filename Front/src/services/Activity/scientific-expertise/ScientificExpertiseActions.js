import axios from "axios";
import MyGlobalVar from "../../MyGlobalVar";
import {API_URL} from "../../../constants";

export const fetchListScientificExpertises = async () => {
    if (!MyGlobalVar.listeScientificExpertises) {
        const response = await axios.get(API_URL + "/ScientificExpertises");
        MyGlobalVar.listeScientificExpertises = response.data;
    }
    return MyGlobalVar.listeScientificExpertises;
}

export const addScientificExpertise = async (data) => {
    return await axios.post(API_URL + "/ScientificExpertise/Create", data).then(response => {
        if (MyGlobalVar.listeScientificExpertises) {
            response = MyGlobalVar.addResearcherDataToActivity(response)
            // using method push will use same reference of table,
            // so it will not trigger change state, therefore creating copy of the array
            // using concat method
            MyGlobalVar.listeScientificExpertises = MyGlobalVar.listeScientificExpertises.concat([response.data])
        }
        return response
    });
}

export const deleteScientificExpertise = async (idActivity) => {
    return await axios.delete(API_URL + "/ScientificExpertise/Delete/" + idActivity).then(response => {
        // change to a new reference => cause change state immediately
        MyGlobalVar.listeScientificExpertises = MyGlobalVar.deleteActivity(MyGlobalVar.listeScientificExpertises, idActivity)
        return response
    });
}