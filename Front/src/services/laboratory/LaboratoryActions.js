import axios from "axios";
import MyGlobalVar from "../MyGlobalVar";
import {API_URL} from "../../constants";

export const fetchListLaboratories = async () => {
    if (!MyGlobalVar.listeLaboratories) {
        const response = await axios.get(API_URL + "/Laboratories");
        MyGlobalVar.listeLaboratories = response.data;
    }
    return MyGlobalVar.listeLaboratories;
}

export const addLaboratory = async (data) => {
    return await axios.post(API_URL + "/Laboratory/Create", data).then(response => {
        if (MyGlobalVar.listeLaboratories) {
            response = MyGlobalVar.addResearcherDataToActivity(response)
            // using method push will use same reference of table,
            // so it will not trigger change state, therefore creating copy of the array
            // using concat method
            MyGlobalVar.listeLaboratories = MyGlobalVar.listeLaboratories.concat([response.data])
        }
        return response
    });
}

export const deleteLaboratory = async (idLaboratory) => {
    return await axios.delete(API_URL + "/Laboratory/Delete/" + idLaboratory).then(response => {
        // change to a new reference => cause change state immediately
        MyGlobalVar.listeLaboratories = MyGlobalVar.deleteActivity(MyGlobalVar.listeLaboratories, idLaboratory)
        return response
    });
}