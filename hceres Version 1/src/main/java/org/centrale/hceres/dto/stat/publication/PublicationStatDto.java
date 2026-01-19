package org.centrale.hceres.dto.stat.publication;

import java.util.Objects;

import org.centrale.hceres.dto.stat.utils.ActivityStatDto;
import org.centrale.hceres.items.Activity;

import java.math.BigDecimal;
import java.util.Date;

public class PublicationStatDto extends ActivityStatDto {
    private Date publicationDate;
    private Integer publicationTypeId;
    private BigDecimal impactFactor;

    @Override
    public void fillDataFromActivity(Activity activity) {
        super.fillDataFromActivity(activity);
        this.publicationDate = activity.getPublication().getPublicationDate();
        this.publicationTypeId = activity.getPublication().getPublicationTypeId();
        this.impactFactor = activity.getPublication().getImpactFactor();
    }

    public Date getPublicationDate() {
        return this.publicationDate;
    }
    public void setPublicationDate(Date publicationDate) {
        this.publicationDate = publicationDate;
    }
    public Integer getPublicationTypeId() {
        return this.publicationTypeId;
    }
    public void setPublicationTypeId(Integer publicationTypeId) {
        this.publicationTypeId = publicationTypeId;
    }
    public BigDecimal getImpactFactor() {
        return this.impactFactor;
    }
    public void setImpactFactor(BigDecimal impactFactor) {
        this.impactFactor = impactFactor;
    }
    @Override
    public String toString() {
        return "PublicationStatDto{" + "publicationDate= " + publicationDate + ", publicationTypeId= " + publicationTypeId + ", impactFactor= " + impactFactor + "}";
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PublicationStatDto)) return false;
        if (!super.equals(o)) return false;
        PublicationStatDto that = (PublicationStatDto) o;
        return Objects.equals(this.publicationDate, that.publicationDate) && Objects.equals(this.publicationTypeId, that.publicationTypeId) && Objects.equals(this.impactFactor, that.impactFactor);
    }
    @Override    public int hashCode() {        return Objects.hash(super.hashCode(), this.publicationDate, this.publicationTypeId, this.impactFactor);    }

}