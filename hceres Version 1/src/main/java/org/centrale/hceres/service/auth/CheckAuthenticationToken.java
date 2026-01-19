package org.centrale.hceres.service.auth;

import org.centrale.hceres.items.Researcher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(originPatterns = "*")
public class CheckAuthenticationToken {
    private static final Logger log = LoggerFactory.getLogger(CheckAuthenticationToken.class);

    @GetMapping("/checkToken")
    public Boolean checkToken() {
        return true;
    }
}
