import axios from "axios";
import {API_URL} from "../../constants";

export const purgeDatabase = async () => {
    return await axios.get(API_URL + "/DataPurger/PurgeAll").then(response => {
        return response
    });
}