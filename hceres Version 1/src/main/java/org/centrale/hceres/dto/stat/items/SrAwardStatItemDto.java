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
import org.centrale.hceres.items.SrAward;


/**
 *
 * @author Max
 */
public class SrAwardStatItemDto extends ActivityStatDto{
    //Description pas forcément utile.
    
    private String awardeeName;
    private Date awardDate;
    private String description;

    
    @Override
    public void fillDataFromActivity(Activity activity) {
        super.fillDataFromActivity(activity);

        SrAward srAwards = activity.getSrAward();

        if (srAwards != null) {
            this.awardeeName = srAwards.getAwardeeName();
            this.awardDate = srAwards.getAwardDate();
            this.description = srAwards.getDescription();
        }
    }

    @Override
    public int hashCode() {
        int hash = 3;
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
        final SrAwardStatItemDto other = (SrAwardStatItemDto) obj;
        if (!Objects.equals(this.awardeeName, other.awardeeName)) {
            return false;
        }
        if (!Objects.equals(this.description, other.description)) {
            return false;
        }
        return Objects.equals(this.awardDate, other.awardDate);
    }

    
    public String getAwardeeName() {
        return awardeeName;
    }

    public void setAwardeeName(String awardeeName) {
        this.awardeeName = awardeeName;
    }

    public Date getAwardDate() {
        return awardDate;
    }

    public void setAwardDate(Date awardDate) {
        this.awardDate = awardDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "SrAwardStatItemDto{" + "awardeeName=" + awardeeName + ", awardDate=" + awardDate + ", description=" + description + '}';
    }

    
    
    
}
