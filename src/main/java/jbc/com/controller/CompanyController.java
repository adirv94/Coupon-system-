package jbc.com.controller;

import java.util.List;
import java.util.Optional;

import jbc.com.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jbc.com.model.Category;
import jbc.com.model.Company;
import jbc.com.model.Coupon;
import jbc.com.repo.CouponRepository;

@CrossOrigin
@RestController
@RequestMapping("/CompanyApi")
public class CompanyController{

	@Autowired
	CouponRepository couponRepository;
	@Autowired
	CompanyService companyServ;

	
	@PostMapping("/addCoupon/{companyId}")
	@PreAuthorize("hasRole('COMPANY')")
	public ResponseEntity<?> addCoupon(@RequestBody Coupon coupon,@PathVariable("companyId") int companyId){
		Coupon c = companyServ.addCoupon(coupon, companyId);
			return new ResponseEntity<>(c, HttpStatus.OK);
	}
	
	@PutMapping("/updateCoupon")
	@PreAuthorize("hasRole('COMPANY')")
	public ResponseEntity<?> updateCoupon(@RequestBody Coupon coupon) throws Exception{
		Coupon c = couponRepository.findById(coupon.getId()).get();
		if (c != null) 
		{
			c = companyServ.updateCoupon(coupon);
			return new ResponseEntity<>(c, HttpStatus.OK);
		}else 
		{		
		return new ResponseEntity<>("coupon with id " + coupon.getId() + " not found", HttpStatus.BAD_REQUEST);
		}
	}
	@DeleteMapping("/deleteCoupon/{couponId}")
	@PreAuthorize("hasRole('COMPANY')")
	public  ResponseEntity<?> deleteCoupon(@PathVariable("couponId") int couponId) throws Exception {
		Coupon coupon = couponRepository.findById(couponId).get();
		if (coupon != null)
		{
			companyServ.deleteCoupon(coupon);
			return new ResponseEntity<>("the Coupon with id " + coupon.getId() + " deleted", HttpStatus.OK);
		}
		return new ResponseEntity<>("the Coupon not found", HttpStatus.BAD_REQUEST);
	}
	@GetMapping("/getAllCoupons/{companyId}")
	@PreAuthorize("hasRole('COMPANY')")
	public List<Coupon> getAllCoupons(@PathVariable("companyId") int companyId){
		return companyServ.getAllCoupons(companyId);
	}
	
	@GetMapping("/getAllCouponsByCategory/{category}/{companyId}")
	@PreAuthorize("hasRole('COMPANY')")
	public List<Coupon> getAllCouponsByCategory(@PathVariable("category") Category category,@PathVariable("companyId") int companyId){
		return companyServ.getAllCouponsByCategory(category,companyId);
	}
	
	@GetMapping("/getAllCouponsByMaxPrice/{maxPrice}/{companyId}")
	@PreAuthorize("hasRole('COMPANY')")
	public List<Coupon> getAllCouponsByMaxPrice(@PathVariable("maxPrice") Integer max,@PathVariable("companyId") int companyId){
		return companyServ.getAllCouponsByMaxPrice(max,companyId);
	}
	
	@GetMapping("/getCompanyId/{companyEmail}")
	@PreAuthorize("hasRole('COMPANY')")
	public Integer getCompanyId(@PathVariable("companyEmail") String email) {
		return companyServ.getCompanyIdByEmail(email);
	}
}
