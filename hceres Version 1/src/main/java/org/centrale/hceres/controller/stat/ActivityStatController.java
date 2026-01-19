package org.centrale.hceres.controller.stat;

import org.centrale.hceres.dto.stat.utils.ActivityStatDto;
import org.centrale.hceres.dto.stat.utils.ActivityStatSumDto;
import org.centrale.hceres.dto.stat.utils.StatSummaryDto;
import org.centrale.hceres.service.stat.ActivityStatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(originPatterns = "*")
public class ActivityStatController {
    @Autowired
    private ActivityStatService activityStatService;

    @GetMapping("/ActivityStat/typeActivity/{idTypeActivity}")
    public ActivityStatSumDto getStatByTypeActivity(@PathVariable("idTypeActivity") final Integer idTypeActivity) {
        return activityStatService.getStatByTypeActivity(idTypeActivity);
    }
}
