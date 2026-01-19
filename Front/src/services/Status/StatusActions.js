import axios from "axios";
import MyGlobalVar from "../MyGlobalVar";
import {API_URL} from "../../constants";

export const fetchListStatus = async () => {
    if (!MyGlobalVar.listeStatutes) {
        const response = await axios.get(API_URL + "/Statutes");
        MyGlobalVar.listeStatutes = response.data;
    }
    return MyGlobalVar.listeStatutes;
}