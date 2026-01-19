package org.centrale.hceres.service.csv;

import org.centrale.hceres.dto.csv.CsvLaboratory;
import org.centrale.hceres.dto.csv.ImportCsvSummary;
import org.centrale.hceres.dto.csv.utils.GenericCsv;
import org.centrale.hceres.items.Institution;
import org.centrale.hceres.items.Laboratory;
import org.centrale.hceres.repository.LaboratoryRepository;
import org.centrale.hceres.service.csv.util.GenericCsvImporter;
import org.centrale.hceres.service.csv.util.SupportedCsvTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ImportCsvLaboratory {

    @Autowired
    private LaboratoryRepository laboratoryRepository;

    public Map<Integer, GenericCsv<Laboratory, Integer>> importCsvList(List<?> laboratoryRows,
                                                                       ImportCsvSummary importCsvSummary,
                                                                       Map<Integer, GenericCsv<Institution, Integer>> csvIdToInstitutionMap) {
        return new GenericCsvImporter<Laboratory, Integer>().importCsvList(laboratoryRows,
                () -> new CsvLaboratory(csvIdToInstitutionMap),
                laboratoryRepository,
                SupportedCsvTemplate.LABORATORY,
                importCsvSummary);
    }
}
