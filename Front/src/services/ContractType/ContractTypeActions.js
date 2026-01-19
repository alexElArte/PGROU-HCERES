import MyGlobalVar from "../MyGlobalVar";
import axios from "axios";
import {API_URL} from "../../constants";

export const fetchListContractTypes = async () => {
    if (!MyGlobalVar.listeContractTypes) {
        const response = await axios.get(API_URL + "/ContractTypes");
        MyGlobalVar.listeContractTypes = response.data;
    }
    return MyGlobalVar.listeContractTypes;
}