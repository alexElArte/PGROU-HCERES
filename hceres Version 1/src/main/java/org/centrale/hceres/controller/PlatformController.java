package org.centrale.hceres.controller;


import org.centrale.hceres.items.Activity;
import org.centrale.hceres.items.Platform;
import org.centrale.hceres.service.PlatformService;
import org.centrale.hceres.util.RequestParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(originPatterns = "*")
public class PlatformController {

    @Autowired
    PlatformService platformService;


    @GetMapping("/Platforms")
    public List<Activity> getPlatforms() {
        return platformService.getPlatforms();
    }


    @GetMapping("/Platform/{id}")
    public Platform getPlatform(@PathVariable("id") final Integer id) {
        Optional<Platform> platform = platformService.getPlatform(id);
        if(platform.isPresent()) {
            return platform.get();
        } else {
            return null;
        }
    }

    @PostMapping(value = "/Platform/Create")
    public Activity createPlatform(@RequestBody Map<String, Object> request) throws RequestParseException {
        return platformService.savePlatform(request);
    }

    @DeleteMapping("/Platform/Delete/{id}")

    public void deleteEducation(@RequestBody @PathVariable("id") final Integer id) {
        platformService.deletePlatform(id);
    }
}
