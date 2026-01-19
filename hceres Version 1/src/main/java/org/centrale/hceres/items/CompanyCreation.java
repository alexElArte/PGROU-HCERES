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
@Table(name = "company_creation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyCreation implements Serializable {

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
    @Column(name = "company_creation_name")
    private String companyCreationName;
    @Column(name = "company_creation_date")
    @Temporal(TemporalType.DATE)
    private Date companyCreationDate;
    @Basic(optional = false)
    @NotNull
    @Column(name = "company_creation_active")
    private boolean companyCreationActive;

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

    public String getCompanyCreationName() {
        return companyCreationName;
    }

    public void setCompanyCreationName(String companyCreationName) {
        this.companyCreationName = companyCreationName;
    }

    public Date getCompanyCreationDate() {
        return companyCreationDate;
    }

    public void setCompanyCreationDate(Date companyCreationDate) {
        this.companyCreationDate = companyCreationDate;
    }

    public boolean isCompanyCreationActive() {
        return companyCreationActive;
    }

    public void setCompanyCreationActive(boolean companyCreationActive) {
        this.companyCreationActive = companyCreationActive;
    }
}