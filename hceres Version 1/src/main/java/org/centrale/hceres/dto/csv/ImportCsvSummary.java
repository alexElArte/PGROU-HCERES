package org.centrale.hceres.dto.csv;

import lombok.Data;
import org.centrale.hceres.dto.csv.utils.SupportedCsvTemplate;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;

@Data
public class ImportCsvSummary implements Serializable {
    private HashMap<String, ImportCsvMetric> entityToCsvMetrics;
    private HashMap<String, List<ImportCsvError>> entityToCsvErrors;

    public ImportCsvSummary() {
        entityToCsvMetrics = new HashMap<>();
        entityToCsvErrors = new HashMap<>();
    }

    public HashMap<String, ImportCsvMetric> getEntityToCsvMetrics() {
        return entityToCsvMetrics;
    }

    public void setEntityToCsvMetrics(HashMap<String, ImportCsvMetric> entityToCsvMetrics) {
        this.entityToCsvMetrics = entityToCsvMetrics;
    }

    public HashMap<String, List<ImportCsvError>> getEntityToCsvErrors() {
        return entityToCsvErrors;
    }

    public void setEntityToCsvErrors(HashMap<String, List<ImportCsvError>> entityToCsvErrors) {
        this.entityToCsvErrors = entityToCsvErrors;
    }
    
    public void updateActivityMetric() {
        SupportedCsvTemplate[] templates = SupportedCsvTemplate.values();
        ImportCsvMetric activityMetric = this.getEntityToCsvMetrics().get(SupportedCsvTemplate.ACTIVITY.toString());
        for (SupportedCsvTemplate template : templates) {
            if (template.getDependencies().contains(SupportedCsvTemplate.ACTIVITY)) {
                ImportCsvMetric metric = this.getEntityToCsvMetrics().get(template.toString());
                if (metric != null) {
                    activityMetric.setTotalInDatabase(activityMetric.getTotalInDatabase() + metric.getTotalInDatabase());
                    activityMetric.setTotalMergedWithDatabase(activityMetric.getTotalMergedWithDatabase() + metric.getTotalMergedWithDatabase());
                    activityMetric.setTotalInserted(activityMetric.getTotalInserted() + metric.getTotalInserted());
                }
            }
        }

        if (activityMetric.getTotalInCsv() > 0) {
            this.getEntityToCsvMetrics().put(SupportedCsvTemplate.ACTIVITY.toString(), activityMetric);
        }
    }
}
