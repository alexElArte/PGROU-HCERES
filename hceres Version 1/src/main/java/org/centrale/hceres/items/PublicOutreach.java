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
import java.util.Date;
import javax.persistence.*;
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "public_outreach")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PublicOutreach implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_activity")
    private Integer idActivity;

    @JsonIgnore
    @JoinColumn(name = "id_activity")
    @MapsId
    @OneToOne(cascade = CascadeType.ALL)
    private Activity activity;

    @Column(name = "completion_date")
    @Temporal(TemporalType.DATE)
    private Date completionDate;
    @Size(max = 256)
    @Column(name = "description")
    private String description;

    @Column(name = "public_outreach_type_id")
    private Integer publicOutreachTypeId;

    @JoinColumn(
            name = "public_outreach_type_id",
            referencedColumnName = "public_outreach_type_id",
            insertable = false,
            updatable = false
    )
    @ManyToOne(optional = false)
    private PublicOutreachType publicOutreachType;

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

    public Date getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(Date completionDate) {
        this.completionDate = completionDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPublicOutreachTypeId() {
        return publicOutreachTypeId;
    }

    public void setPublicOutreachTypeId(Integer publicOutreachTypeId) {
        this.publicOutreachTypeId = publicOutreachTypeId;
    }

    public PublicOutreachType getPublicOutreachType() {
        return publicOutreachType;
    }

    public void setPublicOutreachType(PublicOutreachType publicOutreachType) {
        this.publicOutreachType = publicOutreachType;
    }
    
}