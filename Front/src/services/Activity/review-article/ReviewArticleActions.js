import axios from "axios";
import MyGlobalVar from "../../MyGlobalVar";
import {API_URL} from "../../../constants";

export const fetchListReviewArticles = async () => {
    if (!MyGlobalVar.listeReviewArticle) {
        const response = await axios.get(API_URL + "/ReviewArticles");
        MyGlobalVar.listeReviewArticle = response.data;
    }
    return MyGlobalVar.listeReviewArticle;
}

export const addReviewArticle = async (data) => {
        return await axios.post(API_URL + "/ReviewArticle/Create", data).then(response => {
        if (MyGlobalVar.listeReviewArticle) {
            response = MyGlobalVar.addResearcherDataToActivity(response)
            // using method push will use same reference of table,
            // so it will not trigger change state, therefore creating copy of the array
            // using concat method
            MyGlobalVar.listeReviewArticle = MyGlobalVar.listeReviewArticle.concat([response.data])
        }
        return response
    });
}

export const deleteReviewArticle = async (idActivity) => {
    return await axios.delete(API_URL + "/ReviewArticle/Delete/" + idActivity).then(response => {
        // change to a new reference => cause change state immediately
        MyGlobalVar.listeReviewArticle = MyGlobalVar.deleteActivity(MyGlobalVar.listeReviewArticle, idActivity)
        return response
    });
}