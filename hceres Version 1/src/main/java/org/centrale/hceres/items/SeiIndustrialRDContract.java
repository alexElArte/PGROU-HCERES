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
@Table(name = "sei_industrial_r_d_contract")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SeiIndustrialRDContract implements Serializable {

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
    @Column(name = "name_company_involved")
    private String nameCompanyInvolved;
    
    @Size(max = 256)
    @Column(name = "project_title")
    private String projectTitle;
    
    @Column(name = "agreement_amount")
    private Integer agreementAmount;
    
    @Column(name = "end_date")
    @Temporal(TemporalType.DATE)
    private Date endDate;
    
    @Size(max = 256)
    @Column(name = "associated_publi_ref")
    private String associatedPubliRef;

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

    public String getNameCompanyInvolved() {
        return nameCompanyInvolved;
    }

    public void setNameCompanyInvolved(String nameCompanyInvolved) {
        this.nameCompanyInvolved = nameCompanyInvolved;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }

    public Integer getAgreementAmount() {
        return agreementAmount;
    }

    public void setAgreementAmount(Integer agreementAmount) {
        this.agreementAmount = agreementAmount;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getAssociatedPubliRef() {
        return associatedPubliRef;
    }

    public void setAssociatedPubliRef(String associatedPubliRef) {
        this.associatedPubliRef = associatedPubliRef;
    }

    
}