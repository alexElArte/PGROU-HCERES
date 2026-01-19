package org.centrale.hceres.items;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "involvement_training_pedagogical_responsibility")
public class InvolvementTrainingPedagogical implements Serializable {

    @Id
    @Column(name = "id_activity")
    private Integer idActivity;

    @JsonIgnore
    @JoinColumn(name = "id_activity")
    @MapsId
    @OneToOne(cascade = CascadeType.ALL)
    private Activity activity;
    @Basic
    @Column(name = "year")
    private Integer year;
    @Basic
    @Column(name = "name_master", length = -1)
    private String nameMaster;
    @Basic
    @Column(name = "id_type")
    private Integer idType;
    @ManyToOne
    @JoinColumn(
            name = "id_type",
            referencedColumnName = "id_type",
            insertable = false,
            updatable = false
    )
    private TypeInvolvementInTraining typeInvolvementInTraining;

    public Integer getIdActivity() {
        return idActivity;
    }

    public void setIdActivity(Integer idActivity) {
        this.idActivity = idActivity;
    }

    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getNameMaster() {
        return nameMaster;
    }

    public void setNameMaster(String nameMaster) {
        this.nameMaster = nameMaster;
    }

    public Integer getIdType() {
        return idType;
    }

    public void setIdType(Integer idType) {
        this.idType = idType;
    }

    public TypeInvolvementInTraining getTypeInvolvementInTraining() {
        return typeInvolvementInTraining;
    }

    public void setTypeInvolvementInTraining(TypeInvolvementInTraining typeInvolvementInTraining) {
        this.typeInvolvementInTraining = typeInvolvementInTraining;
    }
    
    
}
