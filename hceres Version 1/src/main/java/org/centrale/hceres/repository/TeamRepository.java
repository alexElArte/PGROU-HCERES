package org.centrale.hceres.repository;

import java.util.List;
import org.centrale.hceres.items.Laboratory;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TeamRepository extends JpaRepository<Team, Integer> {

    // Version 1 : via l'entité de liaison BelongsTeam
    @Query("SELECT bt.researcher FROM BelongsTeam bt WHERE bt.team.teamId = :teamId")
    List<Researcher> findResearchersByTeamId(@Param("teamId") Integer teamId);
}