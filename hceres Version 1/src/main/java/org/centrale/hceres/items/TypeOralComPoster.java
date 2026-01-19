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
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "type_oral_com_poster")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TypeOralComPoster implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "type_oral_com_poster_id")
    private Integer typeOralComPosterId;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 256)
    @Column(name = "name_choice")
    private String nameChoice;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "typeOralComPoster")
    private List<OralComPoster> oralComPosterList;

    public Integer getTypeOralComPosterId() {
        return typeOralComPosterId;
    }

    public void setTypeOralComPosterId(Integer typeOralComPosterId) {
        this.typeOralComPosterId = typeOralComPosterId;
    }

    public String getNameChoice() {
        return nameChoice;
    }

    public void setNameChoice(String nameChoice) {
        this.nameChoice = nameChoice;
    }

    public List<OralComPoster> getOralComPosterList() {
        return oralComPosterList;
    }

    public void setOralComPosterList(List<OralComPoster> oralComPosterList) {
        this.oralComPosterList = oralComPosterList;
    }
    
    
}