package org.centrale.hceres.dto.stat.publication;

import java.util.Objects;

import org.centrale.hceres.dto.stat.utils.ActivityStatSumDto;
import org.centrale.hceres.items.PublicationType;

import java.util.List;

public class PublicationStatSumDto extends ActivityStatSumDto {
    private List<PublicationType> publicationTypes;

    public List<PublicationType> getPublicationTypes() {
        return this.publicationTypes;
    }
    public void setPublicationTypes(List<PublicationType> publicationTypes) {
        this.publicationTypes = publicationTypes;
    }
    @Override
    public String toString() {
        return "PublicationStatSumDto{" + "publicationTypes= " + publicationTypes + " }";
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PublicationStatSumDto)) return false;
        if (!super.equals(o)) return false;
        PublicationStatSumDto that = (PublicationStatSumDto) o;
        return Objects.equals(this.publicationTypes, that.publicationTypes);
    }
    @Override    public int hashCode() {        return Objects.hash(super.hashCode(), this.publicationTypes);    }

}