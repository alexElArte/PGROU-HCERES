import axios from "axios";
import MyGlobalVar from "../../MyGlobalVar";
import {API_URL} from "../../../constants";

export const fetchListIndustrialContracts = async () => {
    if (!MyGlobalVar.listeIndustrialContracts) {
        const response = await axios.get(API_URL + '/IndustrialContracts');
        MyGlobalVar.listeIndustrialContracts = response.data;
    }
    return MyGlobalVar.listeIndustrialContracts;
}

export const addIndustrialContract = async (data) => {
    return await axios.post(API_URL + "/IndustrialContract/Create", data).then(response => {
        if (MyGlobalVar.listeIndustrialContracts) {
            response = MyGlobalVar.addResearcherDataToActivity(response)
            // using method push will use same reference of table,
            // so it will not trigger change state, therefore creating copy of the array
            // using concat method
            MyGlobalVar.listeIndustrialContracts = MyGlobalVar.listeIndustrialContracts.concat([response.data])
        }
        return response
    });
}

export const deleteIndustrialContract = async (idActivity) => {
    return await axios.delete(API_URL + "/IndustrialContract/Delete/" + idActivity).then(response => {
        // change to a new reference => cause change state immediately
        MyGlobalVar.listeIndustrialContracts = MyGlobalVar.deleteActivity(MyGlobalVar.listeIndustrialContracts, idActivity)
        return response
    });
}