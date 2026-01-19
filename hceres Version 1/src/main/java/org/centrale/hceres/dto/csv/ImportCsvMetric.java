package org.centrale.hceres.dto.csv;

import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
public class ImportCsvMetric implements Serializable {

    // *************** Parsing CSV ***************
    private int totalInCsv;

    private int totalLineErrors;
    // a line can have multiple errors
    private int totalErrors;

    // line with same merging keys are overwritten
    private int totalDuplicatesInCsv;
    private List<List<Integer>> duplicateLines;


    // *************** INSERTION ***************
    private int totalInDatabase;
    // the records that are already in the database and skipped
    private int totalMergedWithDatabase;
    private int totalInserted;

    public ImportCsvMetric() {
        this.duplicateLines = new ArrayList<>();
    }

    public int getTotalInCsv() {
        return totalInCsv;
    }

    public void setTotalInCsv(int totalInCsv) {
        this.totalInCsv = totalInCsv;
    }

    public int getTotalLineErrors() {
        return totalLineErrors;
    }

    public void setTotalLineErrors(int totalLineErrors) {
        this.totalLineErrors = totalLineErrors;
    }

    public int getTotalErrors() {
        return totalErrors;
    }

    public void setTotalErrors(int totalErrors) {
        this.totalErrors = totalErrors;
    }

    public int getTotalDuplicatesInCsv() {
        return totalDuplicatesInCsv;
    }

    public void setTotalDuplicatesInCsv(int totalDuplicatesInCsv) {
        this.totalDuplicatesInCsv = totalDuplicatesInCsv;
    }

    public List<List<Integer>> getDuplicateLines() {
        return duplicateLines;
    }

    public void setDuplicateLines(List<List<Integer>> duplicateLines) {
        this.duplicateLines = duplicateLines;
    }

    public int getTotalInDatabase() {
        return totalInDatabase;
    }

    public void setTotalInDatabase(int totalInDatabase) {
        this.totalInDatabase = totalInDatabase;
    }

    public int getTotalMergedWithDatabase() {
        return totalMergedWithDatabase;
    }

    public void setTotalMergedWithDatabase(int totalMergedWithDatabase) {
        this.totalMergedWithDatabase = totalMergedWithDatabase;
    }

    public int getTotalInserted() {
        return totalInserted;
    }

    public void setTotalInserted(int totalInserted) {
        this.totalInserted = totalInserted;
    }
    
    
    
}
