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
@Table(name = "type_thesis")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TypeThesis implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "type_thesis_id")
    private Integer typeThesisId;
    @Size(max = 256)
    @Column(name = "type_thesis_name")
    private String typeThesisName;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "typeThesisId")
    private List<EvaluationThesis> evaluationThesisList;

    public Integer getTypeThesisId() {
        return typeThesisId;
    }

    public void setTypeThesisId(Integer typeThesisId) {
        this.typeThesisId = typeThesisId;
    }

    public String getTypeThesisName() {
        return typeThesisName;
    }

    public void setTypeThesisName(String typeThesisName) {
        this.typeThesisName = typeThesisName;
    }

    public List<EvaluationThesis> getEvaluationThesisList() {
        return evaluationThesisList;
    }

    public void setEvaluationThesisList(List<EvaluationThesis> evaluationThesisList) {
        this.evaluationThesisList = evaluationThesisList;
    }
    
}