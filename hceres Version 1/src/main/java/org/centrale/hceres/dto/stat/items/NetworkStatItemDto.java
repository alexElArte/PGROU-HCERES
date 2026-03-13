/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.centrale.hceres.dto.stat.items;

import java.util.Date;
import java.util.Objects;
import org.centrale.hceres.dto.stat.utils.ActivityStatDto;
import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.Network;

/**
 * DTO used for network statistics.
 */
public class NetworkStatItemDto extends ActivityStatDto {
    private Date startDate;
    private String nameNetwork;
    private Boolean activeNetwork;
    private String associatedFunding;
    private Integer nbResultingPublications;
    private String refResultingPublications;
    private String umrCoordinated;
    private String agreementSigned;

    @Override
    public void fillDataFromActivity(Activity activity) {
        super.fillDataFromActivity(activity);

        Network network = activity.getNetwork();
        if (network != null) {
            this.startDate = network.getStartDate();
            this.nameNetwork = network.getNameNetwork();
            this.activeNetwork = network.getActiveNetwork();
            this.associatedFunding = network.getAssociatedFunding();
            this.nbResultingPublications = network.getNbResultingPublications();
            this.refResultingPublications = network.getRefResultingPublications();
            this.umrCoordinated = network.getUmrCoordinated();
            this.agreementSigned = network.getAgreementSigned();
        }
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public String getNameNetwork() {
        return nameNetwork;
    }

    public void setNameNetwork(String nameNetwork) {
        this.nameNetwork = nameNetwork;
    }

    public Boolean getActiveNetwork() {
        return activeNetwork;
    }

    public void setActiveNetwork(Boolean activeNetwork) {
        this.activeNetwork = activeNetwork;
    }

    public String getAssociatedFunding() {
        return associatedFunding;
    }

    public void setAssociatedFunding(String associatedFunding) {
        this.associatedFunding = associatedFunding;
    }

    public Integer getNbResultingPublications() {
        return nbResultingPublications;
    }

    public void setNbResultingPublications(Integer nbResultingPublications) {
        this.nbResultingPublications = nbResultingPublications;
    }

    public String getRefResultingPublications() {
        return refResultingPublications;
    }

    public void setRefResultingPublications(String refResultingPublications) {
        this.refResultingPublications = refResultingPublications;
    }

    public String getUmrCoordinated() {
        return umrCoordinated;
    }

    public void setUmrCoordinated(String umrCoordinated) {
        this.umrCoordinated = umrCoordinated;
    }

    public String getAgreementSigned() {
        return agreementSigned;
    }

    public void setAgreementSigned(String agreementSigned) {
        this.agreementSigned = agreementSigned;
    }

    @Override
    public String toString() {
        return "NetworkStatItemDto{" +
                "startDate=" + startDate +
                ", nameNetwork='" + nameNetwork + '\'' +
                ", activeNetwork=" + activeNetwork +
                ", associatedFunding='" + associatedFunding + '\'' +
                ", nbResultingPublications=" + nbResultingPublications +
                ", refResultingPublications='" + refResultingPublications + '\'' +
                ", umrCoordinated='" + umrCoordinated + '\'' +
                ", agreementSigned='" + agreementSigned + '\'' +
                '}';
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
        final NetworkStatItemDto other = (NetworkStatItemDto) obj;
        if (!Objects.equals(this.nameNetwork, other.nameNetwork)) {
            return false;
        }
        if (!Objects.equals(this.activeNetwork, other.activeNetwork)) {
            return false;
        }
        if (!Objects.equals(this.associatedFunding, other.associatedFunding)) {
            return false;
        }
        if (!Objects.equals(this.refResultingPublications, other.refResultingPublications)) {
            return false;
        }
        if (!Objects.equals(this.umrCoordinated, other.umrCoordinated)) {
            return false;
        }
        if (!Objects.equals(this.agreementSigned, other.agreementSigned)) {
            return false;
        }
        if (!Objects.equals(this.startDate, other.startDate)) {
            return false;
        }
        if (!Objects.equals(this.nbResultingPublications, other.nbResultingPublications)) {
            return false;
        }
        return true;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 97 * hash + Objects.hashCode(this.startDate);
        hash = 97 * hash + Objects.hashCode(this.nameNetwork);
        hash = 97 * hash + Objects.hashCode(this.activeNetwork);
        hash = 97 * hash + Objects.hashCode(this.associatedFunding);
        hash = 97 * hash + Objects.hashCode(this.nbResultingPublications);
        hash = 97 * hash + Objects.hashCode(this.refResultingPublications);
        hash = 97 * hash + Objects.hashCode(this.umrCoordinated);
        hash = 97 * hash + Objects.hashCode(this.agreementSigned);
        return hash;
    }
}
