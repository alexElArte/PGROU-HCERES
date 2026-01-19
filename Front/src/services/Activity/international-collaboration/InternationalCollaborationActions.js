import axios from "axios";
import MyGlobalVar from "../../MyGlobalVar";
import {API_URL} from "../../../constants";

export const fetchListInternationalCollaborations = async () => {
    if (!MyGlobalVar.listeInternationalCollaborations) {
        const response = await axios.get(API_URL + "/InternationalCollaborations");
        MyGlobalVar.listeInternationalCollaborations = response.data;
    }
    return MyGlobalVar.listeInternationalCollaborations;
}

export const addInternationalCollaboration = async (data) => {
    return await axios.post(API_URL + "/InternationalCollaboration/Create", data).then(response => {
        if (MyGlobalVar.listeInternationalCollaborations) {
            response = MyGlobalVar.addResearcherDataToActivity(response)
            // using method push will use same reference of table,
            // so it will not trigger change state, therefore creating copy of the array
            // using concat method
            MyGlobalVar.listeInternationalCollaborations = MyGlobalVar.listeInternationalCollaborations.concat([response.data])
        }
        return response
    });
}

export const deleteInternationalCollaboration = async (idActivity) => {
    return await axios.delete(API_URL + "/InternationalCollaboration/Delete/" + idActivity).then(response => {
        // change to a new reference => cause change state immediately
        MyGlobalVar.listeInternationalCollaborations = MyGlobalVar.deleteActivity(MyGlobalVar.listeInternationalCollaborations, idActivity)
        return response
    });
}