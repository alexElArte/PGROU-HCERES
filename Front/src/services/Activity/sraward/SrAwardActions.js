import axios from "axios";
import MyGlobalVar from "../../MyGlobalVar";
import {API_URL} from "../../../constants";

export const fetchListSrAwards = async () => {
    if (!MyGlobalVar.listeSrAwards) {
        const response = await axios.get(API_URL + "/SrAwards");
        MyGlobalVar.listeSrAwards = response.data;
    }
    return MyGlobalVar.listeSrAwards;
}

export const addSrAward = async (data) => {
    return await axios.post(API_URL + "/SrAward/Create", data).then(response => {
        if (MyGlobalVar.listeSrAwards) {
            response = MyGlobalVar.addResearcherDataToActivity(response)
            // using method push will use same reference of table,
            // so it will not trigger change state, therefore creating copy of the array
            // using concat method
            MyGlobalVar.listeSrAwards = MyGlobalVar.listeSrAwards.concat([response.data])
        }
        return response
    });
}

export const deleteSrAward = async (idActivity) => {
    return await axios.delete(API_URL + "/SrAward/Delete/" + idActivity).then(response => {
        // change to a new reference => cause change state immediately
        MyGlobalVar.listeSrAwards = MyGlobalVar.deleteActivity(MyGlobalVar.listeSrAwards, idActivity)
        return response
    });
}