import axios from "axios";
import MyGlobalVar from "../../MyGlobalVar";
import {API_URL} from "../../../constants";

export const fetchListEditorialActivities = async () => {
    if (!MyGlobalVar.listeEditorialActivities) {
        const response = await axios.get(API_URL + "/EditorialActivities");
        MyGlobalVar.listeEditorialActivities = response.data;
    }
    return MyGlobalVar.listeEditorialActivities;
}

export const addEditorialActivity = async (data) => {
    return await axios.post(API_URL + "/EditorialActivity/Create", data).then(response => {
        if (MyGlobalVar.listeEditorialActivities) {
            response = MyGlobalVar.addResearcherDataToActivity(response)
            // using method push will use same reference of table,
            // so it will not trigger change state, therefore creating copy of the array
            // using concat method
            MyGlobalVar.listeEditorialActivities = MyGlobalVar.listeEditorialActivities.concat([response.data])
        }
        return response
    });
}

export const deleteEditorialActivity = async (idActivity) => {
    return await axios.delete(API_URL + "/EditorialActivity/Delete/" + idActivity).then(response => {
        // change to a new reference => cause change state immediately
        MyGlobalVar.listeEditorialActivities = MyGlobalVar.deleteActivity(MyGlobalVar.listeEditorialActivities, idActivity)
        return response
    });
}