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

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "phd_associated_company")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PhdAssociatedCompany implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     *
     */
    @EmbeddedId
    protected PhdAssociatedCompanyPK phdAssociatedCompanyPK;
    @Column(name = "phd_associated_company_start")
    @Temporal(TemporalType.DATE)
    private Date phdAssociatedCompanyStart;
    @Column(name = "phd_associated_company_end")
    @Temporal(TemporalType.DATE)
    private Date phdAssociatedCompanyEnd;
    @JoinColumn(name = "company_id", referencedColumnName = "company_id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Company company;
    @JoinColumn(name = "phd_student_id", referencedColumnName = "phd_student_id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private PhdStudent phdStudent;

    public PhdAssociatedCompanyPK getPhdAssociatedCompanyPK() {
        return phdAssociatedCompanyPK;
    }

    public void setPhdAssociatedCompanyPK(PhdAssociatedCompanyPK phdAssociatedCompanyPK) {
        this.phdAssociatedCompanyPK = phdAssociatedCompanyPK;
    }

    public Date getPhdAssociatedCompanyStart() {
        return phdAssociatedCompanyStart;
    }

    public void setPhdAssociatedCompanyStart(Date phdAssociatedCompanyStart) {
        this.phdAssociatedCompanyStart = phdAssociatedCompanyStart;
    }

    public Date getPhdAssociatedCompanyEnd() {
        return phdAssociatedCompanyEnd;
    }

    public void setPhdAssociatedCompanyEnd(Date phdAssociatedCompanyEnd) {
        this.phdAssociatedCompanyEnd = phdAssociatedCompanyEnd;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public PhdStudent getPhdStudent() {
        return phdStudent;
    }

    public void setPhdStudent(PhdStudent phdStudent) {
        this.phdStudent = phdStudent;
    }
    
}