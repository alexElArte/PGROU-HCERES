package org.centrale.hceres.service.csv;

import lombok.Data;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Data
@Service
public class DatabasePurger {
    @Autowired
    private ActivityRepository activityRepo;

    @Autowired
    private ResearcherRepository researchRepo;

    @Autowired
    private InstitutionRepository institutionRepo;

    @Autowired
    private LanguageRepository languageRepo;

    @Autowired
    private JournalRepository journalRepo;

    @Autowired
    private NationalityRepository nationalityRepo;

    @Autowired
    private ThesisTypeRepository thesisTypeRepo;

    @Autowired
    private PublicationTypeRepository publicationTypeRepo;

    @Autowired
    private StatusRepository statusRepo;
    public void purgeData() {
        activityRepo.deleteAll();
        activityRepo.resetSequence();
        researchRepo.deleteAll();
        researchRepo.resetSequence();
        institutionRepo.deleteAll();
        institutionRepo.resetSequence();
        languageRepo.deleteAll();
        languageRepo.resetSequence();
        journalRepo.deleteAll();
        journalRepo.resetSequence();
        nationalityRepo.deleteAll();
        nationalityRepo.resetSequence();
        thesisTypeRepo.deleteAll();
        thesisTypeRepo.resetSequence();
        publicationTypeRepo.deleteAll();
        publicationTypeRepo.resetSequence();
        statusRepo.deleteAll();
        statusRepo.resetSequence();
        researchRepo.saveAll(getDefaultResearchers());
    }

    public Researcher getSimpleResearcher(String name) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        Researcher researcher = new Researcher();
        researcher.setResearcherLogin(name);
        researcher.setResearcherPassword(encoder.encode(name));
        researcher.setResearcherName(name);
        researcher.setResearcherSurname(name);
        researcher.setResearcherEmail(name + "@" + name + ".com");
        return researcher;
    }

    public Researcher getAdminResearcher() {
        return getSimpleResearcher("admin");
    }

    public Researcher getUserResearcher() {
        return getSimpleResearcher("user");
    }

    public List<Researcher> getDefaultResearchers() {
        return Arrays.asList(getAdminResearcher(), getUserResearcher());
    }

}
