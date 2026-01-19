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
import lombok.NoArgsConstructor;
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
@Table(name = "education_involvement")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EducationInvolvement implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "education_involvement_id")
    private Integer educationInvolvementId;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 256)
    @Column(name = "education_involvement_name")
    private String educationInvolvementName;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "educationInvolvementId")
    private List<Education> educationList;

    public Integer getEducationInvolvementId() {
        return educationInvolvementId;
    }

    public void setEducationInvolvementId(Integer educationInvolvementId) {
        this.educationInvolvementId = educationInvolvementId;
    }

    public String getEducationInvolvementName() {
        return educationInvolvementName;
    }

    public void setEducationInvolvementName(String educationInvolvementName) {
        this.educationInvolvementName = educationInvolvementName;
    }

    public List<Education> getEducationList() {
        return educationList;
    }

    public void setEducationList(List<Education> educationList) {
        this.educationList = educationList;
    }
    
}