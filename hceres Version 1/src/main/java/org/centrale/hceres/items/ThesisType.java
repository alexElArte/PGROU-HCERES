/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.centrale.hceres.items;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Max
 */
@Entity
@Table(name = "thesis_type")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ThesisType.findAll", query = "SELECT t FROM ThesisType t"),
    @NamedQuery(name = "ThesisType.findByThesisTypeId", query = "SELECT t FROM ThesisType t WHERE t.thesisTypeId = :thesisTypeId"),
    @NamedQuery(name = "ThesisType.findByThesisTypeName", query = "SELECT t FROM ThesisType t WHERE t.thesisTypeName = :thesisTypeName")})
public class ThesisType implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "thesis_type_id")
    private Integer thesisTypeId;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2048)
    @Column(name = "thesis_type_name")
    private String thesisTypeName;

    public ThesisType() {
    }

    public ThesisType(Integer thesisTypeId) {
        this.thesisTypeId = thesisTypeId;
    }

    public ThesisType(Integer thesisTypeId, String thesisTypeName) {
        this.thesisTypeId = thesisTypeId;
        this.thesisTypeName = thesisTypeName;
    }

    public Integer getThesisTypeId() {
        return thesisTypeId;
    }

    public void setThesisTypeId(Integer thesisTypeId) {
        this.thesisTypeId = thesisTypeId;
    }

    public String getThesisTypeName() {
        return thesisTypeName;
    }

    public void setThesisTypeName(String thesisTypeName) {
        this.thesisTypeName = thesisTypeName;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (thesisTypeId != null ? thesisTypeId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ThesisType)) {
            return false;
        }
        ThesisType other = (ThesisType) object;
        if ((this.thesisTypeId == null && other.thesisTypeId != null) || (this.thesisTypeId != null && !this.thesisTypeId.equals(other.thesisTypeId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "org.centrale.hceres.items.ThesisType[ thesisTypeId=" + thesisTypeId + " ]";
    }
    
}
