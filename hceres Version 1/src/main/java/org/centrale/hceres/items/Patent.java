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
@Table(name = "patent")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Patent implements Serializable {

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
    @Column(name = "title")
    private String title;
    @Column(name = "registration_date")
    @Temporal(TemporalType.DATE)
    private Date registrationDate;
    @Column(name = "filing_date")
    @Temporal(TemporalType.DATE)
    private Date filingDate;
    @Column(name = "acceptation_date")
    @Temporal(TemporalType.DATE)
    private Date acceptationDate;
    @Column(name = "licensing_date")
    @Temporal(TemporalType.DATE)
    private Date licensingDate;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2147483647)
    @Column(name = "inventors")
    private String inventors;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2147483647)
    @Column(name = "co_owners")
    private String coOwners;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "priority_number")
    private Float priorityNumber;
    @Column(name = "priority_date")
    @Temporal(TemporalType.DATE)
    private Date priorityDate;
    @Size(max = 256)
    @Column(name = "publication_number")
    private String publicationNumber;
    @Column(name = "publication_date")
    @Temporal(TemporalType.DATE)
    private Date publicationDate;
    @Size(max = 256)
    @Column(name = "inpi_link")
    private String inpiLink;
    @Basic(optional = false)
    @NotNull
    @Column(name = "status")
    private boolean status;
    @Basic(optional = false)
    @NotNull
    @Column(name = "pct_extension_obtained")
    private boolean pctExtensionObtained;
    @Size(max = 256)
    @Column(name = "publication_number_pct_extension")
    private String publicationNumberPctExtension;
    @Column(name = "publication_date_pct_extension")
    @Temporal(TemporalType.DATE)
    private Date publicationDatePctExtension;
    @Basic(optional = false)
    @NotNull
    @Column(name = "international_extension")
    private boolean internationalExtension;
    @Size(max = 256)
    @Column(name = "publication_number_international_extension")
    private String publicationNumberInternationalExtension;
    @Column(name = "publication_date_international_extension")
    @Temporal(TemporalType.DATE)
    private Date publicationDateInternationalExtension;
    @Size(max = 256)
    @Column(name = "ref_transfer_contract")
    private String refTransferContract;
    @Size(max = 256)
    @Column(name = "name_company_involved")
    private String nameCompanyInvolved;

    @JoinColumn(name = "type_patent_id", referencedColumnName = "type_patent_id")
    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    private TypePatent typePatentId;

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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }

    public Date getFilingDate() {
        return filingDate;
    }

    public void setFilingDate(Date filingDate) {
        this.filingDate = filingDate;
    }

    public Date getAcceptationDate() {
        return acceptationDate;
    }

    public void setAcceptationDate(Date acceptationDate) {
        this.acceptationDate = acceptationDate;
    }

    public Date getLicensingDate() {
        return licensingDate;
    }

    public void setLicensingDate(Date licensingDate) {
        this.licensingDate = licensingDate;
    }

    public String getInventors() {
        return inventors;
    }

    public void setInventors(String inventors) {
        this.inventors = inventors;
    }

    public String getCoOwners() {
        return coOwners;
    }

    public void setCoOwners(String coOwners) {
        this.coOwners = coOwners;
    }

    public Float getPriorityNumber() {
        return priorityNumber;
    }

    public void setPriorityNumber(Float priorityNumber) {
        this.priorityNumber = priorityNumber;
    }

    public Date getPriorityDate() {
        return priorityDate;
    }

    public void setPriorityDate(Date priorityDate) {
        this.priorityDate = priorityDate;
    }

    public String getPublicationNumber() {
        return publicationNumber;
    }

    public void setPublicationNumber(String publicationNumber) {
        this.publicationNumber = publicationNumber;
    }

    public Date getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(Date publicationDate) {
        this.publicationDate = publicationDate;
    }

    public String getInpiLink() {
        return inpiLink;
    }

    public void setInpiLink(String inpiLink) {
        this.inpiLink = inpiLink;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public boolean isPctExtensionObtained() {
        return pctExtensionObtained;
    }

    public void setPctExtensionObtained(boolean pctExtensionObtained) {
        this.pctExtensionObtained = pctExtensionObtained;
    }

    public String getPublicationNumberPctExtension() {
        return publicationNumberPctExtension;
    }

    public void setPublicationNumberPctExtension(String publicationNumberPctExtension) {
        this.publicationNumberPctExtension = publicationNumberPctExtension;
    }

    public Date getPublicationDatePctExtension() {
        return publicationDatePctExtension;
    }

    public void setPublicationDatePctExtension(Date publicationDatePctExtension) {
        this.publicationDatePctExtension = publicationDatePctExtension;
    }

    public boolean isInternationalExtension() {
        return internationalExtension;
    }

    public void setInternationalExtension(boolean internationalExtension) {
        this.internationalExtension = internationalExtension;
    }

    public String getPublicationNumberInternationalExtension() {
        return publicationNumberInternationalExtension;
    }

    public void setPublicationNumberInternationalExtension(String publicationNumberInternationalExtension) {
        this.publicationNumberInternationalExtension = publicationNumberInternationalExtension;
    }

    public Date getPublicationDateInternationalExtension() {
        return publicationDateInternationalExtension;
    }

    public void setPublicationDateInternationalExtension(Date publicationDateInternationalExtension) {
        this.publicationDateInternationalExtension = publicationDateInternationalExtension;
    }

    public String getRefTransferContract() {
        return refTransferContract;
    }

    public void setRefTransferContract(String refTransferContract) {
        this.refTransferContract = refTransferContract;
    }

    public String getNameCompanyInvolved() {
        return nameCompanyInvolved;
    }

    public void setNameCompanyInvolved(String nameCompanyInvolved) {
        this.nameCompanyInvolved = nameCompanyInvolved;
    }

    public TypePatent getTypePatentId() {
        return typePatentId;
    }

    public void setTypePatentId(TypePatent typePatentId) {
        this.typePatentId = typePatentId;
    }
    
}