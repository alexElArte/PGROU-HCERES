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
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "evaluation_thesis_role")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationThesisRole implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "evaluation_thesis_role_id")
    private Integer evaluationThesisRoleId;
    @Size(max = 256)
    @Column(name = "evaluation_thesis_role_name")
    private String evaluationThesisRoleName;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "evaluationThesisRoleId")
    private List<EvaluationThesis> evaluationThesisList;

    public Integer getEvaluationThesisRoleId() {
        return evaluationThesisRoleId;
    }

    public void setEvaluationThesisRoleId(Integer evaluationThesisRoleId) {
        this.evaluationThesisRoleId = evaluationThesisRoleId;
    }

    public String getEvaluationThesisRoleName() {
        return evaluationThesisRoleName;
    }

    public void setEvaluationThesisRoleName(String evaluationThesisRoleName) {
        this.evaluationThesisRoleName = evaluationThesisRoleName;
    }

    public List<EvaluationThesis> getEvaluationThesisList() {
        return evaluationThesisList;
    }

    public void setEvaluationThesisList(List<EvaluationThesis> evaluationThesisList) {
        this.evaluationThesisList = evaluationThesisList;
    }
    
}