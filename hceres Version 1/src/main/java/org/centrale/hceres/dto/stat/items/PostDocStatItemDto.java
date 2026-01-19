/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.centrale.hceres.dto.stat.items;

import java.util.Date;
import java.util.Objects;
import org.centrale.hceres.dto.stat.utils.ActivityStatDto;
import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.PostDoc;

/**
 *
 * @author Max
 */
public class PostDocStatItemDto extends ActivityStatDto{
    private String namePostDoc;
    private String nameSupervisor;
    private Date arrivalDate;
    private Date departureDate;
    private Integer duration;
    private String nationality;
    private String originalLab;
    private String associatedFunding;
    private String associatedPubliRef;
    
    
    @Override
    public void fillDataFromActivity(Activity activity) {
        super.fillDataFromActivity(activity);

        PostDoc postDoc = activity.getPostDoc();

        if (postDoc != null) {
            this.arrivalDate = postDoc.getArrivalDate();
            this.departureDate = postDoc.getDepartureDate();
            this.duration = postDoc.getDuration();
            this.nationality = postDoc.getNationality();
            this.originalLab = postDoc.getOriginalLab();
            this.associatedFunding = postDoc.getAssociatedFunding();
            this.associatedPubliRef = postDoc.getAssociatedPubliRef();
            this.namePostDoc = postDoc.getNamePostDoc();
            this.nameSupervisor = postDoc.getNameSupervisor();
        }
    }

    public String getNamePostDoc() {
        return namePostDoc;
    }

    public void setNamePostDoc(String namePostDoc) {
        this.namePostDoc = namePostDoc;
    }

    public String getNameSupervisor() {
        return nameSupervisor;
    }

    public void setNameSupervisor(String nameSupervisor) {
        this.nameSupervisor = nameSupervisor;
    }

    public Date getArrivalDate() {
        return arrivalDate;
    }

    public void setArrivalDate(Date arrivalDate) {
        this.arrivalDate = arrivalDate;
    }

    public Date getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(Date departureDate) {
        this.departureDate = departureDate;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getOriginalLab() {
        return originalLab;
    }

    public void setOriginalLab(String originalLab) {
        this.originalLab = originalLab;
    }

    public String getAssociatedFunding() {
        return associatedFunding;
    }

    public void setAssociatedFunding(String associatedFunding) {
        this.associatedFunding = associatedFunding;
    }

    public String getAssociatedPubliRef() {
        return associatedPubliRef;
    }

    public void setAssociatedPubliRef(String associatedPubliRef) {
        this.associatedPubliRef = associatedPubliRef;
    }

    @Override
    public int hashCode() {
        int hash = 5;
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
        final PostDocStatItemDto other = (PostDocStatItemDto) obj;
        if (!Objects.equals(this.namePostDoc, other.namePostDoc)) {
            return false;
        }
        if (!Objects.equals(this.nameSupervisor, other.nameSupervisor)) {
            return false;
        }
        if (!Objects.equals(this.nationality, other.nationality)) {
            return false;
        }
        if (!Objects.equals(this.originalLab, other.originalLab)) {
            return false;
        }
        if (!Objects.equals(this.associatedFunding, other.associatedFunding)) {
            return false;
        }
        if (!Objects.equals(this.associatedPubliRef, other.associatedPubliRef)) {
            return false;
        }
        if (!Objects.equals(this.arrivalDate, other.arrivalDate)) {
            return false;
        }
        if (!Objects.equals(this.departureDate, other.departureDate)) {
            return false;
        }
        return Objects.equals(this.duration, other.duration);
    }

    @Override
    public String toString() {
        return "PostDocStatItemDto{" + "namePostDoc=" + namePostDoc + ", nameSupervisor=" + nameSupervisor + ", arrivalDate=" + arrivalDate + ", departureDate=" + departureDate + ", duration=" + duration + ", nationality=" + nationality + ", originalLab=" + originalLab + ", associatedFunding=" + associatedFunding + ", associatedPubliRef=" + associatedPubliRef + '}';
    }
    
    
    
}
