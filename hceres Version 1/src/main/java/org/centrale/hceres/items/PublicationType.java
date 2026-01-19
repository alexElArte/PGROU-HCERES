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
import javax.validation.constraints.Size;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "publication_type")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PublicationType implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "publication_type_id")
    private Integer publicationTypeId;
    @Size(max = 256)
    @Column(name = "publication_type_name")
    private String publicationTypeName;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "publicationType")
    private List<Publication> publicationList;

    public Integer getPublicationTypeId() {
        return publicationTypeId;
    }

    public void setPublicationTypeId(Integer publicationTypeId) {
        this.publicationTypeId = publicationTypeId;
    }

    public String getPublicationTypeName() {
        return publicationTypeName;
    }

    public void setPublicationTypeName(String publicationTypeName) {
        this.publicationTypeName = publicationTypeName;
    }

    public List<Publication> getPublicationList() {
        return publicationList;
    }

    public void setPublicationList(List<Publication> publicationList) {
        this.publicationList = publicationList;
    }
    
}