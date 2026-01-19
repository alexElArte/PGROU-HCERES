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
@Table(name = "public_outreach_type")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PublicOutreachType implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "public_outreach_type_id")
    private Integer publicOutreachTypeId;
    @Size(max = 256)
    @Column(name = "public_outreach_type_name")
    private String publicOutreachTypeName;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "publicOutreachType")
    private List<PublicOutreach> publicOutreachList;

    public Integer getPublicOutreachTypeId() {
        return publicOutreachTypeId;
    }

    public void setPublicOutreachTypeId(Integer publicOutreachTypeId) {
        this.publicOutreachTypeId = publicOutreachTypeId;
    }

    public String getPublicOutreachTypeName() {
        return publicOutreachTypeName;
    }

    public void setPublicOutreachTypeName(String publicOutreachTypeName) {
        this.publicOutreachTypeName = publicOutreachTypeName;
    }

    public List<PublicOutreach> getPublicOutreachList() {
        return publicOutreachList;
    }

    public void setPublicOutreachList(List<PublicOutreach> publicOutreachList) {
        this.publicOutreachList = publicOutreachList;
    }
    
    
}