package jbc.com.jwt;

import java.awt.IllegalComponentStateException;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.google.common.base.Strings;
import com.google.common.net.HttpHeaders;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtTokenVerifier extends OncePerRequestFilter{

	public JwtTokenVerifier() {
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response,
			FilterChain filterChain)
					throws ServletException, IOException {

		String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

		if (Strings.isNullOrEmpty(authorizationHeader) ||
				!authorizationHeader.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}

		String token =authorizationHeader.replace("Bearer ","");

		try {
			String key = "secretsecretsecretsecretsecretsecretsecretsecret";
			Keys.hmacShaKeyFor(key.getBytes());
			Jws<Claims> claimsJws = Jwts.parser()
					.setSigningKey(Keys.hmacShaKeyFor(key.getBytes()))
					.parseClaimsJws(token);

			Claims body = claimsJws.getBody();

			String username = body.getSubject();

			List<Map<String, String>> authorities = (List<Map<String,String>>) body.get("authorities");

			Set<SimpleGrantedAuthority> SimpleGrantedAuthorities = authorities.stream()
					.map(m -> new SimpleGrantedAuthority(m.get("authority")))
					.collect(Collectors.toSet());

			Authentication authentication = new UsernamePasswordAuthenticationToken(
					username,
					null,
					SimpleGrantedAuthorities);

			SecurityContextHolder.getContext().setAuthentication(authentication);

		} catch (JwtException e) {
			throw new IllegalComponentStateException("Token " + token + " cannot be truest");
		}
		filterChain.doFilter(request, response);
	}

}