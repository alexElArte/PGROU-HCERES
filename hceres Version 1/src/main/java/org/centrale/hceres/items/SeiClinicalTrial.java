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
@Table(name = "sei_clinical_trial")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SeiClinicalTrial implements Serializable {

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
    @Column(name = "coordinator_partner")
    private Boolean coordinatorPartner;
    @Size(max = 256)
    @Column(name = "title_clinical_trial")
    private String titleClinicalTrial;
    @Column(name = "end_date")
    @Temporal(TemporalType.DATE)
    private Date endDate;
    @Size(max = 256)
    @Column(name = "registration_nb")
    private String registrationNb;
    @Size(max = 256)
    @Column(name = "sponsor_name")
    private String sponsorName;
    @Column(name = "included_patients_nb")
    private Integer includedPatientsNb;
    @Size(max = 256)
    @Column(name = "funding")
    private String funding;
    @Column(name = "funding_amount")
    private Integer fundingAmount;

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

    public Boolean getCoordinatorPartner() {
        return coordinatorPartner;
    }

    public void setCoordinatorPartner(Boolean coordinatorPartner) {
        this.coordinatorPartner = coordinatorPartner;
    }

    public String getTitleClinicalTrial() {
        return titleClinicalTrial;
    }

    public void setTitleClinicalTrial(String titleClinicalTrial) {
        this.titleClinicalTrial = titleClinicalTrial;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getRegistrationNb() {
        return registrationNb;
    }

    public void setRegistrationNb(String registrationNb) {
        this.registrationNb = registrationNb;
    }

    public String getSponsorName() {
        return sponsorName;
    }

    public void setSponsorName(String sponsorName) {
        this.sponsorName = sponsorName;
    }

    public Integer getIncludedPatientsNb() {
        return includedPatientsNb;
    }

    public void setIncludedPatientsNb(Integer includedPatientsNb) {
        this.includedPatientsNb = includedPatientsNb;
    }

    public String getFunding() {
        return funding;
    }

    public void setFunding(String funding) {
        this.funding = funding;
    }

    public Integer getFundingAmount() {
        return fundingAmount;
    }

    public void setFundingAmount(Integer fundingAmount) {
        this.fundingAmount = fundingAmount;
    }

    

}