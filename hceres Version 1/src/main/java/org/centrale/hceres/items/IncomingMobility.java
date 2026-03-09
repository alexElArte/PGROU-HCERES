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
@Table(name = "incoming_mobility")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IncomingMobility implements Serializable {

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
    @Column(name = "name_senior_scientist")
    private String nameSeniorScientist;
    @Column(name = "arrival_date")
    @Temporal(TemporalType.DATE)
    private Date arrivalDate;
    @Column(name = "departure_date")
    @Temporal(TemporalType.DATE)
    private Date departureDate;
    @Column(name = "duration")
    private Integer duration;
    @Size(max = 256)
    @Column(name = "nationality")
    private String nationality;
    @Size(max = 256)
    @Column(name = "original_lab_name")
    private String originalLabName;
    @Size(max = 256)
    @Column(name = "origina_lab_location")
    private String originaLabLocation;
    @Size(max = 256)
    @Column(name = "pi_partner")
    private String piPartner;
    @Size(max = 256)
    @Column(name = "project_title")
    private String projectTitle;
    @Size(max = 256)
    @Column(name = "associated_funding")
    private String associatedFunding;
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

    public String getNameSeniorScientist() {
        return nameSeniorScientist;
    }

    public void setNameSeniorScientist(String nameSeniorScientist) {
        this.nameSeniorScientist = nameSeniorScientist;
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

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getOriginalLabName() {
        return originalLabName;
    }

    public void setOriginalLabName(String originalLabName) {
        this.originalLabName = originalLabName;
    }

    public String getOriginaLabLocation() {
        return originaLabLocation;
    }

    public void setOriginaLabLocation(String originaLabLocation) {
        this.originaLabLocation = originaLabLocation;
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