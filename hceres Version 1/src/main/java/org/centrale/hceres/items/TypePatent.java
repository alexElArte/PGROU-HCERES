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
@Table(name = "type_patent")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TypePatent implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "type_patent_id")
    private Integer typePatentId;
    @Size(max = 256)
    @Column(name = "name_choice")
    private String nameChoice;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "typePatentId")
    private List<Patent> patentList;

    public Integer getTypePatentId() {
        return typePatentId;
    }

    public void setTypePatentId(Integer typePatentId) {
        this.typePatentId = typePatentId;
    }

    public String getNameChoice() {
        return nameChoice;
    }

    public void setNameChoice(String nameChoice) {
        this.nameChoice = nameChoice;
    }

    public List<Patent> getPatentList() {
        return patentList;
    }

    public void setPatentList(List<Patent> patentList) {
        this.patentList = patentList;
    }
    
    
}