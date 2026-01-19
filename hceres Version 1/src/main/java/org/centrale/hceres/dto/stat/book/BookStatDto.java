package org.centrale.hceres.dto.stat.book;

import java.util.Objects;

import org.centrale.hceres.dto.stat.utils.ActivityStatDto;
import org.centrale.hceres.items.Activity;

import java.util.Date;

public class BookStatDto extends ActivityStatDto {
    private Date publicationDate;

    @Override
    public void fillDataFromActivity(Activity activity) {
        super.fillDataFromActivity(activity);
        this.publicationDate = activity.getBook().getPublicationDate();
    }

    public Date getPublicationDate() {
        return this.publicationDate;
    }
    public void setPublicationDate(Date publicationDate) {
        this.publicationDate = publicationDate;
    }
    @Override
    public String toString() {
        return "BookStatDto{" + "publicationDate= " + publicationDate + "}" ;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BookStatDto)) return false;
        if (!super.equals(o)) return false;
        BookStatDto that = (BookStatDto) o;
        return Objects.equals(this.publicationDate, that.publicationDate);
    }
    @Override    public int hashCode() {return Objects.hash(super.hashCode(), this.publicationDate);    }

}