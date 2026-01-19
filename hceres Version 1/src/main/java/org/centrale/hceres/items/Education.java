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
import java.util.Date;
import javax.persistence.*;
import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonIgnore;
/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "education")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Education implements Serializable {

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
    @Column(name = "education_course_name")
    private String educationCourseName;
    
    @Column(name = "education_completion")
    @Temporal(TemporalType.DATE)
    private Date educationCompletion;
    
    @Size(max = 2147483647)
    @Column(name = "education_description")
    private String educationDescription;
    
    @Size(max = 256)
    @Column(name = "education_formation")
    private String educationFormation;

    @JsonIgnore
    @JoinColumn(name = "education_involvement_id", referencedColumnName = "education_involvement_id")
    @ManyToOne(optional = false, cascade = CascadeType.PERSIST)
    private EducationInvolvement educationInvolvementId;
    @JsonIgnore
    @JoinColumn(name = "education_level_id", referencedColumnName = "education_level_id")
    @ManyToOne(optional = false, cascade = CascadeType.PERSIST)
    private EducationLevel educationLevelId;

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

    public String getEducationCourseName() {
        return educationCourseName;
    }

    public void setEducationCourseName(String educationCourseName) {
        this.educationCourseName = educationCourseName;
    }

    public Date getEducationCompletion() {
        return educationCompletion;
    }

    public void setEducationCompletion(Date educationCompletion) {
        this.educationCompletion = educationCompletion;
    }

    public String getEducationDescription() {
        return educationDescription;
    }

    public void setEducationDescription(String educationDescription) {
        this.educationDescription = educationDescription;
    }

    public String getEducationFormation() {
        return educationFormation;
    }

    public void setEducationFormation(String educationFormation) {
        this.educationFormation = educationFormation;
    }

    public EducationInvolvement getEducationInvolvementId() {
        return educationInvolvementId;
    }

    public void setEducationInvolvementId(EducationInvolvement educationInvolvementId) {
        this.educationInvolvementId = educationInvolvementId;
    }

    public EducationLevel getEducationLevelId() {
        return educationLevelId;
    }

    public void setEducationLevelId(EducationLevel educationLevelId) {
        this.educationLevelId = educationLevelId;
    }
    
}