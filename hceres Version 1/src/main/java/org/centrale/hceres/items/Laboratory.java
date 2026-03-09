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
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "laboratory")
@Getter
@Setter
public class Laboratory implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "laboratory_id")
    private Integer laboratoryId;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 256)
    @Column(name = "laboratory_name")
    private String laboratoryName;
    @Size(max = 32)
    @Column(name = "laboratory_acronym")
    private String laboratoryAcronym;

    @Column(name = "institution_id")
    private Integer institutionId;

    @JoinColumn(name = "institution_id", referencedColumnName = "institution_id",  insertable = false, updatable = false)
    @ManyToOne
    private Institution institution;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "laboratory")
    private List<Team> teamList;

    public Laboratory() {
    }

    public Laboratory(Integer laboratoryId, String laboratoryName, String laboratoryAcronym, Integer institutionId, Institution institution, List<Team> teamList) {
        this.laboratoryId = laboratoryId;
        this.laboratoryName = laboratoryName;
        this.laboratoryAcronym = laboratoryAcronym;
        this.institutionId = institutionId;
        this.institution = institution;
        this.teamList = teamList;
    }

    public Integer getLaboratoryId() {
        return laboratoryId;
    }

    public void setLaboratoryId(Integer laboratoryId) {
        this.laboratoryId = laboratoryId;
    }

    public String getLaboratoryName() {
        return laboratoryName;
    }

    public void setLaboratoryName(String laboratoryName) {
        this.laboratoryName = laboratoryName;
    }

    public String getLaboratoryAcronym() {
        return laboratoryAcronym;
    }

    public void setLaboratoryAcronym(String laboratoryAcronym) {
        this.laboratoryAcronym = laboratoryAcronym;
    }

    public Integer getInstitutionId() {
        return institutionId;
    }

    public void setInstitutionId(Integer institutionId) {
        this.institutionId = institutionId;
    }

    public Institution getInstitution() {
        return institution;
    }

    public void setInstitution(Institution institution) {
        this.institution = institution;
    }

    public List<Team> getTeamList() {
        return teamList;
    }

    public void setTeamList(List<Team> teamList) {
        this.teamList = teamList;
    }
    
}