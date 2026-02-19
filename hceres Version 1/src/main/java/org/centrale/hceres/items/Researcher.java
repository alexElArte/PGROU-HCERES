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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
//import org.centrale.tools.Utilities;
import com.fasterxml.jackson.annotation.JsonIgnore;
/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "researcher")
@Getter
@Setter
@AllArgsConstructor
public class Researcher implements Serializable {

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2048)
    @Column(name = "researcher_surname")
    private String researcherSurname;
    @Size(max = 2048)
    @Column(name = "researcher_name")
    private String researcherName;
    @Size(max = 2048)
    @Column(name = "researcher_email")
    private String researcherEmail;
    @Size(max = 2048)
    @Column(name = "researcher_orcid")
    private String researcherOrcid;
    @Size(max = 2048)
    @Column(name = "researcher_login")
    private String researcherLogin;
    @Size(max = 1024)
    @Column(name = "researcher_password")
    private String researcherPassword;

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "researcher_id")
    private Integer researcherId;
    

    public Researcher(Integer researcherId) {
        this.researcherId = researcherId;
    }
    public Researcher(){
        this.researcherId = 0;
    }

    @JsonIgnore
    @ManyToMany(mappedBy = "researcherList")
    private List<Nationality> nationalityList;
    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL, mappedBy = "researcherList")
    private List<Activity> activityList;
    @JsonIgnore
    @OneToMany(mappedBy = "researcherId")
    private List<Connection> connectionList;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "researcher")
    private List<Contract> contractList;

    // this is a dummy field just to return the last status of the researcher
    @Transient
    private String lastResearcherStatus;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "researcherId")
    private List<TeamReferent> teamReferentList;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "researcherId")
    private List<Supervisor> supervisorList;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "researcher")
    private Admin admin;

    
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "researcher")
    private List<BelongsTeam> belongsTeamList;

    public Researcher(Integer researcherId, String researcherSurname, String researcherName, String researcherEmail, String researcherOrcid, String researcherLogin, String researcherPassword, List<Nationality> nationalityList, List<Activity> activityList, List<Connection> connectionList, List<Contract> contractList, String lastResearcherStatus, List<TeamReferent> teamReferentList, List<Supervisor> supervisorList, List<PhdStudent> phdStudentList, Admin admin, List<BelongsTeam> belongsTeamList) {
        this.researcherId = researcherId;
        this.researcherSurname = researcherSurname;
        this.researcherName = researcherName;
        this.researcherEmail = researcherEmail;
        this.researcherOrcid = researcherOrcid;
        this.researcherLogin = researcherLogin;
        this.researcherPassword = researcherPassword;
        this.nationalityList = nationalityList;
        this.activityList = activityList;
        this.connectionList = connectionList;
        this.contractList = contractList;
        this.lastResearcherStatus = lastResearcherStatus;
        this.teamReferentList = teamReferentList;
        this.supervisorList = supervisorList;
        this.admin = admin;
        this.belongsTeamList = belongsTeamList;
    }

    
    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getResearcherId() {
        return researcherId;
    }

    public String getResearcherSurname() {
        return researcherSurname;
    }

    public String getResearcherName() {
        return researcherName;
    }

    public String getResearcherEmail() {
        return researcherEmail;
    }

    public String getResearcherOrcid() {
        return researcherOrcid;
    }

    public String getResearcherLogin() {
        return researcherLogin;
    }

    public String getResearcherPassword() {
        return researcherPassword;
    }

    public List<Nationality> getNationalityList() {
        return nationalityList;
    }

    public List<Activity> getActivityList() {
        return activityList;
    }

    public List<Connection> getConnectionList() {
        return connectionList;
    }

    public List<Contract> getContractList() {
        return contractList;
    }

    public String getLastResearcherStatus() {
        return lastResearcherStatus;
    }

    public List<TeamReferent> getTeamReferentList() {
        return teamReferentList;
    }

    public List<Supervisor> getSupervisorList() {
        return supervisorList;
    }


    public Admin getAdmin() {
        return admin;
    }

    public List<BelongsTeam> getBelongsTeamList() {
        return belongsTeamList;
    }

    public void setResearcherId(Integer researcherId) {
        this.researcherId = researcherId;
    }

    public void setResearcherSurname(String researcherSurname) {
        this.researcherSurname = researcherSurname;
    }

    public void setResearcherName(String researcherName) {
        this.researcherName = researcherName;
    }

    public void setResearcherEmail(String researcherEmail) {
        this.researcherEmail = researcherEmail;
    }

    public void setResearcherOrcid(String researcherOrcid) {
        this.researcherOrcid = researcherOrcid;
    }

    public void setResearcherLogin(String researcherLogin) {
        this.researcherLogin = researcherLogin;
    }

    public void setResearcherPassword(String researcherPassword) {
        this.researcherPassword = researcherPassword;
    }

    public void setNationalityList(List<Nationality> nationalityList) {
        this.nationalityList = nationalityList;
    }

    public void setActivityList(List<Activity> activityList) {
        this.activityList = activityList;
    }

    public void setConnectionList(List<Connection> connectionList) {
        this.connectionList = connectionList;
    }

    public void setContractList(List<Contract> contractList) {
        this.contractList = contractList;
    }

    public void setLastResearcherStatus(String lastResearcherStatus) {
        this.lastResearcherStatus = lastResearcherStatus;
    }

    public void setTeamReferentList(List<TeamReferent> teamReferentList) {
        this.teamReferentList = teamReferentList;
    }

    public void setSupervisorList(List<Supervisor> supervisorList) {
        this.supervisorList = supervisorList;
    }


    public void setAdmin(Admin admin) {
        this.admin = admin;
    }

    public void setBelongsTeamList(List<BelongsTeam> belongsTeamList) {
        this.belongsTeamList = belongsTeamList;
    }

    
}