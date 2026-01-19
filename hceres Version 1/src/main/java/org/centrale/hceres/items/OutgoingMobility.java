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
@Table(name = "outgoing_mobility")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OutgoingMobility implements Serializable {

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
    @Column(name = "name_person_concerned")
    private String namePersonConcerned;
    @Column(name = "arrival_date")
    @Temporal(TemporalType.DATE)
    private Date arrivalDate;
    @Column(name = "departure_date")
    @Temporal(TemporalType.DATE)
    private Date departureDate;
    @Column(name = "duration")
    private Integer duration;
    @Size(max = 256)
    @Column(name = "host_lab_name")
    private String hostLabName;
    @Size(max = 256)
    @Column(name = "host_lab_location")
    private String hostLabLocation;
    @Size(max = 256)
    @Column(name = "pi_partner")
    private String piPartner;
    @Size(max = 256)
    @Column(name = "project_title")
    private String projectTitle;
    @Size(max = 256)
    @Column(name = "associated_funding")
    private String associatedFunding;
    @Column(name = "nb_publications")
    private Integer nbPublications;
    @Size(max = 256)
    @Column(name = "publication_reference")
    private String publicationReference;
    @Column(name = "strategic_recurring_collab")
    private Boolean strategicRecurringCollab;
    @Column(name = "active_project")
    private Boolean activeProject;
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

    public String getNamePersonConcerned() {
        return namePersonConcerned;
    }

    public void setNamePersonConcerned(String namePersonConcerned) {
        this.namePersonConcerned = namePersonConcerned;
    }

    public Date getArrivalDate() {
        return arrivalDate;
    }

    public void setArrivalDate(Date arrivalDate) {
        this.arrivalDate = arrivalDate;
    }

    public Date getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(Date departureDate) {
        this.departureDate = departureDate;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getHostLabName() {
        return hostLabName;
    }

    public void setHostLabName(String hostLabName) {
        this.hostLabName = hostLabName;
    }

    public String getHostLabLocation() {
        return hostLabLocation;
    }

    public void setHostLabLocation(String hostLabLocation) {
        this.hostLabLocation = hostLabLocation;
    }

    public String getPiPartner() {
        return piPartner;
    }

    public void setPiPartner(String piPartner) {
        this.piPartner = piPartner;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }

    public String getAssociatedFunding() {
        return associatedFunding;
    }

    public void setAssociatedFunding(String associatedFunding) {
        this.associatedFunding = associatedFunding;
    }

    public Integer getNbPublications() {
        return nbPublications;
    }

    public void setNbPublications(Integer nbPublications) {
        this.nbPublications = nbPublications;
    }

    public String getPublicationReference() {
        return publicationReference;
    }

    public void setPublicationReference(String publicationReference) {
        this.publicationReference = publicationReference;
    }

    public Boolean getStrategicRecurringCollab() {
        return strategicRecurringCollab;
    }

    public void setStrategicRecurringCollab(Boolean strategicRecurringCollab) {
        this.strategicRecurringCollab = strategicRecurringCollab;
    }

    public Boolean getActiveProject() {
        return activeProject;
    }

    public void setActiveProject(Boolean activeProject) {
        this.activeProject = activeProject;
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