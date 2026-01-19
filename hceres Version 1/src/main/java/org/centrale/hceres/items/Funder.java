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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "funder")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Funder implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Size(min = 1, max = 2147483647)
    @Column(name = "funder_id")
    private String funderId;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 256)
    @Column(name = "funder_name")
    private String funderName;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "funderId")
    private List<ProjectEvaluation> projectEvaluationList;

    public String getFunderId() {
        return funderId;
    }

    public void setFunderId(String funderId) {
        this.funderId = funderId;
    }

    public String getFunderName() {
        return funderName;
    }

    public void setFunderName(String funderName) {
        this.funderName = funderName;
    }

    public List<ProjectEvaluation> getProjectEvaluationList() {
        return projectEvaluationList;
    }

    public void setProjectEvaluationList(List<ProjectEvaluation> projectEvaluationList) {
        this.projectEvaluationList = projectEvaluationList;
    }
    
}