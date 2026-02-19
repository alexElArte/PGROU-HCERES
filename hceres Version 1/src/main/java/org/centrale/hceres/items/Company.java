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
import lombok.Setter;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "company")
@Getter
@Setter
@AllArgsConstructor
public class Company implements Serializable {

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2048)
    @Column(name = "company_name")
    private String companyName;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "company")
    private Collection<ThesisAssociatedCompany> thesisAssociatedCompanyCollection;

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "company_id")
    private Integer companyId;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "company")
    private List<PhdAssociatedCompany> phdAssociatedCompanyList;

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public List<PhdAssociatedCompany> getPhdAssociatedCompanyList() {
        return phdAssociatedCompanyList;
    }

    public void setPhdAssociatedCompanyList(List<PhdAssociatedCompany> phdAssociatedCompanyList) {
        this.phdAssociatedCompanyList = phdAssociatedCompanyList;
    }

    public Company() {
    }


    @XmlTransient
    public Collection<ThesisAssociatedCompany> getThesisAssociatedCompanyCollection() {
        return thesisAssociatedCompanyCollection;
    }

    public void setThesisAssociatedCompanyCollection(Collection<ThesisAssociatedCompany> thesisAssociatedCompanyCollection) {
        this.thesisAssociatedCompanyCollection = thesisAssociatedCompanyCollection;
    }
    
}