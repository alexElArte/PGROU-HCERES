import axios from "axios";
import MyGlobalVar from "../../MyGlobalVar";
import {API_URL} from "../../../constants";

export const fetchListEducations = async () => {
    if (!MyGlobalVar.listeEducations) {
        const response = await axios.get(API_URL + "/Educations");
        MyGlobalVar.listeEducations = response.data;
    }
    return MyGlobalVar.listeEducations;
}

export const addEducation = async (data) => {
    return await axios.post(API_URL + "/Education/Create", data).then(response => {
        if (MyGlobalVar.listeEducations) {
            response = MyGlobalVar.addResearcherDataToActivity(response)
            // using method push will use same reference of table,
            // so it will not trigger change state, therefore creating copy of the array
            // using concat method
            MyGlobalVar.listeEducations = MyGlobalVar.listeEducations.concat([response.data])
        }
        return response
    });
}

export const deleteEducation = async (idActivity) => {
    return await axios.delete(API_URL + "/Education/Delete/" + idActivity).then(response => {
        // change to a new reference => cause change state immediately
        MyGlobalVar.listeEducations = MyGlobalVar.deleteActivity(MyGlobalVar.listeEducations, idActivity)
        return response
    });
}