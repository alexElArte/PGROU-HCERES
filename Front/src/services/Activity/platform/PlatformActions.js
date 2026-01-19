import axios from "axios";
import MyGlobalVar from "../../MyGlobalVar";
import {API_URL} from "../../../constants";

export const fetchListPlatforms = async () => {
    if (!MyGlobalVar.listePlatforms) {
        const response = await axios.get(API_URL + "/Platforms");
        MyGlobalVar.listePlatforms = response.data;
    }
    return MyGlobalVar.listePlatforms;
}

export const addPlatform = async (data) => {
    return await axios.post(API_URL + "/Platform/Create", data).then(response => {
        if (MyGlobalVar.listePlatforms) {
            response = MyGlobalVar.addResearcherDataToActivity(response)
            // using method push will use same reference of table,
            // so it will not trigger change state, therefore creating copy of the array
            // using concat method
            MyGlobalVar.listePlatforms = MyGlobalVar.listePlatforms.concat([response.data])
        }
        return response
    });
}

export const deletePlatform = async (idActivity) => {
    return await axios.delete(API_URL + "/Platform/Delete/" + idActivity).then(response => {
        // change to a new reference => cause change state immediately
        MyGlobalVar.listePlatforms = MyGlobalVar.deleteActivity(MyGlobalVar.listePlatforms, idActivity)
        return response
    });
}