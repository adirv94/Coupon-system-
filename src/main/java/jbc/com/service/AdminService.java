package jbc.com.service;

import java.util.List;

import jbc.com.model.Company;
import jbc.com.model.Customer;

public interface AdminService {

	public Company addCompany(Company company);
	public Company updateCompany(Company company);
	public void deleteCompanyById(int companyId);
	public List<Company> getAllCompanies();
	public Company getOneCompanyById(int companyId);
	public Customer addCustomer(Customer customer);
	public Customer updateCustomer(Customer customer);
	public void deleteCustomerById(int customerId);
	public List<Customer> getAllCustomers();
	public Customer getOneCustomerById(int customerId);
}
