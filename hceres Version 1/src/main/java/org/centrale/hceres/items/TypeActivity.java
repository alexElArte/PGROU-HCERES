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
import lombok.Setter;

import java.io.Serializable;
import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.Size;

/**
 * @author kwyhr
 */
@Entity
@Table(name = "type_activity")
@Getter
@Setter
@AllArgsConstructor
public class TypeActivity implements Serializable {

    @Size(max = 2048)
    @Column(name = "name_type")
    private String nameType;

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "id_type_activity")
    private Integer idTypeActivity;


    @OneToMany(cascade = CascadeType.ALL, mappedBy = "typeActivity")
    @JsonIgnore
    private List<Activity> activityList;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getIdTypeActivity() {
        return idTypeActivity;
    }

    public String getNameType() {
        return nameType;
    }

    public List<Activity> getActivityList() {
        return activityList;
    }

    public TypeActivity() {
    }

    public void setNameType(String nameType) {
        this.nameType = nameType;
    }

    public void setIdTypeActivity(Integer idTypeActivity) {
        this.idTypeActivity = idTypeActivity;
    }

    public void setActivityList(List<Activity> activityList) {
        this.activityList = activityList;
    }
    
    
    
}