import axios from "axios";
import MyGlobalVar from "../MyGlobalVar";
import {API_URL} from "../../constants";

export const fetchListResearchers = async () => {
    if (!MyGlobalVar.listeChercheurs) {
        const response = await axios.get(API_URL + "/Researchers");
        MyGlobalVar.listeChercheurs = response.data;
        await MyGlobalVar.addTeamDataToResearchers(MyGlobalVar.listeChercheurs)
    }
    return MyGlobalVar.listeChercheurs;
}

export const addResearcher = async (data) => {
    const response = await axios.post(API_URL + "/Researcher/Create", data);
    if (MyGlobalVar.listeChercheurs) {
        // using method push will use same reference of table,
        // so it will not trigger change state, therefore creating copy of the array
        // using concat method
        MyGlobalVar.listeChercheurs = MyGlobalVar.listeChercheurs.concat([response.data])
        //await MyGlobalVar.addTeamDataToResearchers(MyGlobalVar.listeChercheurs)
    }
    return response
}

export const updateResearcher = async (idResearcher, data) => {
    const response = await axios.put(`${API_URL}/Researcher/Update/${idResearcher}`, data);
    if (MyGlobalVar.listeChercheurs) {
        // 1. Make a shallow copy of the items
        let items = [...MyGlobalVar.listeChercheurs];
        // 2. Make a shallow copy of the item you want to mutate
        let indexUpdated = MyGlobalVar.listeChercheurs.findIndex(r => r.researcherId === response.data.researcherId)
        // 3. Put it the new item into our array. N.B. we *are* mutating the array here,
        //    but that's why we made a copy first
        items[indexUpdated] = response.data;
        // 4. Update GlobalVar
        MyGlobalVar.listeChercheurs = items;
        await MyGlobalVar.addTeamDataToResearchers(MyGlobalVar.listeChercheurs)
    }
    return response;
}

export const deleteResearcher = async (idResearcher) => {
    const response = await axios.delete(API_URL + "/Researcher/Delete/" + idResearcher);
    if (MyGlobalVar.listeChercheurs) {
        let items = [...MyGlobalVar.listeChercheurs];
        let indexDeleted = MyGlobalVar.listeChercheurs.findIndex(r => r.researcherId === idResearcher)
        items.splice(indexDeleted, 1);
        MyGlobalVar.listeChercheurs = items
    }
    return response
}

// currently not caching activities to facilitate its update on changes
// otherwise create a global map as {researcherId:[listActivities]}
export const fetchResearcherActivities = async (researcherId) => {
    const response = await axios.get(API_URL + "/Researcher/" + researcherId + "/Activities");
    return response.data
}

