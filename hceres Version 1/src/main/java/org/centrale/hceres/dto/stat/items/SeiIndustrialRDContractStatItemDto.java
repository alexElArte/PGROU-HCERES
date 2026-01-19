package org.centrale.hceres.dto.stat.items;

import java.util.Date;
import java.util.Objects;

import org.centrale.hceres.dto.stat.utils.ActivityStatDto;
import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.SeiIndustrialRDContract;

public class SeiIndustrialRDContractStatItemDto extends ActivityStatDto {

    private Date startDate;
    private String nameCompanyInvolved;
    private String projectTitle;
    private Integer agreementAmount;
    private Date endDate;
    private String associatedPubliRef;

    @Override
    public void fillDataFromActivity(Activity activity) {
        super.fillDataFromActivity(activity);

        SeiIndustrialRDContract contract = activity.getSeiIndustrialRDContract();
        if (contract != null) {
            this.startDate = contract.getStartDate();
            this.nameCompanyInvolved = contract.getNameCompanyInvolved();
            this.projectTitle = contract.getProjectTitle();
            this.agreementAmount = contract.getAgreementAmount();
            this.endDate = contract.getEndDate();
            this.associatedPubliRef = contract.getAssociatedPubliRef();
        }
    }

    // ---------- Getters / Setters ----------

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public String getNameCompanyInvolved() {
        return nameCompanyInvolved;
    }

    public void setNameCompanyInvolved(String nameCompanyInvolved) {
        this.nameCompanyInvolved = nameCompanyInvolved;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }

    public Integer getAgreementAmount() {
        return agreementAmount;
    }

    public void setAgreementAmount(Integer agreementAmount) {
        this.agreementAmount = agreementAmount;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getAssociatedPubliRef() {
        return associatedPubliRef;
    }

    public void setAssociatedPubliRef(String associatedPubliRef) {
        this.associatedPubliRef = associatedPubliRef;
    }

    // ---------- toString ----------

    @Override
    public String toString() {
        return "SeiIndustrialRDContractStatItemDto{" +
                "startDate=" + startDate +
                ", nameCompanyInvolved='" + nameCompanyInvolved + '\'' +
                ", projectTitle='" + projectTitle + '\'' +
                ", agreementAmount=" + agreementAmount +
                ", endDate=" + endDate +
                ", associatedPubliRef='" + associatedPubliRef + '\'' +
                "} " + super.toString();
    }

    // ---------- equals / hashCode ----------

    @Override
    public int hashCode() {
        return Objects.hash(
                super.hashCode(),
                startDate,
                nameCompanyInvolved,
                projectTitle,
                agreementAmount,
                endDate,
                associatedPubliRef
        );
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof SeiIndustrialRDContractStatItemDto)) return false;
        if (!super.equals(obj)) return false;

        SeiIndustrialRDContractStatItemDto other = (SeiIndustrialRDContractStatItemDto) obj;
        return Objects.equals(startDate, other.startDate) &&
                Objects.equals(nameCompanyInvolved, other.nameCompanyInvolved) &&
                Objects.equals(projectTitle, other.projectTitle) &&
                Objects.equals(agreementAmount, other.agreementAmount) &&
                Objects.equals(endDate, other.endDate) &&
                Objects.equals(associatedPubliRef, other.associatedPubliRef);
    }
}
