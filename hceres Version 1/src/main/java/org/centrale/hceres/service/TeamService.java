package org.centrale.hceres.service;

import java.util.*;

import org.centrale.hceres.items.Team;
import org.centrale.hceres.repository.TeamRepository;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.Data;
import org.centrale.hceres.items.Researcher;

// permet de traiter la requete HTTP puis l'associer a la fonction de repository qui va donner une reponse
@Data
@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepo;

    public List<Team> getTeams() {
        return teamRepo.findAll();
    }
    /**
     * supprimer l'elmt selon son id
     *
     * @param id : id de l'elmt
     */
    public void deleteTeam(final Integer id) {
        teamRepo.deleteById(id);
    }

    /**
     * permet d'ajouter un elmt
     *
     * @return : l'elemt ajouter a la base de donnees
     */
    public Team saveTeam(@RequestBody Map<String, Object> request) throws RequestParseException {

        Team team = new Team();
        team.setTeamName(RequestParser.getAsString(request.get("teamName")));
        team.setTeamCreation(RequestParser.getAsDate(request.get("teamCreationDate")));
        team.setTeamEnd(RequestParser.getAsDate(request.get("teamEndDate")));
        team.setLaboratoryId(RequestParser.getAsInteger(request.get("teamLaboratoryId")));
        teamRepo.save(team);
        return team;
    }
    
    public List<Researcher> getTeamMembers(final Integer id){
        return teamRepo.findResearchersByTeamId(id);
    }
    
    public Team updateTeam(Integer teamId, Map<String, Object> request) throws RequestParseException {
    Optional<Team> t = teamRepo.findById(teamId);

    if (t.isPresent()) {
        Team currentTeam = t.get();

        fillTeamFromRequest(currentTeam, request);

        teamRepo.save(currentTeam);
        return currentTeam;
    } else {
        throw new RequestParseException("Team with id " + teamId + " not found");
    }
}

private void fillTeamFromRequest(Team team, Map<String, Object> request) throws RequestParseException {
    // même logique que saveTeam(), mais en "update"

    if (request.containsKey("teamName")) {
        team.setTeamName(RequestParser.getAsString(request.get("teamName")));
    }

    if (request.containsKey("teamCreationDate")) {
        // ⚠️ chez toi c'est setTeamCreation(...) dans saveTeam()
        team.setTeamCreation(RequestParser.getAsDate(request.get("teamCreationDate")));
    }

    if (request.containsKey("teamEndDate")) {
        // ⚠️ chez toi c'est setTeamEnd(...) dans saveTeam()
        team.setTeamEnd(RequestParser.getAsDate(request.get("teamEndDate")));
    }

    if (request.containsKey("teamLaboratoryId")) {
        // ⚠️ chez toi c'est setLaboratoryId(...)
        team.setLaboratoryId(RequestParser.getAsInteger(request.get("teamLaboratoryId")));
    }
}



}
