package org.centrale.hceres.service.auth;

import org.centrale.hceres.items.Researcher;
import org.centrale.hceres.repository.ResearcherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private ResearcherRepository researcherRepository;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Researcher user = researcherRepository.findByLogin(login);
        if (user == null) {
            throw new UsernameNotFoundException("User Login:  " + login + " not found");
        }
        return new org.springframework.security.core.userdetails.User(user.getResearcherLogin(), user.getResearcherPassword(),
                getGrantedAuthority(user));
    }

    private List<GrantedAuthority> getGrantedAuthority(Researcher user) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        if (user.getAdmin() != null) {
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        return authorities;
    }
}