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
import javax.persistence.*;
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "tool_product_involvement")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ToolProductInvolvement implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     *
     */
    @EmbeddedId
    protected ToolProductInvolvementPK toolProductInvolvementPK;
    @Size(max = 2147483647)
    @Column(name = "tool_product_involvement_researchers")
    private String toolProductInvolvementResearchers;
    @JsonIgnore
    @JoinColumn(name = "id_activity", referencedColumnName = "id_activity", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private ToolProduct toolProduct;
    @JsonIgnore
    @JoinColumn(name = "tool_product_role_id", referencedColumnName = "tool_product_role_id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private ToolProductRole toolProductRole;

    public ToolProductInvolvementPK getToolProductInvolvementPK() {
        return toolProductInvolvementPK;
    }

    public void setToolProductInvolvementPK(ToolProductInvolvementPK toolProductInvolvementPK) {
        this.toolProductInvolvementPK = toolProductInvolvementPK;
    }

    public String getToolProductInvolvementResearchers() {
        return toolProductInvolvementResearchers;
    }

    public void setToolProductInvolvementResearchers(String toolProductInvolvementResearchers) {
        this.toolProductInvolvementResearchers = toolProductInvolvementResearchers;
    }

    public ToolProduct getToolProduct() {
        return toolProduct;
    }

    public void setToolProduct(ToolProduct toolProduct) {
        this.toolProduct = toolProduct;
    }

    public ToolProductRole getToolProductRole() {
        return toolProductRole;
    }

    public void setToolProductRole(ToolProductRole toolProductRole) {
        this.toolProductRole = toolProductRole;
    }
    
    
}