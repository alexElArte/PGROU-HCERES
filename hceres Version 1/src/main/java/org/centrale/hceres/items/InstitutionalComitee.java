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
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "institutional_comitee")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InstitutionalComitee implements Serializable {

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
    @Column(name = "institutional_comitee_name")
    private String institutionalComiteeName;
    @Column(name = "year")
    private Integer year;

    @Column(name = "laboratory_evaluation_role_id")
    private Integer laboratoryEvaluationRoleId;

    @JoinColumn(
            name = "laboratory_evaluation_role_id",
            referencedColumnName = "laboratory_evaluation_role_id",
            insertable = false,
            updatable = false
    )
    @ManyToOne(optional = false)
    private LaboratoryEvaluationRole laboratoryEvaluationRole;

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

    public String getInstitutionalComiteeName() {
        return institutionalComiteeName;
    }

    public void setInstitutionalComiteeName(String institutionalComiteeName) {
        this.institutionalComiteeName = institutionalComiteeName;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getLaboratoryEvaluationRoleId() {
        return laboratoryEvaluationRoleId;
    }

    public void setLaboratoryEvaluationRoleId(Integer laboratoryEvaluationRoleId) {
        this.laboratoryEvaluationRoleId = laboratoryEvaluationRoleId;
    }

    public LaboratoryEvaluationRole getLaboratoryEvaluationRole() {
        return laboratoryEvaluationRole;
    }

    public void setLaboratoryEvaluationRole(LaboratoryEvaluationRole laboratoryEvaluationRole) {
        this.laboratoryEvaluationRole = laboratoryEvaluationRole;
    }
    
    
}