package org.centrale.hceres.dto.stat.utils;

import java.util.Objects;

import java.io.Serializable;
import java.util.List;

public class StatSummaryDto implements Serializable {
    private List<? extends StatItemDto> items;

    public List<? extends StatItemDto> getItems() {
        return this.items;
    }
    public void setItems(List<? extends StatItemDto> items) {
        this.items = items;
    }
    @Override
    public String toString() {
        return "StatSummaryDto{" + "items=" + items +  "}";
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof StatSummaryDto)) return false;
        StatSummaryDto that = (StatSummaryDto) o;
        return Objects.equals(this.items, that.items);
    }
    @Override    public int hashCode() {        return Objects.hash(this.items);    }

}