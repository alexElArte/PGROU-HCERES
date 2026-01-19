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

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name = "tool_product_role")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ToolProductRole implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "tool_product_role_id")
    private Integer toolProductRoleId;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 256)
    @Column(name = "tool_product_role_name")
    private String toolProductRoleName;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "toolProductRole")
    private List<ToolProductInvolvement> toolProductInvolvementList;

    public Integer getToolProductRoleId() {
        return toolProductRoleId;
    }

    public void setToolProductRoleId(Integer toolProductRoleId) {
        this.toolProductRoleId = toolProductRoleId;
    }

    public String getToolProductRoleName() {
        return toolProductRoleName;
    }

    public void setToolProductRoleName(String toolProductRoleName) {
        this.toolProductRoleName = toolProductRoleName;
    }

    public List<ToolProductInvolvement> getToolProductInvolvementList() {
        return toolProductInvolvementList;
    }

    public void setToolProductInvolvementList(List<ToolProductInvolvement> toolProductInvolvementList) {
        this.toolProductInvolvementList = toolProductInvolvementList;
    }
    
    
}