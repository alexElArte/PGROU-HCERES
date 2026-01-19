/* --------------------------------------------------------------------------------
 * Projet HCERES
 * 
 * Gestion de données pour l'HCERES
 * 
 * Ecole Centrale Nantes - laboratoire CRTI
 * Avril 2021
 * L LETERTRE, S LIMOUX, JY MARTIN
 * -------------------------------------------------------------------------------- */
package org.centrale.hceres.items;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "belongs_team")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BelongsTeam implements Serializable {

    private static final long serialVersionUID = 1L;

    public BelongsTeam(Integer researcherId, Integer teamId) {
        this.researcherId = researcherId;
        this.teamId = teamId;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_belongs_team")
    private Integer idBelongsTeam;

    @Column(name = "onboarding_date")
    @Temporal(TemporalType.DATE)
    private Date onboardingDate;

    @Column(name = "leaving_date")
    @Temporal(TemporalType.DATE)
    private Date leavingDate;

    @Column(name = "researcher_id")
    private Integer researcherId;

    @JsonIgnore
    @JoinColumn(name = "researcher_id", referencedColumnName = "researcher_id", insertable = false, updatable = false)
    @ManyToOne
    private Researcher researcher;

    @Column(name = "team_id")
    private Integer teamId;

    @JsonIgnore
    @JoinColumn(name = "team_id", referencedColumnName = "team_id", insertable = false, updatable = false)
    @ManyToOne
    private Team team;

    public BelongsTeam(Integer idBelongsTeam, Date onboardingDate, Date leavingDate, Integer researcherId, Researcher researcher, Integer teamId, Team team) {
        this.idBelongsTeam = idBelongsTeam;
        this.onboardingDate = onboardingDate;
        this.leavingDate = leavingDate;
        this.researcherId = researcherId;
        this.researcher = researcher;
        this.teamId = teamId;
        this.team = team;
    }

    public BelongsTeam() {
    }

    public Integer getIdBelongsTeam() {
        return idBelongsTeam;
    }

    public void setIdBelongsTeam(Integer idBelongsTeam) {
        this.idBelongsTeam = idBelongsTeam;
    }

    public Date getOnboardingDate() {
        return onboardingDate;
    }

    public void setOnboardingDate(Date onboardingDate) {
        this.onboardingDate = onboardingDate;
    }

    public Date getLeavingDate() {
        return leavingDate;
    }

    public void setLeavingDate(Date leavingDate) {
        this.leavingDate = leavingDate;
    }

    public Integer getResearcherId() {
        return researcherId;
    }

    public void setResearcherId(Integer researcherId) {
        this.researcherId = researcherId;
    }

    public Researcher getResearcher() {
        return researcher;
    }

    public void setResearcher(Researcher researcher) {
        this.researcher = researcher;
    }

    public Integer getTeamId() {
        return teamId;
    }

    public void setTeamId(Integer teamId) {
        this.teamId = teamId;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }
    
    
}