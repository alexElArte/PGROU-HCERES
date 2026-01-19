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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "scientific_expertise")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScientificExpertise implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_activity")
    private Integer idActivity;

    @JsonIgnore
    @JoinColumn(name = "id_activity")
    @MapsId
    @OneToOne(cascade = CascadeType.ALL)
    private Activity activity;

    @Column(name = "start_date")
    @Temporal(TemporalType.DATE)
    private Date startDate;
    @Column(name = "end_date")
    @Temporal(TemporalType.DATE)
    private Date endDate;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2147483647)
    @Column(name = "description")
    private String description;


    @Column(name = "scientific_expertise_type_id")
    private Integer scientificExpertiseTypeId;
    @JoinColumn(
            name = "scientific_expertise_type_id",
            referencedColumnName = "scientific_expertise_type_id",
            insertable = false,
            updatable = false
    )
    @ManyToOne(optional = false, cascade = CascadeType.PERSIST)
    private ScientificExpertiseType scientificExpertiseType;

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

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getScientificExpertiseTypeId() {
        return scientificExpertiseTypeId;
    }

    public void setScientificExpertiseTypeId(Integer scientificExpertiseTypeId) {
        this.scientificExpertiseTypeId = scientificExpertiseTypeId;
    }

    public ScientificExpertiseType getScientificExpertiseType() {
        return scientificExpertiseType;
    }

    public void setScientificExpertiseType(ScientificExpertiseType scientificExpertiseType) {
        this.scientificExpertiseType = scientificExpertiseType;
    }
    
    
}