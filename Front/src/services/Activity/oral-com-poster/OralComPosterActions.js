import axios from "axios";
import MyGlobalVar from "../../MyGlobalVar";
import {API_URL} from "../../../constants";

export const fetchListOralComPosters = async () => {
    if (!MyGlobalVar.listeOralComPosters) {
        const response = await axios.get(API_URL + "/OralComPosters");
        MyGlobalVar.listeOralComPosters = response.data;
    }
    return MyGlobalVar.listeOralComPosters;
}

export const addOralComPoster = async (data) => {
    return await axios.post(API_URL + "/OralComPoster/Create", data).then(response => {
        if (MyGlobalVar.listeOralComPosters) {
            response = MyGlobalVar.addResearcherDataToActivity(response)
            // using method push will use same reference of table,
            // so it will not trigger change state, therefore creating copy of the array
            // using concat method
            MyGlobalVar.listeOralComPosters = MyGlobalVar.listeOralComPosters.concat([response.data])
        }
        return response
    });
}

export const deleteOralComPoster = async (idActivity) => {
    return await axios.delete(API_URL + "/OralComPoster/Delete/" + idActivity).then(response => {
        // change to a new reference => cause change state immediately
        MyGlobalVar.listeOralComPosters = MyGlobalVar.deleteActivity(MyGlobalVar.listeOralComPosters, idActivity)
        return response
    });
}