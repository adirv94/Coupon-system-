package jbc.com.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jbc.com.model.Category;
import jbc.com.model.Coupon;
import jbc.com.model.Customer;
import jbc.com.service.CustomerService;

@CrossOrigin
@RestController
@RequestMapping("/CustomerApi")
public class CustomerController{

	CustomerController() {}
	
	
	@Autowired
	CustomerService customerService;
	
	@PostMapping("/buyCoupon/{customerId}")
	@PreAuthorize("hasRole('CUSTOMER')")
	public void buyCoupon(@RequestBody Coupon coupon,@PathVariable("customerId") int customerId){
		customerService.buyCoupon(coupon,customerId);
	}
	
	@GetMapping("/getPurchaseCoupons/{customerId}")
	@PreAuthorize("hasRole('CUSTOMER')")
	public Set<Coupon> getPurchaseCoupons(@PathVariable("customerId") int customerId){
		return customerService.getPurchaseCoupons(customerId);
	}
	@GetMapping("/getAllNonePurchaseCoupons/{customerId}")
	@PreAuthorize("hasRole('CUSTOMER')")
	public List<Coupon> getAllNonePurchaseCoupons(@PathVariable("customerId") int customerId){
		return customerService.getAllNonePurchaseCoupons(customerId);
	}
	
	@GetMapping("/getPurchaseCouponsByCategory/{category}/{customerId}")
	@PreAuthorize("hasRole('CUSTOMER')")
	public List<Coupon> getPurchaseCouponsByCategory(@PathVariable("category") Category category ,@PathVariable("customerId")int customerId){
		return customerService.getPurchaseCouponsByCategory(category,customerId);
	}
	
	@GetMapping("/getPurchaseCouponsByMaxPrice/{maxPrice}/{customerId}")
	@PreAuthorize("hasRole('CUSTOMER')")
	public List<Coupon> getPurchaseCouponsByMaxPrice(@PathVariable("maxPrice") int max,@PathVariable("customerId") int customerId){
		return customerService.getPurchaseCouponsByMaxPrice(max,customerId);
	}
	
	@GetMapping("/getCustomerId/{customerEmail}")
	@PreAuthorize("hasRole('CUSTOMER')")
	public Integer getCompanyId(@PathVariable("customerEmail") String email) {
		return customerService.getCustomerIdByEmail(email);
	}
	
}
