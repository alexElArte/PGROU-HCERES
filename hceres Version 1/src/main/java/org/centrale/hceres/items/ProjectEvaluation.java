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
import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "project_evaluation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectEvaluation implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_activity")
    private Integer idActivity;

    @JsonIgnore
    @JoinColumn(name = "id_activity")
    @MapsId
    @OneToOne(cascade = CascadeType.ALL)
    private Activity activity;

    @Column(name = "year")
    private Integer year;

    @JoinColumn(name = "funder_id", referencedColumnName = "funder_id")
    @ManyToOne(optional = false)
    private Funder funderId;
    @JoinColumn(name = "project_evaluation_category_id", referencedColumnName = "project_evaluation_category_id")
    @ManyToOne(optional = false)
    private ProjectEvaluationCategory projectEvaluationCategoryId;
    @JoinColumn(name = "project_evaluation_role_id", referencedColumnName = "project_evaluation_role_id")
    @ManyToOne(optional = false)
    private ProjectEvaluationRole projectEvaluationRoleId;

    public Integer getIdActivity() {
        return idActivity;
    }

    public void setIdActivity(Integer idActivity) {
        this.idActivity = idActivity;
    }

    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Funder getFunderId() {
        return funderId;
    }

    public void setFunderId(Funder funderId) {
        this.funderId = funderId;
    }

    public ProjectEvaluationCategory getProjectEvaluationCategoryId() {
        return projectEvaluationCategoryId;
    }

    public void setProjectEvaluationCategoryId(ProjectEvaluationCategory projectEvaluationCategoryId) {
        this.projectEvaluationCategoryId = projectEvaluationCategoryId;
    }

    public ProjectEvaluationRole getProjectEvaluationRoleId() {
        return projectEvaluationRoleId;
    }

    public void setProjectEvaluationRoleId(ProjectEvaluationRole projectEvaluationRoleId) {
        this.projectEvaluationRoleId = projectEvaluationRoleId;
    }
    
    
}