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
import javax.persistence.*;
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "learned_scientific_society_role")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LearnedScientificSocietyRole implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "learned_scientific_society_role_id")
    private Integer learnedScientificSocietyRoleId;
    @Size(max = 256)
    @Column(name = "name_choice")
    private String nameChoice;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "learnedScientificSocietyRole")
    private List<LearnedScientificSociety> learnedScientificSocietyList;

    public Integer getLearnedScientificSocietyRoleId() {
        return learnedScientificSocietyRoleId;
    }

    public void setLearnedScientificSocietyRoleId(Integer learnedScientificSocietyRoleId) {
        this.learnedScientificSocietyRoleId = learnedScientificSocietyRoleId;
    }

    public String getNameChoice() {
        return nameChoice;
    }

    public void setNameChoice(String nameChoice) {
        this.nameChoice = nameChoice;
    }

    public List<LearnedScientificSociety> getLearnedScientificSocietyList() {
        return learnedScientificSocietyList;
    }

    public void setLearnedScientificSocietyList(List<LearnedScientificSociety> learnedScientificSocietyList) {
        this.learnedScientificSocietyList = learnedScientificSocietyList;
    }
    
    
}