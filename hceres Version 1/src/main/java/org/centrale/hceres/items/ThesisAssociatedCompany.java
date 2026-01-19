/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.centrale.hceres.items;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Max
 */
@Entity
@Table(name = "thesis_associated_company")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ThesisAssociatedCompany.findAll", query = "SELECT t FROM ThesisAssociatedCompany t"),
    @NamedQuery(name = "ThesisAssociatedCompany.findByIdActivity", query = "SELECT t FROM ThesisAssociatedCompany t WHERE t.thesisAssociatedCompanyPK.idActivity = :idActivity"),
    @NamedQuery(name = "ThesisAssociatedCompany.findByCompanyId", query = "SELECT t FROM ThesisAssociatedCompany t WHERE t.thesisAssociatedCompanyPK.companyId = :companyId"),
    @NamedQuery(name = "ThesisAssociatedCompany.findByThesisAssociatedCompanyStart", query = "SELECT t FROM ThesisAssociatedCompany t WHERE t.thesisAssociatedCompanyStart = :thesisAssociatedCompanyStart"),
    @NamedQuery(name = "ThesisAssociatedCompany.findByThesisAssociatedCompanyEnd", query = "SELECT t FROM ThesisAssociatedCompany t WHERE t.thesisAssociatedCompanyEnd = :thesisAssociatedCompanyEnd")})
public class ThesisAssociatedCompany implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected ThesisAssociatedCompanyPK thesisAssociatedCompanyPK;
    @Column(name = "thesis_associated_company_start")
    @Temporal(TemporalType.DATE)
    private Date thesisAssociatedCompanyStart;
    @Column(name = "thesis_associated_company_end")
    @Temporal(TemporalType.DATE)
    private Date thesisAssociatedCompanyEnd;
    @JoinColumn(name = "company_id", referencedColumnName = "company_id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Company company;
    @JoinColumn(name = "id_activity", referencedColumnName = "id_activity", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    @JsonIgnore
    private TrainingThesis trainingThesis;

    public ThesisAssociatedCompany() {
    }

    public ThesisAssociatedCompany(ThesisAssociatedCompanyPK thesisAssociatedCompanyPK) {
        this.thesisAssociatedCompanyPK = thesisAssociatedCompanyPK;
    }

    public ThesisAssociatedCompany(int idActivity, int companyId) {
        this.thesisAssociatedCompanyPK = new ThesisAssociatedCompanyPK(idActivity, companyId);
    }

    public ThesisAssociatedCompanyPK getThesisAssociatedCompanyPK() {
        return thesisAssociatedCompanyPK;
    }

    public void setThesisAssociatedCompanyPK(ThesisAssociatedCompanyPK thesisAssociatedCompanyPK) {
        this.thesisAssociatedCompanyPK = thesisAssociatedCompanyPK;
    }

    public Date getThesisAssociatedCompanyStart() {
        return thesisAssociatedCompanyStart;
    }

    public void setThesisAssociatedCompanyStart(Date thesisAssociatedCompanyStart) {
        this.thesisAssociatedCompanyStart = thesisAssociatedCompanyStart;
    }

    public Date getThesisAssociatedCompanyEnd() {
        return thesisAssociatedCompanyEnd;
    }

    public void setThesisAssociatedCompanyEnd(Date thesisAssociatedCompanyEnd) {
        this.thesisAssociatedCompanyEnd = thesisAssociatedCompanyEnd;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public TrainingThesis getTrainingThesis() {
        return trainingThesis;
    }

    public void setTrainingThesis(TrainingThesis trainingThesis) {
        this.trainingThesis = trainingThesis;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (thesisAssociatedCompanyPK != null ? thesisAssociatedCompanyPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ThesisAssociatedCompany)) {
            return false;
        }
        ThesisAssociatedCompany other = (ThesisAssociatedCompany) object;
        if ((this.thesisAssociatedCompanyPK == null && other.thesisAssociatedCompanyPK != null) || (this.thesisAssociatedCompanyPK != null && !this.thesisAssociatedCompanyPK.equals(other.thesisAssociatedCompanyPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "org.centrale.hceres.items.ThesisAssociatedCompany[ thesisAssociatedCompanyPK=" + thesisAssociatedCompanyPK + " ]";
    }
    
}
