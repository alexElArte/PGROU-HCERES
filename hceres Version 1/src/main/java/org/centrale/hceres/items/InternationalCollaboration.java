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
@Table(name = "national_international_collaboration")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InternationalCollaboration implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_activity")
    private Integer idActivity;

    @JsonIgnore
    @JoinColumn(name = "id_activity")
    @MapsId
    @OneToOne(cascade = CascadeType.ALL)
    private Activity activity;

    
    @Column(name = "date_project_start")
    @Temporal(TemporalType.DATE)
    private Date dateProjectStart;
    
    @Size(max = 256)
    @Column(name = "partner_entity")
    private String partnerEntity;
    
    @Size(max = 256)
    @Column(name = "country_state_city")
    private String countryStateCity;
    
    @Size(max = 256)
    @Column(name = "pi_partners")
    private String piPartners;
    
    @Size(max = 256)
    @Column(name = "mail_partners")
    private String mailPartners;
    
    @Size(max = 256)
    @Column(name = "projetc_title")
    private String projectTitle;
    
    @Column(name = "strategic_recurring_collab")
    private Boolean strategicRecurringCollab;
    
    @Column(name = "active_project")
    private Boolean activeProject;
    
    @Size(max = 256)
    @Column(name = "associated_funding")
    private String associatedFunding;
    
    @Column(name = "number_resulting_publications")
    private Integer numberResultingPublications;
    
    @Size(max = 256)
    @Column(name = "ref_joint_publication")
    private String refJointPublication;
    
    @Column(name = "umr_coordinated")
    private Boolean umrCoordinated;
    
    @Column(name = "agreement_signed")
    private Boolean agreementSigned;

    @Column(name = "type_collab_id")
    private Integer typeCollabId;

    @JsonIgnore
    @JoinColumn(
            name = "type_collab_id",
            referencedColumnName = "type_collab_id",
            insertable = false,
            updatable = false
    )
    @ManyToOne(optional = false, cascade = CascadeType.PERSIST)
    private TypeCollab typeCollab;

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

    public Date getDateProjectStart() {
        return dateProjectStart;
    }

    public void setDateProjectStart(Date dateProjectStart) {
        this.dateProjectStart = dateProjectStart;
    }

    public String getPartnerEntity() {
        return partnerEntity;
    }

    public void setPartnerEntity(String partnerEntity) {
        this.partnerEntity = partnerEntity;
    }

    public String getCountryStateCity() {
        return countryStateCity;
    }

    public void setCountryStateCity(String countryStateCity) {
        this.countryStateCity = countryStateCity;
    }

    public String getPiPartners() {
        return piPartners;
    }

    public void setPiPartners(String piPartners) {
        this.piPartners = piPartners;
    }

    public String getMailPartners() {
        return mailPartners;
    }

    public void setMailPartners(String mailPartners) {
        this.mailPartners = mailPartners;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
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

    public String getAssociatedFunding() {
        return associatedFunding;
    }

    public void setAssociatedFunding(String associatedFunding) {
        this.associatedFunding = associatedFunding;
    }

    public Integer getNumberResultingPublications() {
        return numberResultingPublications;
    }

    public void setNumberResultingPublications(Integer numberResultingPublications) {
        this.numberResultingPublications = numberResultingPublications;
    }

    public String getRefJointPublication() {
        return refJointPublication;
    }

    public void setRefJointPublication(String refJointPublication) {
        this.refJointPublication = refJointPublication;
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

    public Integer getTypeCollabId() {
        return typeCollabId;
    }

    public void setTypeCollabId(Integer typeCollabId) {
        this.typeCollabId = typeCollabId;
    }

    public TypeCollab getTypeCollab() {
        return typeCollab;
    }

    public void setTypeCollab(TypeCollab typeCollab) {
        this.typeCollab = typeCollab;
    }
    
}