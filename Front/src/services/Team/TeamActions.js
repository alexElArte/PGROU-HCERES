import axios from "axios";
import MyGlobalVar from "../MyGlobalVar";
import {API_URL} from "../../constants";

export const fetchListTeams = async () => {
    if (!MyGlobalVar.listeTeams) {
        const response = await axios.get(API_URL + "/Teams");
        MyGlobalVar.listeTeams = response.data;
        await MyGlobalVar.addTeamDataToTeams(MyGlobalVar.listeTeams)
    }
    return MyGlobalVar.listeTeams;
}

export const addTeam = async (data) => {
    const response = await axios.post(API_URL + "/Team/Create", data);
    if (MyGlobalVar.listeTeams) {
        // using method push will use same reference of table,
        // so it will not trigger change state, therefore creating copy of the array
        // using concat method
        MyGlobalVar.listeTeams = MyGlobalVar.listeTeams.concat([response.data])
        //await MyGlobalVar.addTeamDataToTeams(MyGlobalVar.listeTeams)
    }
    return response
}

export const updateTeam = async (idTeam, data) => {
    const response = await axios.put(`${API_URL}/Team/Update/${idTeam}`, data);
    if (MyGlobalVar.listeTeams) {
        // 1. Make a shallow copy of the items
        let items = [...MyGlobalVar.listeTeams];
        // 2. Make a shallow copy of the item you want to mutate
        let indexUpdated = MyGlobalVar.listeTeams.findIndex(r => r.teamId === response.data.teamId)
        // 3. Put it the new item into our array. N.B. we *are* mutating the array here,
        //    but that's why we made a copy first
        items[indexUpdated] = response.data;
        // 4. Update GlobalVar
        MyGlobalVar.listeTeams = items;
        await MyGlobalVar.addTeamDataToTeams(MyGlobalVar.listeTeams)
    }
    return response;
}

export const deleteTeam = async (idTeam) => {
    const response = await axios.delete(API_URL + "/Team/Delete/" + idTeam);
    if (MyGlobalVar.listeTeams) {
        let items = [...MyGlobalVar.listeTeams];
        let indexDeleted = MyGlobalVar.listeTeams.findIndex(r => r.teamId === idTeam)
        items.splice(indexDeleted, 1);
        MyGlobalVar.listeTeams = items
    }
    return response
}

// currently not caching activities to facilitate its update on changes
// otherwise create a global map as {teamId:[listActivities]}
export const fetchTeamMembers = async (idTeam) => {
    const response = await axios.get(API_URL + "/Team/" + idTeam + "/Members");
    return response.data
}

