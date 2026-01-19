package org.centrale.hceres.service;

import java.util.*;

import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.OralComPoster;
import org.centrale.hceres.items.Meeting;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.items.TypeActivityId;
import org.centrale.hceres.repository.ActivityRepository;
import org.centrale.hceres.repository.MeetingCongressOrgRepository;
import org.centrale.hceres.repository.MeetingRepository;
import org.centrale.hceres.repository.OralComPosterRepository;
import org.centrale.hceres.repository.TypeOralComPosterRepository;
import org.centrale.hceres.util.RequestParseException;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.Data;

import javax.transaction.Transactional;

import org.springframework.web.bind.annotation.RequestBody;

@Data
@Service
public class OralComPosterService {


    @Autowired
    private OralComPosterRepository oralComPosterRepo;

    @Autowired
    private TypeOralComPosterRepository typeOralComPosterRepo;

    @Autowired
    private MeetingRepository meetingRepo;

    @Autowired
    private ActivityRepository activityRepo;

    @Autowired
    private MeetingCongressOrgRepository meetingCongressOrgRepo;

    public List<Activity> getOralComPosters() {
        return activityRepo.findByIdTypeActivity(TypeActivityId.INVITED_ORAL_COMMUNICATION.getId());
    }

    public void deleteOralComPoster(Integer id) {
        oralComPosterRepo.deleteById(id);
    }

    /**
     * permet d'ajouter un elmt
     *
     * @return : l'elemt ajouter a la base de donnees
     */
    @Transactional
    public Activity saveOralComPoster(@RequestBody Map<String, Object> request) throws RequestParseException {

        OralComPoster oralComPoster = new OralComPoster();

        // OralComPosterTitle :
        oralComPoster.setOralComPosterTitle(RequestParser.getAsString(request.get("OralComPosterTitle")));

        // OralComPosterDat :
        oralComPoster.setOralComPosterDate(RequestParser.getAsDate(request.get("OralComPosterDate")));

        // Authors :
        oralComPoster.setAuthors(RequestParser.getAsString(request.get("Authors")));

        // Meeting
        Meeting meeting = new Meeting();
        meeting.setMeetingName(RequestParser.getAsString(request.get("MeetingName")));
        meeting.setMeetingYear(RequestParser.getAsInteger(request.get("MeetingYear")));
        meeting.setMeetingLocation(RequestParser.getAsString(request.get("MeetingLocation")));
        meeting.setMeetingStart(RequestParser.getAsDate(request.get("MeetingStart")));
        meeting.setMeetingEnd(RequestParser.getAsDate(request.get("MeetingEnd")));
        oralComPoster.setMeeting(meeting);


        // currently using default TypeOralComPoster 1
        // should use later id from select list in front using request.get("TypeOralComPosterName")
        oralComPoster.setTypeOralComPosterId(1);


        // Activity :
        Activity activity = new Activity();
        oralComPoster.setActivity(activity);
        activity.setOralComPoster(oralComPoster);
        activity.setIdTypeActivity(TypeActivityId.INVITED_ORAL_COMMUNICATION.getId());

        // get list of researcher doing this activity - currently only one is sent
        activity.setResearcherList(Collections.singletonList(new Researcher(RequestParser.getAsInteger(request.get("researcherId")))));

        activity = activityRepo.save(activity);
        return activity;
    }

}
