/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.centrale.hceres.items;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

/**
 *
 * @author Max
 */
@Embeddable
public class ThesisAssociatedCompanyPK implements Serializable {

    @Basic(optional = false)
    @NotNull
    @Column(name = "id_activity")
    private int idActivity;
    @Basic(optional = false)
    @NotNull
    @Column(name = "company_id")
    private int companyId;

    public ThesisAssociatedCompanyPK() {
    }

    public ThesisAssociatedCompanyPK(int idActivity, int companyId) {
        this.idActivity = idActivity;
        this.companyId = companyId;
    }

    public int getIdActivity() {
        return idActivity;
    }

    public void setIdActivity(int idActivity) {
        this.idActivity = idActivity;
    }

    public int getCompanyId() {
        return companyId;
    }

    public void setCompanyId(int companyId) {
        this.companyId = companyId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) idActivity;
        hash += (int) companyId;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ThesisAssociatedCompanyPK)) {
            return false;
        }
        ThesisAssociatedCompanyPK other = (ThesisAssociatedCompanyPK) object;
        if (this.idActivity != other.idActivity) {
            return false;
        }
        if (this.companyId != other.companyId) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "org.centrale.hceres.items.ThesisAssociatedCompanyPK[ idActivity=" + idActivity + ", companyId=" + companyId + " ]";
    }
    
}
