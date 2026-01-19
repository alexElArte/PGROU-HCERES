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
@Table(name = "function_editorial_activity")
/*
*/
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FunctionEditorialActivity implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "function_editorial_activity_id")
    private Integer functionEditorialActivityId;
    @Size(max = 256)
    @Column(name = "function_editorial_activity_name")
    private String functionEditorialActivityName;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "functionEditorialActivity")
    private List<EditorialActivity> editorialActivityList;

    public Integer getFunctionEditorialActivityId() {
        return functionEditorialActivityId;
    }

    public void setFunctionEditorialActivityId(Integer functionEditorialActivityId) {
        this.functionEditorialActivityId = functionEditorialActivityId;
    }

    public String getFunctionEditorialActivityName() {
        return functionEditorialActivityName;
    }

    public void setFunctionEditorialActivityName(String functionEditorialActivityName) {
        this.functionEditorialActivityName = functionEditorialActivityName;
    }

    public List<EditorialActivity> getEditorialActivityList() {
        return editorialActivityList;
    }

    public void setEditorialActivityList(List<EditorialActivity> editorialActivityList) {
        this.editorialActivityList = editorialActivityList;
    }
    
    
}