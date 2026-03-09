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
import lombok.Setter;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "nationality")
@Getter
@Setter
@AllArgsConstructor
public class Nationality implements Serializable {

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 128)
    @Column(name = "nationality_name")
    private String nationalityName;
    @OneToMany(mappedBy = "nationalityId")
    @JsonIgnore
    private Collection<PhdStudent> phdStudentCollection;

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "nationality_id")
    private Integer nationalityId;

    @JsonIgnore
    @JoinTable(name = "researcher_nationality", joinColumns = {
        @JoinColumn(name = "nationality_id", referencedColumnName = "nationality_id")}, inverseJoinColumns = {
        @JoinColumn(name = "researcher_id", referencedColumnName = "researcher_id")})
    @ManyToMany
    private List<Researcher> researcherList;

    public Integer getNationalityId() {
        return nationalityId;
    }

    public void setNationalityId(Integer nationalityId) {
        this.nationalityId = nationalityId;
    }

    public String getNationalityName() {
        return nationalityName;
    }

    public void setNationalityName(String nationalityName) {
        this.nationalityName = nationalityName;
    }

    public List<Researcher> getResearcherList() {
        return researcherList;
    }

    public void setResearcherList(List<Researcher> researcherList) {
        this.researcherList = researcherList;
    }

    public Nationality() {
    }



    @XmlTransient
    public Collection<PhdStudent> getPhdStudentCollection() {
        return phdStudentCollection;
    }

    public void setPhdStudentCollection(Collection<PhdStudent> phdStudentCollection) {
        this.phdStudentCollection = phdStudentCollection;
    }

    
}