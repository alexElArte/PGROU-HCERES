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
@Table(name = "type_collab")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TypeCollab implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "type_collab_id")
    private Integer typeCollabId;
    
    @Size(max = 256)
    @Column(name = "name_choice")
    private String nameChoice;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "typeCollab")
    private List<InternationalCollaboration> InternationalCollaborationList;

    public Integer getTypeCollabId() {
        return typeCollabId;
    }

    public void setTypeCollabId(Integer typeCollabId) {
        this.typeCollabId = typeCollabId;
    }

    public String getNameChoice() {
        return nameChoice;
    }

    public void setNameChoice(String nameChoice) {
        this.nameChoice = nameChoice;
    }

    public List<InternationalCollaboration> getInternationalCollaborationList() {
        return InternationalCollaborationList;
    }

    public void setInternationalCollaborationList(List<InternationalCollaboration> InternationalCollaborationList) {
        this.InternationalCollaborationList = InternationalCollaborationList;
    }
    
}