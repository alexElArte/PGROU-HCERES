/* --------------------------------------------------------------------------------
 * Projet HCERES
 * 
 * Gestion de données pour l'HCERES
 * 
 * Ecole Centrale Nantes - laboratoire CRTI
 * Avril 2021
 * L LETERTRE, S LIMOUX, JY MARTIN
 * -------------------------------------------------------------------------------- */
package org.centrale.hceres.items;
import lombok.*;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 *
 * @author kwyhr
 */
@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class PublicationStatisticsPK implements Serializable {

    @Basic(optional = false)
    @NotNull
    @Column(name = "team_id")
    private int teamId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "publication_statistics_year")
    private int publicationStatisticsYear;

    public int getTeamId() {
        return teamId;
    }

    public void setTeamId(int teamId) {
        this.teamId = teamId;
    }

    public int getPublicationStatisticsYear() {
        return publicationStatisticsYear;
    }

    public void setPublicationStatisticsYear(int publicationStatisticsYear) {
        this.publicationStatisticsYear = publicationStatisticsYear;
    }
    
}