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
@Table(name = "project_evaluation_category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectEvaluationCategory implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "project_evaluation_category_id")
    private Integer projectEvaluationCategoryId;
    @Size(max = 256)
    @Column(name = "project_evaluation_category_name")
    private String projectEvaluationCategoryName;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "projectEvaluationCategoryId")
    private List<ProjectEvaluation> projectEvaluationList;

    public Integer getProjectEvaluationCategoryId() {
        return projectEvaluationCategoryId;
    }

    public void setProjectEvaluationCategoryId(Integer projectEvaluationCategoryId) {
        this.projectEvaluationCategoryId = projectEvaluationCategoryId;
    }

    public String getProjectEvaluationCategoryName() {
        return projectEvaluationCategoryName;
    }

    public void setProjectEvaluationCategoryName(String projectEvaluationCategoryName) {
        this.projectEvaluationCategoryName = projectEvaluationCategoryName;
    }

    public List<ProjectEvaluation> getProjectEvaluationList() {
        return projectEvaluationList;
    }

    public void setProjectEvaluationList(List<ProjectEvaluation> projectEvaluationList) {
        this.projectEvaluationList = projectEvaluationList;
    }
    
}