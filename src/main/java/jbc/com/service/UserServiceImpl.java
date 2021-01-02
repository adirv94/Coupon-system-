package jbc.com.service;

import jbc.com.exception.ApiRequestException;
import jbc.com.model.User;
import jbc.com.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

	private final PasswordEncoder passwordEncoder;
	private final UserRepository userRepository;

	@Autowired
	public UserServiceImpl(PasswordEncoder passwordEncoder, UserRepository userRepository) {
		this.passwordEncoder = passwordEncoder;
		this.userRepository = userRepository;
	}


	@Override
	public User findByEmail(String email) {
		Optional<User> byEmail = userRepository.findByEmail(email);
		if (byEmail.isPresent())
			return byEmail.get();
		throw new ApiRequestException("user with email " + email + " not found");
	}

	public User addUser(User user) {
		if (!userRepository.findByEmail(user.getEmail()).isPresent()) {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			return userRepository.save(user);
		} else {
			throw new ApiRequestException("The user email exists");
		}
	}

	public User updateUser(User user) {
		Optional<User> byEmail = userRepository.findByEmail(user.getEmail());
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		if (byEmail.isPresent()){
			if (byEmail.get().getId() == user.getId()){
				return userRepository.save(user);
			}else{
				throw new ApiRequestException("The user email exists");
			}
		}

		return userRepository.save(user);
	}

	public void deleteUserById(int userId) {
		userRepository.deleteById(userId);
	}

	@Override
	public void deleteByEmail(String email) {
		userRepository.deleteByEmail(email);
	}
}
