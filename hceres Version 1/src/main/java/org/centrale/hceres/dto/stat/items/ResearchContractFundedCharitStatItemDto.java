package org.centrale.hceres.dto.stat.items;

import java.util.Date;
import java.util.Objects;

import org.centrale.hceres.dto.stat.utils.ActivityStatDto;
import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.ResearchContractFundedCharit;

public class ResearchContractFundedCharitStatItemDto extends ActivityStatDto {

    private Date dateContractAward;
    private String fundingInstitution;
    private String projectTitle;
    private Integer startYear;
    private Integer endYear;
    private Integer grantAmount;
    private Integer typeResearchContractId;

    @Override
    public void fillDataFromActivity(Activity activity) {
        super.fillDataFromActivity(activity);

        ResearchContractFundedCharit contract = activity.getResearchContractFundedCharit();

        if (contract != null) {
            this.dateContractAward = contract.getDateContractAward();
            this.fundingInstitution = contract.getFundingInstitution();
            this.projectTitle = contract.getProjectTitle();
            this.startYear = contract.getStartYear();
            this.endYear = contract.getEndYear();
            this.grantAmount = contract.getGrantAmount();
            this.typeResearchContractId = contract.getTypeResearchContractId();
        }
    }

    // ---- Getters & setters ----
    public Date getDateContractAward() { return dateContractAward; }
    public void setDateContractAward(Date dateContractAward) { this.dateContractAward = dateContractAward; }

    public String getFundingInstitution() { return fundingInstitution; }
    public void setFundingInstitution(String fundingInstitution) { this.fundingInstitution = fundingInstitution; }

    public String getProjectTitle() { return projectTitle; }
    public void setProjectTitle(String projectTitle) { this.projectTitle = projectTitle; }

    public Integer getStartYear() { return startYear; }
    public void setStartYear(Integer startYear) { this.startYear = startYear; }

    public Integer getEndYear() { return endYear; }
    public void setEndYear(Integer endYear) { this.endYear = endYear; }

    public Integer getGrantAmount() { return grantAmount; }
    public void setGrantAmount(Integer grantAmount) { this.grantAmount = grantAmount; }

    public Integer getTypeResearchContractId() { return typeResearchContractId; }
    public void setTypeResearchContractId(Integer typeResearchContractId) { this.typeResearchContractId = typeResearchContractId; }

    @Override
    public String toString() {
        return "ResearchContractFundedCharitStatDto{" +
                "dateContractAward=" + dateContractAward +
                ", fundingInstitution='" + fundingInstitution + '\'' +
                ", projectTitle='" + projectTitle + '\'' +
                ", startYear=" + startYear +
                ", endYear=" + endYear +
                ", grantAmount=" + grantAmount +
                ", typeResearchContractId=" + typeResearchContractId +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ResearchContractFundedCharitStatItemDto)) return false;
        if (!super.equals(o)) return false;

        ResearchContractFundedCharitStatItemDto that = (ResearchContractFundedCharitStatItemDto) o;

        return Objects.equals(dateContractAward, that.dateContractAward) &&
                Objects.equals(fundingInstitution, that.fundingInstitution) &&
                Objects.equals(projectTitle, that.projectTitle) &&
                Objects.equals(startYear, that.startYear) &&
                Objects.equals(endYear, that.endYear) &&
                Objects.equals(grantAmount, that.grantAmount) &&
                Objects.equals(typeResearchContractId, that.typeResearchContractId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
                super.hashCode(),
                dateContractAward,
                fundingInstitution,
                projectTitle,
                startYear,
                endYear,
                grantAmount,
                typeResearchContractId
        );
    }
}
