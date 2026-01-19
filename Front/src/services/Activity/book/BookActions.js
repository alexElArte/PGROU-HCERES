import axios from "axios";
import MyGlobalVar from "../../MyGlobalVar";
import { API_URL } from "../../../constants";

/**
 * Récupère la liste des livres (Book)
 */
export const fetchListBooks = async () => {
    if (!MyGlobalVar.listeBooks) {
        const response = await axios.get(API_URL + "/Books");
        MyGlobalVar.listeBooks = response.data;
    }
    return MyGlobalVar.listeBooks;
};

/**
 * Ajoute un nouveau livre
 */
export const addBook = async (data) => {
    return await axios.post(API_URL + "/Book/Create", data).then(response => {
        if (MyGlobalVar.listeBooks) {
            response = MyGlobalVar.addResearcherDataToActivity(response);
            // utiliser concat pour déclencher la mise à jour de la référence
            MyGlobalVar.listeBooks = MyGlobalVar.listeBooks.concat([response.data]);
        }
        return response;
    });
};

/**
 * Supprime un livre
 */
export const deleteBook = async (idActivity) => {
    return await axios.delete(API_URL + "/Book/Delete/" + idActivity).then(response => {
        // nouvelle référence => déclenche le rafraîchissement immédiat
        MyGlobalVar.listeBooks = MyGlobalVar.deleteActivity(MyGlobalVar.listeBooks, idActivity);
        return response;
    });
};
