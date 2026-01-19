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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "platform")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Platform implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_activity")
    private Integer idActivity;

    @JsonIgnore
    @JoinColumn(name = "id_activity")
    @MapsId
    @OneToOne(cascade = CascadeType.ALL)
    private Activity activity;

    @Column(name = "creation_date")
    @Temporal(TemporalType.DATE)
    private Date creationDate;
    @Size(max = 256)
    @Column(name = "description")
    private String description;
    @Size(max = 256)
    @Column(name = "managers")
    private String managers;
    @Size(max = 256)
    @Column(name = "affiliation")
    private String affiliation;
    @Size(max = 256)
    @Column(name = "labellisation")
    private String labellisation;
    @Column(name = "open_private_researchers")
    private Boolean openPrivateResearchers;
   

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

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getManagers() {
        return managers;
    }

    public void setManagers(String managers) {
        this.managers = managers;
    }

    public String getAffiliation() {
        return affiliation;
    }

    public void setAffiliation(String affiliation) {
        this.affiliation = affiliation;
    }

    public String getLabellisation() {
        return labellisation;
    }

    public void setLabellisation(String labellisation) {
        this.labellisation = labellisation;
    }

    public Boolean getOpenPrivateResearchers() {
        return openPrivateResearchers;
    }

    public void setOpenPrivateResearchers(Boolean openPrivateResearchers) {
        this.openPrivateResearchers = openPrivateResearchers;
    }
}