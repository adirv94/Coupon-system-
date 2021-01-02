package jbc.com.service;

import java.util.List;
import jbc.com.model.Category;
import jbc.com.model.Company;
import jbc.com.model.Coupon;


public interface CompanyService {

	public Coupon addCoupon(Coupon coupon,int companyId);
	public Coupon updateCoupon(Coupon coupon);
	public void deleteCoupon(Coupon coupon);
	public List<Coupon> getAllCoupons(int companyId);
	public List<Coupon> getAllCouponsByCategory(Category category,int companyId);
	public List<Coupon> getAllCouponsByMaxPrice(int max,int companyId);
	Integer getCompanyIdByEmail(String email);
}

