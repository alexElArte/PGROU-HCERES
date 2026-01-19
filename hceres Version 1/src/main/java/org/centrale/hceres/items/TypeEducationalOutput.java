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
@Table(name = "type_educational_output")
public class TypeEducationalOutput implements Serializable {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_type", nullable = false)
    private int idType;
    @Basic
    @Column(name = "name_choice", length = -1)
    private String nameChoice;

    @JsonIgnore
    @OneToMany(mappedBy = "typeEducationalOutput")
    private List<EducationalOutput> educationalOutputList;

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

    public List<EducationalOutput> getEducationalOutputList() {
        return educationalOutputList;
    }

    public void setEducationalOutputList(List<EducationalOutput> educationalOutputList) {
        this.educationalOutputList = educationalOutputList;
    }
    
    
}
