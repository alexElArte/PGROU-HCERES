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
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "laboratory_evaluation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LaboratoryEvaluation implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_activity")
    private Integer idActivity;

    @JsonIgnore
    @JoinColumn(name = "id_activity")
    @MapsId
    @OneToOne(cascade = CascadeType.ALL)
    private Activity activity;

    @Size(max = 256)
    @Column(name = "laboratory_evaluation_name")
    private String laboratoryEvaluationName;
    @Column(name = "year")
    private Integer year;

    @JoinColumn(name = "laboratory_evaluation_role_id", referencedColumnName = "laboratory_evaluation_role_id")
    @ManyToOne(optional = false)
    private LaboratoryEvaluationRole laboratoryEvaluationRoleId;

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

    public String getLaboratoryEvaluationName() {
        return laboratoryEvaluationName;
    }

    public void setLaboratoryEvaluationName(String laboratoryEvaluationName) {
        this.laboratoryEvaluationName = laboratoryEvaluationName;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public LaboratoryEvaluationRole getLaboratoryEvaluationRoleId() {
        return laboratoryEvaluationRoleId;
    }

    public void setLaboratoryEvaluationRoleId(LaboratoryEvaluationRole laboratoryEvaluationRoleId) {
        this.laboratoryEvaluationRoleId = laboratoryEvaluationRoleId;
    }
    
    
}