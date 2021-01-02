package jbc.com.jwt;

public class UsernameAndPasswordAuthenticationRequest {

	private String password;
	private String username;

	public UsernameAndPasswordAuthenticationRequest() {
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}
