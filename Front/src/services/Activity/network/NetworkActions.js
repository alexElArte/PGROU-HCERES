import axios from "axios";
import MyGlobalVar from "../../MyGlobalVar";
import { API_URL } from "../../../constants";

/**
 * Récupère la liste des networks (Network)
 */
export const fetchListNetworks = async () => {
    if (!MyGlobalVar.listeNetworks) {
        const response = await axios.get(API_URL + "/Networks");
        MyGlobalVar.listeNetworks = response.data;
    }
    return MyGlobalVar.listeNetworks;
};

/**
 * Ajoute un nouveau network
 */
export const addNetwork = async (data) => {
    return await axios.post(API_URL + "/Network/Create", data).then(response => {
        if (MyGlobalVar.listeNetworks) {
            response = MyGlobalVar.addResearcherDataToActivity(response);
            // utiliser concat pour déclencher la mise à jour de la référence
            MyGlobalVar.listeNetworks = MyGlobalVar.listeNetworks.concat([response.data]);
        }
        return response;
    });
};

/**
 * Supprime un network
 */
export const deleteNetwork = async (idActivity) => {
    return await axios.delete(API_URL + "/Network/Delete/" + idActivity).then(response => {
        // nouvelle référence => déclenche le rafraîchissement immédiat
        MyGlobalVar.listeNetworks = MyGlobalVar.deleteActivity(MyGlobalVar.listeNetworks, idActivity);
        return response;
    });
};
