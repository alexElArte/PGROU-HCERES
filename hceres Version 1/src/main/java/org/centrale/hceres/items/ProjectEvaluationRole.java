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
@Table(name = "project_evaluation_role")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectEvaluationRole implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "project_evaluation_role_id")
    private Integer projectEvaluationRoleId;
    @Size(max = 256)
    @Column(name = "project_evaluation_role_name")
    private String projectEvaluationRoleName;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "projectEvaluationRoleId")
    private List<ProjectEvaluation> projectEvaluationList;

    public Integer getProjectEvaluationRoleId() {
        return projectEvaluationRoleId;
    }

    public void setProjectEvaluationRoleId(Integer projectEvaluationRoleId) {
        this.projectEvaluationRoleId = projectEvaluationRoleId;
    }

    public String getProjectEvaluationRoleName() {
        return projectEvaluationRoleName;
    }

    public void setProjectEvaluationRoleName(String projectEvaluationRoleName) {
        this.projectEvaluationRoleName = projectEvaluationRoleName;
    }

    public List<ProjectEvaluation> getProjectEvaluationList() {
        return projectEvaluationList;
    }

    public void setProjectEvaluationList(List<ProjectEvaluation> projectEvaluationList) {
        this.projectEvaluationList = projectEvaluationList;
    }
    
}