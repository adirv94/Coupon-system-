package jbc.com.model;

import javax.persistence.*;

import jbc.com.security.ApplictionUserRole;

@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(unique = true)
	private String email;

	private String password;

	private boolean active;

	private ApplictionUserRole applictionUserRole;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public ApplictionUserRole getApplictionUserRole() {
		return applictionUserRole;
	}

	public void setApplictionUserRole(ApplictionUserRole applictionUserRole) {
		this.applictionUserRole = applictionUserRole;
	}


}
