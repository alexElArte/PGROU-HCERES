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
@Table(name = "sei_cifre_fellowship")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SeiCifreFellowship implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_activity")
    private Integer idActivity;

    @JsonIgnore
    @JoinColumn(name = "id_activity")
    @MapsId
    @OneToOne(cascade = CascadeType.ALL)
    private Activity activity;

    @Column(name = "contract_start_date")
    @Temporal(TemporalType.DATE)
    private Date contractStartDate;
    @Size(max = 256)
    @Column(name = "name_fellow")
    private String nameFellow;
    @Size(max = 256)
    @Column(name = "name_company_involved")
    private String nameCompanyInvolved;
    @Size(max = 256)
    @Column(name = "title_thesis")
    private String titleThesis;
    @Column(name = "contract_end_date")
    @Temporal(TemporalType.DATE)
    private Date contractEndDate;
    @Column(name = "contract_amount")
    private Integer contractAmount;
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

    public Date getContractStartDate() {
        return contractStartDate;
    }

    public void setContractStartDate(Date contractStartDate) {
        this.contractStartDate = contractStartDate;
    }

    public String getNameFellow() {
        return nameFellow;
    }

    public void setNameFellow(String nameFellow) {
        this.nameFellow = nameFellow;
    }

    public String getNameCompanyInvolved() {
        return nameCompanyInvolved;
    }

    public void setNameCompanyInvolved(String nameCompanyInvolved) {
        this.nameCompanyInvolved = nameCompanyInvolved;
    }

    public String getTitleThesis() {
        return titleThesis;
    }

    public void setTitleThesis(String titleThesis) {
        this.titleThesis = titleThesis;
    }

    public Date getContractEndDate() {
        return contractEndDate;
    }

    public void setContractEndDate(Date contractEndDate) {
        this.contractEndDate = contractEndDate;
    }

    public Integer getContractAmount() {
        return contractAmount;
    }

    public void setContractAmount(Integer contractAmount) {
        this.contractAmount = contractAmount;
    }

    public String getAssociatedPubliRef() {
        return associatedPubliRef;
    }

    public void setAssociatedPubliRef(String associatedPubliRef) {
        this.associatedPubliRef = associatedPubliRef;
    }
    
    

}