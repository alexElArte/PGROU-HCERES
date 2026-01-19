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
@Table(name = "tool_product_type")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ToolProductType implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "tool_product_type_id")
    private Integer toolProductTypeId;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 256)
    @Column(name = "tool_product_type_name")
    private String toolProductTypeName;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "toolProductType")
    private List<ToolProduct> toolProductList;

    @Getter
    public enum IdToolProductType {
        UNDEFINED(0, TypeActivityId.UNDEFINED),
        DECISION_SUPPORT_TOOL(1, TypeActivityId.TOOL_PRODUCT_DECISION_SUPPORT_TOOL),
        BIOCOLLECTION(2, TypeActivityId.TOOL_PRODUCT_BIOCOLLECTION),
        SOFTWARE(3, TypeActivityId.TOOL_PRODUCT_SOFTWARE),
        DATABASE(4, TypeActivityId.TOOL_PRODUCT_DATABASE),
        COHORT(5, TypeActivityId.TOOL_PRODUCT_COHORT);

        private final int id;
        private final TypeActivityId idTypeActivity;

        IdToolProductType(int id, TypeActivityId idTypeActivity) {
            this.id = id;
            this.idTypeActivity = idTypeActivity;
            
            
        }

        public int getId() {
            return id;
        }

        public TypeActivityId getIdTypeActivity() {
            return idTypeActivity;
        }
    }

    public Integer getToolProductTypeId() {
        return toolProductTypeId;
    }

    public void setToolProductTypeId(Integer toolProductTypeId) {
        this.toolProductTypeId = toolProductTypeId;
    }

    public String getToolProductTypeName() {
        return toolProductTypeName;
    }

    public void setToolProductTypeName(String toolProductTypeName) {
        this.toolProductTypeName = toolProductTypeName;
    }

    public List<ToolProduct> getToolProductList() {
        return toolProductList;
    }

    public void setToolProductList(List<ToolProduct> toolProductList) {
        this.toolProductList = toolProductList;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }
    
    
}