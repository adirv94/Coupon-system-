package jbc.com.auth;

import jbc.com.exception.ApiRequestException;
import jbc.com.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import jbc.com.repo.UserRepository;

import java.util.Optional;

@Service
public class ApplicationUserService implements UserDetailsService{


	private final UserRepository userRepository;

	@Autowired
	public ApplicationUserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String email){
		Optional<User> user = userRepository.findByEmail(email);
		user.
		orElseThrow(() ->new ApiRequestException("email " + email + " not found"));

		return user.map(ApplicationUser::new).get();
	}

}
