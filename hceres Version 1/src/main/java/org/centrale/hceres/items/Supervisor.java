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
import java.math.BigInteger;
import javax.persistence.*;

/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "supervisor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Supervisor implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "supervisor_id")
    private Integer supervisorId;
    @Column(name = "supervisor_percentage")
    private BigInteger supervisorPercentage;
    @JoinColumn(name = "phd_student_id", referencedColumnName = "phd_student_id")
    @ManyToOne(optional = false)
    private PhdStudent phdStudentId;
    @JoinColumn(name = "researcher_id", referencedColumnName = "researcher_id")
    @ManyToOne(optional = false)
    private Researcher researcherId;

    public Integer getSupervisorId() {
        return supervisorId;
    }

    public void setSupervisorId(Integer supervisorId) {
        this.supervisorId = supervisorId;
    }

    public BigInteger getSupervisorPercentage() {
        return supervisorPercentage;
    }

    public void setSupervisorPercentage(BigInteger supervisorPercentage) {
        this.supervisorPercentage = supervisorPercentage;
    }

    public PhdStudent getPhdStudentId() {
        return phdStudentId;
    }

    public void setPhdStudentId(PhdStudent phdStudentId) {
        this.phdStudentId = phdStudentId;
    }

    public Researcher getResearcherId() {
        return researcherId;
    }

    public void setResearcherId(Researcher researcherId) {
        this.researcherId = researcherId;
    }
    
}