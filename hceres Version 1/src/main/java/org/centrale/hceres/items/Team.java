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
import java.util.List;
import java.util.Date;
import javax.persistence.*;
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "team")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Team implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "team_id")
    private Integer teamId;

    public Team(Integer teamId) {
        this.teamId = teamId;
    }
    public Team(){
    }

    @Size(max = 256)
    @Column(name = "team_name")
    private String teamName;
    @Column(name = "team_creation")
    @Temporal(TemporalType.DATE)
    private Date teamCreation;
    @Column(name = "team_end")
    @Temporal(TemporalType.DATE)
    private Date teamEnd;
    @Column(name = "team_last_report")
    @Temporal(TemporalType.DATE)
    private Date teamLastReport;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "teamId")
    private List<TeamReferent> teamReferentList;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "team")
    private List<PublicationStatistics> publicationStatisticsList;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "team")
    private List<BelongsTeam> belongsTeamList;

    @Column(name = "laboratory_id")
    private Integer laboratoryId;

    @JoinColumn(name = "laboratory_id", referencedColumnName = "laboratory_id", insertable = false, updatable = false)
    @ManyToOne
    private Laboratory laboratory;

    public Team(Integer teamId, String teamName, Date teamCreation, Date teamEnd, Date teamLastReport, List<TeamReferent> teamReferentList, List<PublicationStatistics> publicationStatisticsList, List<BelongsTeam> belongsTeamList, Integer laboratoryId, Laboratory laboratory) {
        this.teamId = teamId;
        this.teamName = teamName;
        this.teamCreation = teamCreation;
        this.teamEnd = teamEnd;
        this.teamLastReport = teamLastReport;
        this.teamReferentList = teamReferentList;
        this.publicationStatisticsList = publicationStatisticsList;
        this.belongsTeamList = belongsTeamList;
        this.laboratoryId = laboratoryId;
        this.laboratory = laboratory;
    }

    public Integer getTeamId() {
        return teamId;
    }

    public void setTeamId(Integer teamId) {
        this.teamId = teamId;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public Date getTeamCreation() {
        return teamCreation;
    }

    public void setTeamCreation(Date teamCreation) {
        this.teamCreation = teamCreation;
    }

    public Date getTeamEnd() {
        return teamEnd;
    }

    public void setTeamEnd(Date teamEnd) {
        this.teamEnd = teamEnd;
    }

    public Date getTeamLastReport() {
        return teamLastReport;
    }

    public void setTeamLastReport(Date teamLastReport) {
        this.teamLastReport = teamLastReport;
    }

    public List<TeamReferent> getTeamReferentList() {
        return teamReferentList;
    }

    public void setTeamReferentList(List<TeamReferent> teamReferentList) {
        this.teamReferentList = teamReferentList;
    }

    public List<PublicationStatistics> getPublicationStatisticsList() {
        return publicationStatisticsList;
    }

    public void setPublicationStatisticsList(List<PublicationStatistics> publicationStatisticsList) {
        this.publicationStatisticsList = publicationStatisticsList;
    }

    public List<BelongsTeam> getBelongsTeamList() {
        return belongsTeamList;
    }

    public void setBelongsTeamList(List<BelongsTeam> belongsTeamList) {
        this.belongsTeamList = belongsTeamList;
    }

    public Integer getLaboratoryId() {
        return laboratoryId;
    }

    public void setLaboratoryId(Integer laboratoryId) {
        this.laboratoryId = laboratoryId;
    }

    public Laboratory getLaboratory() {
        return laboratory;
    }

    public void setLaboratory(Laboratory laboratory) {
        this.laboratory = laboratory;
    }
    
    
}