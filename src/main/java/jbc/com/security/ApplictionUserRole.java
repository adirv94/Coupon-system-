package jbc.com.security;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.google.common.collect.Sets;
import static jbc.com.security.ApplicationUserPremission.*;

public enum ApplictionUserRole {
	CUSTOMER(Sets.newHashSet()),
	ADMIN(Sets.newHashSet()),
	COMPANY(Sets.newHashSet());

	private final Set<ApplicationUserPremission> permissions;

	ApplictionUserRole(Set<ApplicationUserPremission> permissions) {
		this.permissions = permissions;
	}

	public Set<ApplicationUserPremission> getPermissions() {
		return permissions;
	}
	public Set<SimpleGrantedAuthority> getGrantedAuthority() {
		Set<SimpleGrantedAuthority> permissions = getPermissions().stream()
				.map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
				.collect(Collectors.toSet());
		permissions.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
		return permissions;
	}
}
