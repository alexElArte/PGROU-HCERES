package org.centrale.hceres.service.csv;

import org.centrale.hceres.dto.csv.CsvBelongTeam;
import org.centrale.hceres.dto.csv.ImportCsvSummary;
import org.centrale.hceres.dto.csv.utils.GenericCsv;
import org.centrale.hceres.items.BelongsTeam;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.Team;
import org.centrale.hceres.repository.BelongsTeamRepository;
import org.centrale.hceres.service.csv.util.GenericCsvImporter;
import org.centrale.hceres.service.csv.util.SupportedCsvTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ImportCsvBelongsTeam {

    @Autowired
    private BelongsTeamRepository belongsTeamRepository;

    public Map<Integer, GenericCsv<BelongsTeam, Integer>> importCsvList(
            List<?> belongsTeamRows,
            ImportCsvSummary importCsvSummary,
            Map<Integer, GenericCsv<Researcher, Integer>> csvIdToResearcherMap,
            Map<Integer, GenericCsv<Team, Integer>> csvIdToTeamMap
    ) {
        return new GenericCsvImporter<BelongsTeam, Integer>()
                .importCsvList(
                        belongsTeamRows,
                        () -> new CsvBelongTeam(csvIdToResearcherMap, csvIdToTeamMap),
                        belongsTeamRepository,
                        SupportedCsvTemplate.BELONG_TEAM,
                        importCsvSummary
                );
    }
}
