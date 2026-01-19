package org.centrale.hceres.service.csv;

import org.centrale.hceres.dto.csv.CsvLaboratory;
import org.centrale.hceres.dto.csv.CsvTeam;
import org.centrale.hceres.dto.csv.ImportCsvSummary;
import org.centrale.hceres.dto.csv.utils.GenericCsv;
import org.centrale.hceres.items.Institution;
import org.centrale.hceres.items.Laboratory;
import org.centrale.hceres.items.Team;
import org.centrale.hceres.repository.TeamRepository;
import org.centrale.hceres.service.csv.util.GenericCsvImporter;
import org.centrale.hceres.service.csv.util.SupportedCsvTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import org.centrale.hceres.repository.LaboratoryRepository;

@Service
public class ImportCsvTeam {

    @Autowired
    private TeamRepository teamRepository;
    
    @Autowired
    private LaboratoryRepository laboratoryRepository;

    public Map<Integer, GenericCsv<Team, Integer>> importCsvList(List<?> teamRows,
                                                                 ImportCsvSummary importCsvSummary,
                                                                 Map<Integer, GenericCsv<Laboratory, Integer>> csvIdToLaboratoryMap) {
        return new GenericCsvImporter<Team, Integer>().importCsvList(
    teamRows,
    () -> new CsvTeam(laboratoryRepository),
    teamRepository,
    SupportedCsvTemplate.TEAM,
    importCsvSummary
);
    }
}