package jbc.com.security;

public enum ApplicationUserPremission {
	STUDENT_READ("student:read"),
	STUDENT_WRITE("student:write"),
	COURSE_READ("course:read"),
	COURSE_WRITE("course:write");

	private final String permission;

	ApplicationUserPremission(String permission) {
		this.permission = permission;
	}

	public String getPermission() {
		return permission;
	}

}
