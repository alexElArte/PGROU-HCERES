package org.centrale.hceres.dto.stat.items;

import java.util.Date;
import java.util.Objects;

import org.centrale.hceres.dto.stat.utils.ActivityStatDto;
import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.TrainingThesis;

public class TrainingThesisStatItemDto extends ActivityStatDto {

    private Date thesisStart;
    private int thesisTypeId;
    private String thesisMainFunding;
    private Date thesisDefenseDate;
    private int thesisDuration;
    private String thesisFutur;
    private Integer thesisNumberArticles;
    private Integer thesisNumberArticlesFirstSecondPosition;
    private String thesisArticlesFirstSecondPositionReferences;

    @Override
    public void fillDataFromActivity(Activity activity) {
        super.fillDataFromActivity(activity);

        TrainingThesis trainingThesis = activity.getTrainingThesis();
        if (trainingThesis != null) {
            this.thesisStart = trainingThesis.getThesisStart();
            this.thesisTypeId = trainingThesis.getThesisTypeId();
            this.thesisMainFunding = trainingThesis.getThesisMainFunding();
            this.thesisDefenseDate = trainingThesis.getThesisDefenseDate();
            this.thesisDuration = trainingThesis.getThesisDuration();
            this.thesisFutur = trainingThesis.getThesisFutur();
            this.thesisNumberArticles = trainingThesis.getThesisNumberArticles();
            this.thesisNumberArticlesFirstSecondPosition =
                    trainingThesis.getThesisNumberArticlesFirstSecondPosition();
            this.thesisArticlesFirstSecondPositionReferences =
                    trainingThesis.getThesisArticlesFirstSecondPositionReferences();
        }
    }

    public Date getThesisStart() {
        return thesisStart;
    }

    public void setThesisStart(Date thesisStart) {
        this.thesisStart = thesisStart;
    }

    public int getThesisTypeId() {
        return thesisTypeId;
    }

    public void setThesisTypeId(int thesisTypeId) {
        this.thesisTypeId = thesisTypeId;
    }

    public String getThesisMainFunding() {
        return thesisMainFunding;
    }

    public void setThesisMainFunding(String thesisMainFunding) {
        this.thesisMainFunding = thesisMainFunding;
    }

    public Date getThesisDefenseDate() {
        return thesisDefenseDate;
    }

    public void setThesisDefenseDate(Date thesisDefenseDate) {
        this.thesisDefenseDate = thesisDefenseDate;
    }

    public int getThesisDuration() {
        return thesisDuration;
    }

    public void setThesisDuration(int thesisDuration) {
        this.thesisDuration = thesisDuration;
    }

    public String getThesisFutur() {
        return thesisFutur;
    }

    public void setThesisFutur(String thesisFutur) {
        this.thesisFutur = thesisFutur;
    }

    public Integer getThesisNumberArticles() {
        return thesisNumberArticles;
    }

    public void setThesisNumberArticles(Integer thesisNumberArticles) {
        this.thesisNumberArticles = thesisNumberArticles;
    }

    public Integer getThesisNumberArticlesFirstSecondPosition() {
        return thesisNumberArticlesFirstSecondPosition;
    }

    public void setThesisNumberArticlesFirstSecondPosition(Integer thesisNumberArticlesFirstSecondPosition) {
        this.thesisNumberArticlesFirstSecondPosition = thesisNumberArticlesFirstSecondPosition;
    }

    public String getThesisArticlesFirstSecondPositionReferences() {
        return thesisArticlesFirstSecondPositionReferences;
    }

    public void setThesisArticlesFirstSecondPositionReferences(String thesisArticlesFirstSecondPositionReferences) {
        this.thesisArticlesFirstSecondPositionReferences = thesisArticlesFirstSecondPositionReferences;
    }

    @Override
    public String toString() {
        return "TrainingThesisStatItemDto{" +
                "thesisStart=" + thesisStart +
                ", thesisTypeId=" + thesisTypeId +
                ", thesisMainFunding='" + thesisMainFunding + '\'' +
                ", thesisDefenseDate=" + thesisDefenseDate +
                ", thesisDuration=" + thesisDuration +
                ", thesisFutur='" + thesisFutur + '\'' +
                ", thesisNumberArticles=" + thesisNumberArticles +
                ", thesisNumberArticlesFirstSecondPosition=" + thesisNumberArticlesFirstSecondPosition +
                ", thesisArticlesFirstSecondPositionReferences='" + thesisArticlesFirstSecondPositionReferences + '\'' +
                "} " + super.toString();
    }

    @Override
    public int hashCode() {
        return Objects.hash(
                super.hashCode(),
                thesisStart,
                thesisTypeId,
                thesisMainFunding,
                thesisDefenseDate,
                thesisDuration,
                thesisFutur,
                thesisNumberArticles,
                thesisNumberArticlesFirstSecondPosition,
                thesisArticlesFirstSecondPositionReferences
        );
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof TrainingThesisStatItemDto)) return false;
        if (!super.equals(obj)) return false;
        TrainingThesisStatItemDto other = (TrainingThesisStatItemDto) obj;
        return thesisTypeId == other.thesisTypeId &&
                thesisDuration == other.thesisDuration &&
                Objects.equals(thesisStart, other.thesisStart) &&
                Objects.equals(thesisMainFunding, other.thesisMainFunding) &&
                Objects.equals(thesisDefenseDate, other.thesisDefenseDate) &&
                Objects.equals(thesisFutur, other.thesisFutur) &&
                Objects.equals(thesisNumberArticles, other.thesisNumberArticles) &&
                Objects.equals(thesisNumberArticlesFirstSecondPosition,
                        other.thesisNumberArticlesFirstSecondPosition) &&
                Objects.equals(thesisArticlesFirstSecondPositionReferences,
                        other.thesisArticlesFirstSecondPositionReferences);
    }
}
