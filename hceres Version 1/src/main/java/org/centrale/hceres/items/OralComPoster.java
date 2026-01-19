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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Date;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.persistence.CascadeType;
import com.fasterxml.jackson.annotation.JsonIgnore;


/**
 *
 * @author kwyhr
 */
@Entity
@Table(name = "oral_communication_poster")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OralComPoster implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_activity")
    private Integer idActivity;

    @JsonIgnore
    @JoinColumn(name = "id_activity")
    @MapsId
    @OneToOne(cascade = CascadeType.ALL)
    private Activity activity;

    
    @Size(max = 512)
    @Column(name = "oral_communication_title")
    private String oralComPosterTitle;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "oral_communication_date")
    private Date oralComPosterDate;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2147483647)
    @Column(name = "authors")
    private String authors;


    @JoinColumn(name = "meeting_id", referencedColumnName = "meeting_id")
    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    private Meeting meeting;


    @Column(name = "type_oral_com_poster_id")
    private Integer typeOralComPosterId;

    @JsonIgnore
    @JoinColumn(
            name = "type_oral_com_poster_id",
            referencedColumnName = "type_oral_com_poster_id",
            insertable = false,
            updatable = false
    )
    @ManyToOne
    private TypeOralComPoster typeOralComPoster;

    public Integer getIdActivity() {
        return idActivity;
    }

    public void setIdActivity(Integer idActivity) {
        this.idActivity = idActivity;
    }

    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }

    public String getOralComPosterTitle() {
        return oralComPosterTitle;
    }

    public void setOralComPosterTitle(String oralComPosterTitle) {
        this.oralComPosterTitle = oralComPosterTitle;
    }

    public Date getOralComPosterDate() {
        return oralComPosterDate;
    }

    public void setOralComPosterDate(Date oralComPosterDate) {
        this.oralComPosterDate = oralComPosterDate;
    }

    public String getAuthors() {
        return authors;
    }

    public void setAuthors(String authors) {
        this.authors = authors;
    }

    public Meeting getMeeting() {
        return meeting;
    }

    public void setMeeting(Meeting meeting) {
        this.meeting = meeting;
    }

    public Integer getTypeOralComPosterId() {
        return typeOralComPosterId;
    }

    public void setTypeOralComPosterId(Integer typeOralComPosterId) {
        this.typeOralComPosterId = typeOralComPosterId;
    }

    public TypeOralComPoster getTypeOralComPoster() {
        return typeOralComPoster;
    }

    public void setTypeOralComPoster(TypeOralComPoster typeOralComPoster) {
        this.typeOralComPoster = typeOralComPoster;
    }
    
    
}