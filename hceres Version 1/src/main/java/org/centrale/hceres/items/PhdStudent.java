/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.centrale.hceres.items;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Max
 */
@Entity
@Table(name = "phd_student")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "PhdStudent.findAll", query = "SELECT p FROM PhdStudent p"),
    @NamedQuery(name = "PhdStudent.findByPhdStudentId", query = "SELECT p FROM PhdStudent p WHERE p.phdStudentId = :phdStudentId"),
    @NamedQuery(name = "PhdStudent.findByPhdStudentName", query = "SELECT p FROM PhdStudent p WHERE p.phdStudentName = :phdStudentName"),
    @NamedQuery(name = "PhdStudent.findByPhdStudentSurname", query = "SELECT p FROM PhdStudent p WHERE p.phdStudentSurname = :phdStudentSurname")})
public class PhdStudent implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "phd_student_id")
    private Integer phdStudentId;
    @Size(max = 2048)
    @Column(name = "phd_student_name")
    private String phdStudentName;
    @Size(max = 2048)
    @Column(name = "phd_student_surname")
    private String phdStudentSurname;
    @JoinColumn(name = "nationality_id", referencedColumnName = "nationality_id")
    @ManyToOne
    private Nationality nationalityId;

    public PhdStudent() {
    }

    public PhdStudent(Integer phdStudentId) {
        this.phdStudentId = phdStudentId;
    }

    public Integer getPhdStudentId() {
        return phdStudentId;
    }

    public void setPhdStudentId(Integer phdStudentId) {
        this.phdStudentId = phdStudentId;
    }

    public String getPhdStudentName() {
        return phdStudentName;
    }

    public void setPhdStudentName(String phdStudentName) {
        this.phdStudentName = phdStudentName;
    }

    public String getPhdStudentSurname() {
        return phdStudentSurname;
    }

    public void setPhdStudentSurname(String phdStudentSurname) {
        this.phdStudentSurname = phdStudentSurname;
    }

    public Nationality getNationalityId() {
        return nationalityId;
    }

    public void setNationalityId(Nationality nationalityId) {
        this.nationalityId = nationalityId;
    }

    
}
