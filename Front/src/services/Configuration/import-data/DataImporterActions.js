import axios from "axios";
import {API_URL} from "../../../constants";


export const insertCsvDataIntoDatabase = async (data) => {
    return await axios.post(API_URL + "/DataImporter/Import/CsvResults", data).then(response => {
        return response
    });
}