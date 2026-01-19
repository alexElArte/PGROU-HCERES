import axios from "axios";
import MyGlobalVar from "../../MyGlobalVar";
import {API_URL} from "../../../constants";

export const fetchListPublications = async () => {
    if (!MyGlobalVar.listePublications) {
        const response = await axios.get(API_URL + "/Publications");
        MyGlobalVar.listePublications = response.data;
    }
    return MyGlobalVar.listePublications;
}

export const addPublication = async (data) => {
    return await axios.post(API_URL + "/Publication/Create", data).then(response => {
        if (MyGlobalVar.listePublications) {
            response = MyGlobalVar.addResearcherDataToActivity(response)
            // using method push will use same reference of table,
            // so it will not trigger change state, therefore creating copy of the array
            // using concat method
            MyGlobalVar.listePublications = MyGlobalVar.listePublications.concat([response.data])
        }
        return response
    });
}

export const deletePublication = async (idActivity) => {
    return await axios.delete(API_URL + "/Publication/Delete/" + idActivity).then(response => {
        // change to a new reference => cause change state immediately
        MyGlobalVar.listePublications = MyGlobalVar.deleteActivity(MyGlobalVar.listePublications, idActivity)
        return response
    });
}