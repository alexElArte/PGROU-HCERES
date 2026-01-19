import axios from "axios";
import MyGlobalVar from "../../MyGlobalVar";
import {API_URL} from "../../../constants";

export const fetchListTrainingTheses = async () => {
    if (!MyGlobalVar.listeTrainingTheses) {
        const response = await axios.get(API_URL + "/TrainingTheses");
        MyGlobalVar.listeTrainingTheses = response.data;
    }
    return MyGlobalVar.listeTrainingTheses;
}

export const addTrainingThesis = async (data) => {
    return await axios.post(API_URL + "/TrainingThesis/Create", data).then(response => {
        if (MyGlobalVar.listeTrainingTheses) {
            response = MyGlobalVar.addResearcherDataToActivity(response)
            // using method push will use same reference of table,
            // so it will not trigger change state, therefore creating copy of the array
            // using concat method
            MyGlobalVar.listeTrainingTheses = MyGlobalVar.listeTrainingTheses.concat([response.data])
        }
        return response
    });
}

export const deleteTrainingThesis = async (idActivity) => {
    return await axios.delete(API_URL + "/TrainingThesis/Delete/" + idActivity).then(response => {
        // change to a new reference => cause change state immediately
        MyGlobalVar.listeTrainingTheses = MyGlobalVar.deleteActivity(MyGlobalVar.listeTrainingTheses, idActivity)
        return response
    });
}