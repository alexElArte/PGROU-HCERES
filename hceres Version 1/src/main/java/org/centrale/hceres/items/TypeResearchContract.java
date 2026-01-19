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
import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "type_research_contract")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TypeResearchContract implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_type")
    private Integer idType;
    @Size(max = 256)
    @Column(name = "name_choice")
    private String nameChoice;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "typeResearchContract")
    @JsonIgnore
    private List<ResearchContractFundedCharit> researchContractFundedCharitList;

    public Integer getIdType() {
        return idType;
    }

    public void setIdType(Integer idType) {
        this.idType = idType;
    }

    public String getNameChoice() {
        return nameChoice;
    }

    public void setNameChoice(String nameChoice) {
        this.nameChoice = nameChoice;
    }

    public List<ResearchContractFundedCharit> getResearchContractFundedCharitList() {
        return researchContractFundedCharitList;
    }

    public void setResearchContractFundedCharitList(List<ResearchContractFundedCharit> researchContractFundedCharitList) {
        this.researchContractFundedCharitList = researchContractFundedCharitList;
    }
    
    
}