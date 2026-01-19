/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.centrale.hceres.dto.stat.items;

import java.util.Date;
import java.util.Objects;
import org.centrale.hceres.dto.stat.utils.ActivityStatDto;
import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.CompanyCreation;

/**
 *
 * @author Max
 */
public class CompanyCreationStatItemDto extends ActivityStatDto{
    // On envoie tout les attributs, mais pas forcément pertinent (Trier sur le nom ?) 
    private Date dateCreation;
    private String companyCreationName;
    private boolean companyCreationActive;
    
    @Override
    public void fillDataFromActivity(Activity activity) {
        super.fillDataFromActivity(activity);

        CompanyCreation companyCreation = activity.getCompanyCreation();

        if (companyCreation != null) {
            this.companyCreationName = companyCreation.getCompanyCreationName();
            this.dateCreation = companyCreation.getCompanyCreationDate();
            this.companyCreationActive = companyCreation.isCompanyCreationActive();
        }
    }

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

    public String getCompanyCreationName() {
        return companyCreationName;
    }

    public void setCompanyCreationName(String companyCreationName) {
        this.companyCreationName = companyCreationName;
    }

    public boolean isCompanyCreationActive() {
        return companyCreationActive;
    }

    public void setCompanyCreationActive(boolean companyCreationActive) {
        this.companyCreationActive = companyCreationActive;
    }

    @Override
    public String toString() {
        return "CompanyCreationItemDto{" + "dateCreation=" + dateCreation + ", companyCreationName=" + companyCreationName + ", companyCreationActive=" + companyCreationActive + '}';
    }

    @Override
    public int hashCode() {
        int hash = 7;
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final CompanyCreationStatItemDto other = (CompanyCreationStatItemDto) obj;
        if (this.companyCreationActive != other.isCompanyCreationActive()) {
            return false;
        }
        if (!Objects.equals(this.companyCreationName, other.getCompanyCreationName())) {
            return false;
        }
        return Objects.equals(this.dateCreation, other.getDateCreation());
    }
    
}
