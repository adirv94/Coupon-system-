package jbc.com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jbc.com.repo.CompanyRepository;
import jbc.com.repo.CouponRepository;
import jbc.com.repo.CustomerRepository;

@Service
public abstract class ClientService {
	
	@Autowired
	protected CompanyRepository compRepo;
	@Autowired
	protected CustomerRepository custRepo;
	@Autowired
	protected CouponRepository coupRepo;

}
