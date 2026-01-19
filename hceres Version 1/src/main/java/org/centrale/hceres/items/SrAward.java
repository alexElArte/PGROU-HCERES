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

import org.hibernate.engine.internal.CascadePoint;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "sr_award")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SrAward implements Serializable {
    
        private Integer idCsvSrAward;


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
    @Column(name = "awardee_name")
    private String awardeeName;
    @Column(name = "award_date")
    @Temporal(TemporalType.DATE)
    private Date awardDate;
    @Size(max = 2147483647)
    @Column(name = "description")
    private String description;

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

    public String getAwardeeName() {
        return awardeeName;
    }

    public void setAwardeeName(String awardeeName) {
        this.awardeeName = awardeeName;
    }

    public Date getAwardDate() {
        return awardDate;
    }

    public void setAwardDate(Date awardDate) {
        this.awardDate = awardDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getIdCsvSrAward() {
        return idCsvSrAward;
    }

    public void setIdCsvSrAward(Integer idCsvSrAward) {
        this.idCsvSrAward = idCsvSrAward;
    }
    
    
}