package org.centrale.hceres.items;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "type_involvement_in_training")
public class TypeInvolvementInTraining implements Serializable {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_type", nullable = false)
    private int idType;
    @Basic
    @Column(name = "name_choice", length = -1)
    private String nameChoice;

    @JsonIgnore
    @OneToMany(mappedBy = "typeInvolvementInTraining")
    private List<InvolvementTrainingPedagogical> involvementTrainingPedagogicalList;

    public int getIdType() {
        return idType;
    }

    public void setIdType(int idType) {
        this.idType = idType;
    }

    public String getNameChoice() {
        return nameChoice;
    }

    public void setNameChoice(String nameChoice) {
        this.nameChoice = nameChoice;
    }

    public List<InvolvementTrainingPedagogical> getInvolvementTrainingPedagogicalList() {
        return involvementTrainingPedagogicalList;
    }

    public void setInvolvementTrainingPedagogicalList(List<InvolvementTrainingPedagogical> involvementTrainingPedagogicalList) {
        this.involvementTrainingPedagogicalList = involvementTrainingPedagogicalList;
    }
    
    
}
