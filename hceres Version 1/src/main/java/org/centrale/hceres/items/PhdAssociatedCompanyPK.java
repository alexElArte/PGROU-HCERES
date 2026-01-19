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
import lombok.*;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 *
 * @author kwyhr
 */
@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class PhdAssociatedCompanyPK implements Serializable {

    @Basic(optional = false)
    @NotNull
    @Column(name = "phd_student_id")
    private int phdStudentId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "company_id")
    private int companyId;

    public int getPhdStudentId() {
        return phdStudentId;
    }

    public void setPhdStudentId(int phdStudentId) {
        this.phdStudentId = phdStudentId;
    }

    public int getCompanyId() {
        return companyId;
    }

    public void setCompanyId(int companyId) {
        this.companyId = companyId;
    }
    
    
}