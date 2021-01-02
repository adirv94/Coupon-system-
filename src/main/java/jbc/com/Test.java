package jbc.com;

import jbc.com.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jbc.com.Job.Job;
import jbc.com.model.Company;
import jbc.com.model.Customer;
import jbc.com.model.User;
import jbc.com.security.ApplictionUserRole;

@Service
public class Test {

	@Autowired
	Job job;
	@Autowired
	UserService userService;
	@Autowired
	AdminService adminService;

	@SuppressWarnings("unchecked")
	public void testAll() {
		try {
			User linda = new User();
			linda.setActive(true);
			linda.setApplictionUserRole(ApplictionUserRole.ADMIN);
			linda.setPassword("pass");
			linda.setEmail("linda@linda.linda");
			userService.addUser(linda);
		}catch (Throwable t){

		}
		try {
			Company tom = new Company();
			tom.setEmail("tom@tom.tom");
			tom.setPassword("pass");
			tom.setName("TomComapny");
			adminService.addCompany(tom);
		}catch (Throwable t){

		}
		try {
			Customer anna = new Customer();
			anna.setEmail("anna@anna.anna");
			anna.setPassword("pass");
			anna.setFirstName("anna");
			anna.setLastName("banana");
			adminService.addCustomer(anna);
		}catch (Throwable t){

		}
	}

}
