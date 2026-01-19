package org.centrale.hceres.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.centrale.hceres.items.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.Serializable;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtTokenProvider implements Serializable {

	private static final long serialVersionUID = 2569800841756370596L;

	@Value("${ecn.secret-key}")
	private String secretKey;

	@PostConstruct
	protected void init() {
		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}

	static private final long VALIDITY_IN_MILLISECONDS = 24 * 60 * 60 * 1000; // 24 Hour * 60 minutes * 60 seconds * 1000 millis = one hour in millis

	public String createToken(String username, Role role) {
		Claims claims = Jwts.claims().setSubject(username);
		claims.put("auth", role);

		Date now = new Date();
		return Jwts.builder().setClaims(claims).setIssuedAt(now)
				.setExpiration(new Date(now.getTime() + VALIDITY_IN_MILLISECONDS))
				.signWith(SignatureAlgorithm.HS256, secretKey).compact();
	}

	@Autowired
	private UserDetailsService userDetailsService;

	public Authentication getAuthentication(String username) {
		UserDetails userDetails = userDetailsService.loadUserByUsername(username);
		return new UsernamePasswordAuthenticationToken(userDetails.getUsername(), userDetails.getPassword(),
				userDetails.getAuthorities());
	}

	public Claims getClaimsFromToken(String token) {
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
	}
}