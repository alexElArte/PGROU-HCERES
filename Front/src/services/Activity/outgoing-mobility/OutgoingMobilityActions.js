import axios from "axios";
import MyGlobalVar from "../../MyGlobalVar";
import {API_URL} from "../../../constants";

export const fetchListOutgoingMobilities = async () => {
    if (!MyGlobalVar.listeOutgoingMobilities) {
        const response = await axios.get(API_URL + "/OutgoingMobilities");
        MyGlobalVar.listeOutgoingMobilities = response.data;
    }
    return MyGlobalVar.listeOutgoingMobilities;
}

export const addOutgoingMobility = async (data) => {
    return await axios.post(API_URL + "/OutgoingMobility/Create", data).then(response => {
        if (MyGlobalVar.listeOutgoingMobilities) {
            response = MyGlobalVar.addResearcherDataToActivity(response)
            // using method push will use same reference of table,
            // so it will not trigger change state, therefore creating copy of the array
            // using concat method
            MyGlobalVar.listeOutgoingMobilities = MyGlobalVar.listeOutgoingMobilities.concat([response.data])
        }
        return response
    });
}

export const deleteOutgoingMobility = async (idActivity) => {
    return await axios.delete(API_URL + "/OutgoingMobility/Delete/" + idActivity).then(response => {
        // change to a new reference => cause change state immediately
        MyGlobalVar.listeOutgoingMobilities = MyGlobalVar.deleteActivity(MyGlobalVar.listeOutgoingMobilities, idActivity)
        return response
    });
}