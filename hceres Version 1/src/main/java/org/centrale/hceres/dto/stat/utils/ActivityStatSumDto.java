package org.centrale.hceres.dto.stat.utils;

import java.util.Objects;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ActivityStatSumDto extends StatSummaryDto {
    
    private Integer idActivity;
    private String name;
    private String description;
    private LocalDate date;
    private Integer participantCount;
    private Double duration; // en heures, par ex.
    private Double score; // ou note de performance
 
    
    public Integer getIdActivity() {
        return idActivity;
    }

    public void setIdActivity(Integer idActivity) {
        this.idActivity = idActivity;
    } 

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getParticipantCount() {
        return participantCount;
    }

    public void setParticipantCount(Integer participantCount) {
        this.participantCount = participantCount;
    }

    public Double getDuration() {
        return duration;
    }

    public void setDuration(Double duration) {
        this.duration = duration;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }
    
    

    @Override
    public String toString() {
        return "ActivityStatSumDto{" + "idActivity=" + idActivity + ", name=" + name +  ", description=" + description +  ", date=" + date +  ", participantCount=" + participantCount + ", duration=" + duration +  ", score=" + score + "}";
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ActivityStatSumDto)) return false;
        if (!super.equals(o)) return false;
        ActivityStatSumDto that = (ActivityStatSumDto) o;
        return Objects.equals(this.idActivity, that.idActivity) && Objects.equals(this.name, that.name) && Objects.equals(this.description, that.description) && Objects.equals(this.date, that.date) && Objects.equals(this.participantCount, that.participantCount) && Objects.equals(this.duration, that.duration) && Objects.equals(this.score, that.score);
    }
    @Override    public int hashCode() {        return Objects.hash(super.hashCode(), this.idActivity, this.name, this.description, this.date, this.participantCount, this.duration, this.score);    }

}