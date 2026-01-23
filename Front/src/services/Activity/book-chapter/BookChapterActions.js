import axios from "axios";
import MyGlobalVar from "../../MyGlobalVar";
import { API_URL } from "../../../constants";

/**
 * Récupère la liste des livres (Book)
 */
export const fetchListBookChapter = async () => {
    if (!MyGlobalVar.listeBookChapter) {
        const response = await axios.get(API_URL + "/BookChapter");
        console.log("BookChapter fetched:", response.data);
        MyGlobalVar.listeBookChapter = response.data;
    }
    return MyGlobalVar.listeBookChapter;
};

/**
 * Ajoute un nouveau chapitre
 */
export const addBookChapter = async (data) => {
    return await axios.post(API_URL + "/BookChapter/Create", data).then(response => {
        if (MyGlobalVar.listeBookChapter) {
            response = MyGlobalVar.addResearcherDataToActivity(response);
            // utiliser concat pour déclencher la mise à jour de la référence
            MyGlobalVar.listeBookChapter = MyGlobalVar.listeBookChapter.concat([response.data]);
        }
        return response;
    });
};

/**
 * Supprime un chapitre
 */
export const deleteBookChapter = async (idActivity) => {
    return await axios.delete(API_URL + "/BookChapter/Delete/" + idActivity).then(response => {
        // nouvelle référence => déclenche le rafraîchissement immédiat
        MyGlobalVar.listeBookChapter = MyGlobalVar.deleteActivity(MyGlobalVar.listeBookChapter, idActivity);
        return response;
    });
};
