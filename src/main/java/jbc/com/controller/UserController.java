package jbc.com.controller;

import jbc.com.auth.ApplicationUser;
import jbc.com.auth.ApplicationUserService;
import jbc.com.exception.ApiRequestException;
import jbc.com.jwt.JwtUtil;
import jbc.com.model.User;
import jbc.com.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/user")
@Service
public class UserController {

	private final ApplicationUserService applicationUserService;
	private final UserRepository userRepository;
	private final JwtUtil jwtUtil = new JwtUtil();

	@Autowired
	public UserController(ApplicationUserService applicationUserService, UserRepository userRepository) {
		this.applicationUserService = applicationUserService;
		this.userRepository = userRepository;
	}


	@GetMapping("/{username}")
	@PreAuthorize("hasAnyRole('ADMIN','CUSTOMER','COMPANY')")
	public UserDetails getUserByName(@PathVariable("username") String email) {
		Optional<User> user = userRepository.findByEmail(email);
		user.
		orElseThrow(() ->new ApiRequestException("email " + email + " not found"));

		return user.map(ApplicationUser::new).get();
	}

}
