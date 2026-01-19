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
import lombok.*;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 *
 * @author kwyhr
 */
@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ToolProductInvolvementPK implements Serializable {

    @Basic(optional = false)
    @NotNull
    @Column(name = "id_activity")
    private int idActivity;
    @Basic(optional = false)
    @NotNull
    @Column(name = "tool_product_role_id")
    private int toolProductRoleId;

    public int getIdActivity() {
        return idActivity;
    }

    public void setIdActivity(int idActivity) {
        this.idActivity = idActivity;
    }

    public int getToolProductRoleId() {
        return toolProductRoleId;
    }

    public void setToolProductRoleId(int toolProductRoleId) {
        this.toolProductRoleId = toolProductRoleId;
    }
    
    
}