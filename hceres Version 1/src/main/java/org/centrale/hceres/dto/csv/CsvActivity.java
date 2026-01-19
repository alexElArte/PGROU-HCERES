package org.centrale.hceres.dto.csv;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.centrale.hceres.dto.csv.utils.*;
import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.TypeActivity;
import org.centrale.hceres.dto.csv.utils.SupportedCsvTemplate;
import org.centrale.hceres.util.RequestParser;

import java.util.*;

/**
 * This class is used only for mapping between activityTemplate.csv and Researcher.csv
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class CsvActivity extends DependentCsv<Activity, Integer> {

    // id_type;id_activity;researcher_names;specific_activity_count;activity_name_type

    private Integer idCsvTypeActivity;
    private static final int ID_CSV_TYPE_ACTIVITY_ORDER = 0;
    private GenericCsv<TypeActivity, Integer> csvTypeActivity;
    private final Map<Integer, GenericCsv<TypeActivity, Integer>> typeActivityIdCsvMap;

    private Integer idCsv;
    private static final int ID_CSV_ORDER = 1;

    /**
     * Colonne CSV contenant les chercheurs :
     * ex: "M. Giral / Y. Foucher"
     */
    private String rawResearchers;
    private static final int RESEARCHER_NAMES_ORDER = 2;

    /**
     * Map NOM DE FAMILLE (uppercase) -> CsvResearcher
     * (fournie par ImportCsvActivity)
     */
    private final Map<String, GenericCsv<Researcher, Integer>> researcherSurnameMap;

    /**
     * Chercheurs résolus à partir de rawResearchers
     */
    private List<GenericCsv<Researcher, Integer>> csvResearchers = new ArrayList<>();

    // specific count along with idCsvTypeActivity give the id of activity
    private Integer specificActivityCount;
    private static final int SPECIFIC_ACTIVITY_COUNT_ORDER = 3;

    // ignored
    private String activityNameType;
    private static final int ACTIVITY_NAME_TYPE_ORDER = 4;

    private static final String IMPLEMENTATION_ERROR = "Should not be called, convert Specific Activity instead";

    public CsvActivity(
            Map<Integer, GenericCsv<TypeActivity, Integer>> typeActivityIdCsvMap,
            Map<String, GenericCsv<Researcher, Integer>> researcherSurnameMap) {

        this.typeActivityIdCsvMap = typeActivityIdCsvMap;
        this.researcherSurnameMap = researcherSurnameMap;
    }

    // ---------------- CSV parsing ----------------

    @Override
    public void fillCsvDataWithoutDependency(List<?> csvData) throws CsvAllFieldExceptions {
        CsvParserUtil.wrapCsvAllFieldExceptions(
                () -> CsvParserUtil.wrapCsvParseException(ID_CSV_TYPE_ACTIVITY_ORDER,
                        f -> this.setIdCsvTypeActivity(RequestParser.getAsInteger(csvData.get(f)))),

                () -> CsvParserUtil.wrapCsvParseException(ID_CSV_ORDER,
                        f -> this.setIdCsv(RequestParser.getAsInteger(csvData.get(f)))),

                // colonne avec "M. Giral / Y. Foucher"
                () -> CsvParserUtil.wrapCsvParseException(RESEARCHER_NAMES_ORDER,
                        f -> this.setRawResearchers(RequestParser.getAsString(csvData.get(f)))),

                () -> CsvParserUtil.wrapCsvParseException(SPECIFIC_ACTIVITY_COUNT_ORDER,
                        f -> this.setSpecificActivityCount(RequestParser.getAsInteger(csvData.get(f)))),

                () -> CsvParserUtil.wrapCsvParseException(ACTIVITY_NAME_TYPE_ORDER,
                        f -> this.setActivityNameType(RequestParser.getAsString(csvData.get(f))))
        );
    }

    @Override
    public void initializeDependencies() throws CsvAllFieldExceptions {
        CsvParserUtil.wrapCsvAllFieldExceptions(
                // Type d'activité
                () -> CsvParserUtil.wrapCsvDependencyException(
                        ID_CSV_TYPE_ACTIVITY_ORDER,
                        this.getIdCsvTypeActivity(),
                        SupportedCsvTemplate.TYPE_ACTIVITY,
                        this.typeActivityIdCsvMap.get(this.getIdCsvTypeActivity()),
                        this::setCsvTypeActivity
                ),

                // Chercheurs par nom de famille
                () -> {
                    this.csvResearchers = new ArrayList<>();

                    for (String surname : extractSurnames(this.rawResearchers)) {
                        String key = surname.toUpperCase(Locale.ROOT);
                        GenericCsv<Researcher, Integer> csvRes = this.researcherSurnameMap.get(key);

                        if (csvRes == null) {
                            throw new CsvFieldException(
                                    "No researcher found with surname '" + surname + "'",RESEARCHER_NAMES_ORDER
                            );
                        }
                        this.csvResearchers.add(csvRes);
                    }
                }
        );
    }

    /**
     * Transforme "M. Giral / Y. Foucher" -> ["Giral", "Foucher"]
     */
    private List<String> extractSurnames(String raw) {
        if (raw == null || raw.isBlank()) {
            return Collections.emptyList();
        }

        List<String> surnames = new ArrayList<>();
        String[] parts = raw.split("/");

        for (String part : parts) {
            String trimmed = part.trim();
            if (trimmed.isEmpty()) continue;

            String[] tokens = trimmed.split("\\s+");
            String last = tokens[tokens.length - 1]; // prend le dernier mot comme nom de famille
            surnames.add(last);
        }
        return surnames;
    }

    // ---------------- Conversion en entité ----------------

    @Override
    public Activity convertToEntity() {
        Activity activity = new Activity();

        List<Researcher> researchers = new ArrayList<>();
        if (csvResearchers != null) {
            for (GenericCsv<Researcher, Integer> csvRes : csvResearchers) {
                if (csvRes == null) continue;
                // On recrée un Researcher minimal avec juste l'id DB
                Researcher r = new Researcher(csvRes.getIdDatabase());
                researchers.add(r);
            }
        }

        activity.setResearcherList(researchers);
        return activity;
    }

    @Override
    public String getMergingKey() {
        throw new UnsupportedOperationException(IMPLEMENTATION_ERROR);
    }

    @Override
    public String getMergingKey(Activity entity) {
        throw new UnsupportedOperationException(IMPLEMENTATION_ERROR);
    }

    @Override
    public void setIdDatabaseFromEntity(Activity entity) {
        this.setIdDatabase(entity.getIdActivity());
    }

    @Override
    public Integer getIdCsv() {
        return this.idCsv;
    }

    public void setIdCsv(Integer idCsv) {
        this.idCsv = idCsv;
    }
    

    public Integer getIdCsvTypeActivity() {
        return idCsvTypeActivity;
    }

    public void setIdCsvTypeActivity(Integer idCsvTypeActivity) {
        this.idCsvTypeActivity = idCsvTypeActivity;
    }

    public GenericCsv<TypeActivity, Integer> getCsvTypeActivity() {
        return csvTypeActivity;
    }

    public void setCsvTypeActivity(GenericCsv<TypeActivity, Integer> csvTypeActivity) {
        this.csvTypeActivity = csvTypeActivity;
    }

    public String getRawResearchers() {
        return rawResearchers;
    }

    public void setRawResearchers(String rawResearchers) {
        this.rawResearchers = rawResearchers;
    }

    public List<GenericCsv<Researcher, Integer>> getCsvResearchers() {
        return csvResearchers;
    }

    public void setCsvResearchers(List<GenericCsv<Researcher, Integer>> csvResearchers) {
        this.csvResearchers = csvResearchers;
    }

    public Integer getSpecificActivityCount() {
        return specificActivityCount;
    }

    public void setSpecificActivityCount(Integer specificActivityCount) {
        this.specificActivityCount = specificActivityCount;
    }

    public String getActivityNameType() {
        return activityNameType;
    }

    public void setActivityNameType(String activityNameType) {
        this.activityNameType = activityNameType;
    }
    
}
