package org.centrale.hceres.items;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequestDDO {
    
    Integer researcherId ;
    String ScientificExpertiseTypeName ;
    String ScientificExpertiseDescription ;
    Date ScientificExpertiseStartDate ;
    Date ScientificExpertiseEndDate;

    public Integer getResearcherId() {
        return researcherId;
    }

    public void setResearcherId(Integer researcherId) {
        this.researcherId = researcherId;
    }

    public String getScientificExpertiseTypeName() {
        return ScientificExpertiseTypeName;
    }

    public void setScientificExpertiseTypeName(String ScientificExpertiseTypeName) {
        this.ScientificExpertiseTypeName = ScientificExpertiseTypeName;
    }

    public String getScientificExpertiseDescription() {
        return ScientificExpertiseDescription;
    }

    public void setScientificExpertiseDescription(String ScientificExpertiseDescription) {
        this.ScientificExpertiseDescription = ScientificExpertiseDescription;
    }

    public Date getScientificExpertiseStartDate() {
        return ScientificExpertiseStartDate;
    }

    public void setScientificExpertiseStartDate(Date ScientificExpertiseStartDate) {
        this.ScientificExpertiseStartDate = ScientificExpertiseStartDate;
    }

    public Date getScientificExpertiseEndDate() {
        return ScientificExpertiseEndDate;
    }

    public void setScientificExpertiseEndDate(Date ScientificExpertiseEndDate) {
        this.ScientificExpertiseEndDate = ScientificExpertiseEndDate;
    }
    
    
}
