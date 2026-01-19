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
@Table(name = "employer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Employer implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_employer")
    private Integer idEmployer;
    @Size(max = 256)
    @Column(name = "name_employer")
    private String nameEmployer;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employer")
    private List<Contract> contractList;

    public Integer getIdEmployer() {
        return idEmployer;
    }

    public void setIdEmployer(Integer idEmployer) {
        this.idEmployer = idEmployer;
    }

    public String getNameEmployer() {
        return nameEmployer;
    }

    public void setNameEmployer(String nameEmployer) {
        this.nameEmployer = nameEmployer;
    }

    public List<Contract> getContractList() {
        return contractList;
    }

    public void setContractList(List<Contract> contractList) {
        this.contractList = contractList;
    }
    
    
}