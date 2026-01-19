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
import javax.persistence.CascadeType;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "network")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Network implements Serializable {

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
    @Size(max = 256)
    @Column(name = "name_network")
    private String nameNetwork;
    @Column(name = "active_network")
    private Boolean activeNetwork;
    @Size(max = 256)
    @Column(name = "associated_funding")
    private String associatedFunding;
    @Column(name = "nb_resulting_publications")
    private Integer nbResultingPublications;
    @Size(max = 256)
    @Column(name = "ref_resulting_publications")
    private String refResultingPublications;
    @Column(name = "umr_coordinated")
    private Boolean umrCoordinated;
    @Column(name = "agreement_signed")
    private Boolean agreementSigned;

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

    public String getNameNetwork() {
        return nameNetwork;
    }

    public void setNameNetwork(String nameNetwork) {
        this.nameNetwork = nameNetwork;
    }

    public Boolean getActiveNetwork() {
        return activeNetwork;
    }

    public void setActiveNetwork(Boolean activeNetwork) {
        this.activeNetwork = activeNetwork;
    }

    public String getAssociatedFunding() {
        return associatedFunding;
    }

    public void setAssociatedFunding(String associatedFunding) {
        this.associatedFunding = associatedFunding;
    }

    public Integer getNbResultingPublications() {
        return nbResultingPublications;
    }

    public void setNbResultingPublications(Integer nbResultingPublications) {
        this.nbResultingPublications = nbResultingPublications;
    }

    public String getRefResultingPublications() {
        return refResultingPublications;
    }

    public void setRefResultingPublications(String refResultingPublications) {
        this.refResultingPublications = refResultingPublications;
    }

    public Boolean getUmrCoordinated() {
        return umrCoordinated;
    }

    public void setUmrCoordinated(Boolean umrCoordinated) {
        this.umrCoordinated = umrCoordinated;
    }

    public Boolean getAgreementSigned() {
        return agreementSigned;
    }

    public void setAgreementSigned(Boolean agreementSigned) {
        this.agreementSigned = agreementSigned;
    }
    
    

}