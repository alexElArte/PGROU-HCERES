package org.centrale.hceres.dto.stat.utils;

import java.util.Objects;

import org.centrale.hceres.items.Activity;

import java.io.Serializable;
import java.util.SortedSet;
import java.util.TreeSet;

public class ActivityStatDto implements Serializable, StatItemDto {
    private int idActivity;
    private SortedSet<Integer> teamIds;

    public ActivityStatDto() {
        this.teamIds = new TreeSet<>();
    }

    public void fillDataFromActivity(Activity activity) {
        this.idActivity = activity.getIdActivity();
        activity.getResearcherList().forEach(researcher ->
                researcher.getBelongsTeamList().forEach(belongsTeams ->
                        this.teamIds.add(belongsTeams.getTeamId())));
    }

    public int getIdActivity() {
        return this.idActivity;
    }
    public void setIdActivity(int idActivity) {
        this.idActivity = idActivity;
    }
    public SortedSet<Integer> getTeamIds() {
        return this.teamIds;
    }
    public void setTeamIds(SortedSet<Integer> teamIds) {
        this.teamIds = teamIds;
    }
    @Override
    public String toString() {
        return "ActivityStatDto{" + "idActivity=" + idActivity + ", teamIds=" + teamIds +"}";
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ActivityStatDto)) return false;
        ActivityStatDto that = (ActivityStatDto) o;
        return Objects.equals(this.idActivity, that.idActivity) && Objects.equals(this.teamIds, that.teamIds);
    }
    @Override    public int hashCode() {        return Objects.hash(this.idActivity, this.teamIds);    }

}