package org.centrale.hceres.service;

import org.centrale.hceres.items.*;
import org.centrale.hceres.repository.*;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PlatformService {

    @Autowired
    PlatformRepository platformRepository;

    @Autowired
    private ActivityRepository activityRepo;


    public List<Activity> getPlatforms() {
        return activityRepo.findByIdTypeActivity(TypeActivityId.PLATFORM.getId());
    }


    public Optional<Platform> getPlatform(final Integer id) {
        return platformRepository.findById(id);
    }


    public void deletePlatform(final Integer id) {
        platformRepository.deleteById(id);
    }

    public Activity savePlatform(@RequestBody Map<String, Object> request) throws RequestParseException {

        Platform platform = new Platform();

        // Creation Date
        platform.setCreationDate(RequestParser.getAsDate(request.get("creationDate")));

        // Description
        platform.setDescription(RequestParser.getAsString(request.get("description")));

        // Managers
        platform.setManagers(RequestParser.getAsString(request.get("managers")));

        // Affiliation
        platform.setAffiliation(RequestParser.getAsString(request.get("affiliation")));

        // Labellisation
        platform.setLabellisation(RequestParser.getAsString(request.get("labellisation")));

        // Open Private Researches
        platform.setOpenPrivateResearchers(RequestParser.getAsBoolean(request.get("openPrivateResearchers")));


        // Activity :
        Activity activity = new Activity();
        platform.setActivity(activity);
        activity.setPlatform(platform);
        activity.setIdTypeActivity(TypeActivityId.PLATFORM.getId());

        // get list of researcher doing this activity - currently only one is sent
        activity.setResearcherList(Collections.singletonList(new Researcher(RequestParser.getAsInteger(request.get("researcherId")))));

        activity = activityRepo.save(activity);
        return activity;
    }
}
