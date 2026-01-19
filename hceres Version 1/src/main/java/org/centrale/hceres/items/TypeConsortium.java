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
import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "type_consortium")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TypeConsortium implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "type_consortium_id")
    private Integer typeConsortiumId;
    @Size(max = 256)
    @Column(name = "type_consortium_name")
    private String typeConsortiumName;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "typeConsortiumId")
    private List<SeiLeadConsortiumIndustry> seiLeadConsortiumIndustryList;

    public Integer getTypeConsortiumId() {
        return typeConsortiumId;
    }

    public void setTypeConsortiumId(Integer typeConsortiumId) {
        this.typeConsortiumId = typeConsortiumId;
    }

    public String getTypeConsortiumName() {
        return typeConsortiumName;
    }

    public void setTypeConsortiumName(String typeConsortiumName) {
        this.typeConsortiumName = typeConsortiumName;
    }

    public List<SeiLeadConsortiumIndustry> getSeiLeadConsortiumIndustryList() {
        return seiLeadConsortiumIndustryList;
    }

    public void setSeiLeadConsortiumIndustryList(List<SeiLeadConsortiumIndustry> seiLeadConsortiumIndustryList) {
        this.seiLeadConsortiumIndustryList = seiLeadConsortiumIndustryList;
    }
    
    
}