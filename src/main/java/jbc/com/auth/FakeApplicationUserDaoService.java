package jbc.com.auth;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import com.google.common.collect.Lists;

import static jbc.com.security.ApplictionUserRole.*;

@Repository("fake")
public class FakeApplicationUserDaoService implements ApplicationUserDao{
	
	private final PasswordEncoder passwordEncoder;
	
	@Autowired
	public FakeApplicationUserDaoService(PasswordEncoder passwordEncoder) {
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public Optional<ApplicationUser> selectApplicationUserByUsername(String username) {
		return getApplicationUser()
				.stream()
				.filter(applicationUser -> username.equals(applicationUser.getUsername()))
				.findFirst();
	}

	private List<ApplicationUser> getApplicationUser(){
		List<ApplicationUser> applicationUsers = Lists.newArrayList(
				new ApplicationUser(
						"anna",
						passwordEncoder.encode("pass"),
						CUSTOMER.getGrantedAuthority(),
						true,
						true,
						true,
						true
						),
				new ApplicationUser(
						"linda",
						passwordEncoder.encode("pass"),
						ADMIN.getGrantedAuthority(),
						true,
						true,
						true,
						true
						),
				new ApplicationUser(
						"tom",
						passwordEncoder.encode("pass"),
						COMPANY.getGrantedAuthority(),
						true,
						true,
						true,
						true
						)
				);
				return applicationUsers;
	}
}
	