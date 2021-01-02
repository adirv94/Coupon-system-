package jbc.com.service;

import java.util.List;
import java.util.Optional;

import jbc.com.exception.ApiRequestException;
import jbc.com.model.User;
import jbc.com.security.ApplictionUserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jbc.com.model.Company;
import jbc.com.model.Customer;

@Service
public class AdminServiceImpl extends ClientService implements AdminService {

	private final UserService userService;

	@Autowired
	public AdminServiceImpl(UserService userService) {
		this.userService = userService;
	}

	//Adding a new company
	public Company addCompany(Company company) {
		if (!compRepo.isCompanyNameExists(company.getName())) {
			if (!compRepo.isCompanyEmailExists(company.getEmail())) {
				User user = new User();
				user.setApplictionUserRole(ApplictionUserRole.COMPANY);
				user.setActive(true);
				user.setEmail(company.getEmail());
				user.setPassword(company.getPassword());

				userService.addUser(user);

				return compRepo.save(company);
			} else {
				throw new ApiRequestException("The company name exists");
			}
		} else {
			throw new ApiRequestException("The company email exists");
		}

	}

	//Update existing company
	public Company updateCompany(Company company) {
		if (compRepo.isCompanyIdExists(company.getId())) {
			if (compRepo.isCompanyNameExists(company.getName())) {
				Company oldComapny = compRepo.findById(company.getId()).get();
				User user = userService.findByEmail(oldComapny.getEmail());
				user.setApplictionUserRole(ApplictionUserRole.COMPANY);
				user.setActive(true);
				user.setEmail(company.getEmail());
				user.setPassword(company.getPassword());

				userService.updateUser(user);

				company.setCoupons(oldComapny.getCoupons());

				return compRepo.save(company);
			} else {
				throw new ApiRequestException("u cant update company name");
			}
		} else {
			throw new ApiRequestException("u cant update company id");
		}

	}

	//Delete an existing company
	public void deleteCompanyById(int companyId) {
		userService.deleteByEmail(getOneCompanyById(companyId).getEmail());
		compRepo.deleteById(companyId);
	}

	//Return all company companies
	public List<Company> getAllCompanies() {
		return compRepo.findAll();
	}

	//Returning a specific company according to company Id
	public Company getOneCompanyById(int companyId) {
		if (compRepo.isCompanyIdExists(companyId)) {
			Optional<Company> byId = compRepo.findById(companyId);
			if (byId.isPresent())
				return byId.get();
			throw new ApiRequestException("the company is not exists");
		} else {
			throw new ApiRequestException("the company is not exists");
		}
	}

	//Adding a new customer
	public Customer addCustomer(Customer customer) {
		if (!custRepo.isCustomerEmailExists(customer.getEmail())) {
			User user = new User();
			user.setApplictionUserRole(ApplictionUserRole.CUSTOMER);
			user.setActive(true);
			user.setEmail(customer.getEmail());
			user.setPassword(customer.getPassword());

			userService.addUser(user);

			return custRepo.save(customer);
		} else {
			throw new ApiRequestException("the customer email exists");
		}

	}

	//Update existing customer
	public Customer updateCustomer(Customer customer) {
		if (custRepo.isCustomerIdExists(customer.getId())) {
			Customer oldCustomer = custRepo.findById(customer.getId()).get();
			User user = userService.findByEmail(oldCustomer.getEmail());
			user.setApplictionUserRole(ApplictionUserRole.CUSTOMER);
			user.setActive(true);
			user.setEmail(customer.getEmail());
			user.setPassword(customer.getPassword());

			userService.updateUser(user);

			customer.setCoupons(oldCustomer.getCoupons());

			return custRepo.save(customer);
		} else {
			throw new ApiRequestException("u cant update customer id");
		}
	}

	//Delete an existing customer
	public void deleteCustomerById(int customerId) {
		userService.deleteByEmail(getOneCustomerById(customerId).getEmail());
		custRepo.deleteById(customerId);
	}

	//Return all company customers
	public List<Customer> getAllCustomers() {
		return custRepo.findAll();
	}

	//Returning a specific company according to customer Id
	public Customer getOneCustomerById(int customerId) {
		return custRepo.findById(customerId).get();
	}

}
