package org.centrale.hceres.service.auth;

import org.centrale.hceres.config.JwtTokenProvider;
import org.centrale.hceres.items.Role;
import org.centrale.hceres.items.Admin;
import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.repository.ResearcherRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/user")
@CrossOrigin(originPatterns = "*")
public class UserResourceImpl {

    private static final Logger log = LoggerFactory.getLogger(UserResourceImpl.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private ResearcherRepository researcherRepository;

//  our application don't have register for the moment
//	@PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
//	public ResponseEntity<String> register(@RequestBody User user) {
//		log.info("UserResourceImpl : register");
//		JSONObject jsonObject = new JSONObject();
//		try {
//			user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
//			user.setRole(roleRepository.findByName(ConstantUtils.USER.toString()));
//			User savedUser = userRepository.saveAndFlush(user);
//			jsonObject.put("message", savedUser.getName() + " saved succesfully");
//			return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
//		} catch (JSONException e) {
//			try {
//				jsonObject.put("exception", e.getMessage());
//			} catch (JSONException e1) {
//				e1.printStackTrace();
//			}
//			return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
//		}
//	}

    /**
     * <pre>
     * post request researcher in json format where {@link Researcher#getResearcherLogin()}
     * and {@link Researcher#getResearcherPassword()} fields are required,
     * Example:
     * {
     *      "researcherLogin":"admin",
     *      "researcherPassword":"admin"
     * }
     * password are saved in database using {@link org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder#encode(CharSequence)}
     * </pre>
     *
     * @param user the user trying to log in
     * @return authentication with token access depending on role of the user if successfully logged in,
     * empty response otherwise.
     * @see org.centrale.hceres.config.JwtTokenFilter#doFilterInternal(HttpServletRequest, HttpServletResponse, FilterChain)
     * returned token must be used in header as value with key: 'Authorization' for any further request on server
     */
    @PostMapping(value = "/authenticate", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> authenticate(@RequestBody Researcher user) {
        log.info("UserResourceImpl : authenticate");
        // encrypted "admin" : $2a$10$tR4NMaRiVG.QZdXoCsmEUuDltA7Siy0kisCbUwT3p3P3s9wQWdySi
        // encrypted "user" :  $2a$10$nbNEAKss3/jeNdOPfCqel.cLltnDIfE15jpGFEo7rZw1aY/5nAbzi
        JSONObject jsonObject = new JSONObject();
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(user.getResearcherLogin(), user.getResearcherPassword()));
            if (authentication.isAuthenticated()) {
                String login = user.getResearcherLogin();
                jsonObject.put("name", authentication.getName());
                jsonObject.put("authorities", authentication.getAuthorities());

                Role role = new Role();
                Admin isAdmin = researcherRepository.findByLogin(login).getAdmin();
                if (isAdmin != null) {
                    role.setId(1L);
                    role.setName("ADMIN");
                } else {
                    role.setId(2L);
                    role.setName("USER");
                }

                jsonObject.put("token", tokenProvider.createToken(login, role));
                return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
            }
        } catch (JSONException e) {
            try {
                jsonObject.put("exception", e.getMessage());
            } catch (JSONException e1) {
                e1.printStackTrace();
            }
            return new ResponseEntity<>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
        }
        return null;
    }
}