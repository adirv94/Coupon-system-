package jbc.com.service;

import java.util.List;
import java.util.Set;

import jbc.com.model.Category;
import jbc.com.model.Coupon;
import jbc.com.model.Customer;

public interface CustomerService {

	public void buyCoupon(Coupon coupon,int customerId);
	public List<Coupon> getAllNonePurchaseCoupons(int customerId);
	public Set<Coupon> getPurchaseCoupons(int customerId);
	public List<Coupon> getPurchaseCouponsByCategory(Category category, int customerId);
	public List<Coupon> getPurchaseCouponsByMaxPrice(int max, int customerId);
	Integer getCustomerIdByEmail(String email);

}
