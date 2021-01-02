package jbc.com.controller;

import java.util.List;

import jbc.com.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jbc.com.model.Company;
import jbc.com.model.Customer;

@CrossOrigin
@RestController
@RequestMapping("/AdminApi")
public class AdminController{
	@Autowired
	AdminService adminServ;
	
	@PostMapping("/addCompany")
	@PreAuthorize("hasRole('ADMIN')")
	public Company addCompany(@RequestBody Company company){
		return adminServ.addCompany(company);
	}
	
	@PutMapping("/updateCompany")
	@PreAuthorize("hasRole('ADMIN')")
	public  ResponseEntity<?> updateCompany(@RequestBody Company company) {
		Company c = adminServ.getOneCompanyById(company.getId());
		if (c != null) 
		{
			c = adminServ.updateCompany(company);
			return new ResponseEntity<>(c, HttpStatus.OK);
		}else 
		{		
		return new ResponseEntity<>("company with id " + company.getId() + " not found", HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping("/deleteCompany/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public  ResponseEntity<?> deleteCompanyById(@PathVariable("id") int companyId) {
		Company c = adminServ.getOneCompanyById(companyId);
		if (c != null) 
		{
			adminServ.deleteCompanyById(companyId);
			return new ResponseEntity<>("the company with id " + companyId + " deleted", HttpStatus.OK);
		}
		return new ResponseEntity<>("the company not found", HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/getAllCompanies")
	@PreAuthorize("hasRole('ADMIN')")
	public List<Company> getAllCompanies(){
		return adminServ.getAllCompanies();
	}
	
	@GetMapping("/getOneCompanyById/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getOneCompanyById(@PathVariable("id") int companyId) {
		Company company = adminServ.getOneCompanyById(companyId);
		if (company != null) 
		{
			return new ResponseEntity<Company>(company, HttpStatus.OK);
		}else 
		{
			return new ResponseEntity<String>("company with id " +companyId+" not found", HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/addCustomer")
	@PreAuthorize("hasRole('ADMIN')")
	public Customer addCustomer(@RequestBody Customer customer){
		return adminServ.addCustomer(customer);
	}
	@PutMapping("/updateCustomer")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> updateCustomer(@RequestBody Customer customer) {
		Customer c = adminServ.getOneCustomerById(customer.getId());
		if (c != null) 
		{
			c = adminServ.updateCustomer(customer);
			return new ResponseEntity<>(c, HttpStatus.OK);
		}else
		{
			return new ResponseEntity<String>("customer with id " + customer.getId() + " not found", HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping("/deleteCustomer/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public  ResponseEntity<String> deleteCustomerById(@PathVariable("id") int customerId) {
		Customer c = adminServ.getOneCustomerById(customerId);
		if (c != null) 
		{
			adminServ.deleteCustomerById(customerId);
			return new ResponseEntity<>("the customer with id " + customerId + " deleted", HttpStatus.OK);
		}
		return new ResponseEntity<>("the customer not found", HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/getAllCustomers")
	@PreAuthorize("hasRole('ADMIN')")
	public List<Customer> getAllCustomers(){
		return adminServ.getAllCustomers();
	}
	
	@GetMapping("/getOneCustomerById/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getOneCustomerById(@PathVariable("id") int customerId) {
		Customer customer = adminServ.getOneCustomerById(customerId);
		if (customer != null) 
		{
			return new ResponseEntity<Customer>(customer, HttpStatus.OK);
		}else 
		{
			return new ResponseEntity<String>("company with id " +customerId+" not found", HttpStatus.BAD_REQUEST);
		}
	}
	
}
