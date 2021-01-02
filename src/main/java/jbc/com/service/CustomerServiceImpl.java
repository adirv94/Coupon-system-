package jbc.com.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import jbc.com.exception.ApiRequestException;
import org.springframework.stereotype.Service;

import jbc.com.model.Category;
import jbc.com.model.Coupon;
import jbc.com.model.Customer;

@Service
public class CustomerServiceImpl extends ClientService implements CustomerService {
	//Purchase a coupon
	public void buyCoupon(Coupon coupon, int customerId) {
		if (coupRepo.findById(coupon.getId()) == null) {
			throw new ApiRequestException("the coupon is not exsist");
		}
		Optional<Customer> byId = custRepo.findById(customerId);
		if (!byId.isPresent())
			throw new ApiRequestException("customer id not found");
		for (Coupon coup : byId.get().getCoupons()) {

			if (coup.getId() == coupon.getId()) {
				throw new ApiRequestException("u cant buy this coupon again");
			}
		}
		if (coupon.getAmount() < 0) {
			throw new ApiRequestException("u cant buy the coupon the amount is 0");
		}
		LocalDateTime now = LocalDateTime.now();
		if (coupon.getEndDate().toLocalDate().getYear() == now.getYear()) {
			if (coupon.getEndDate().toLocalDate().getMonth() == now.getMonth()) {
				if (coupon.getEndDate().toLocalDate().getDayOfMonth() < now.getDayOfMonth()) {
					throw new ApiRequestException("the coupon day expired");
				}
			} else if (coupon.getEndDate().toLocalDate().getMonthValue() < now.getMonth().getValue()) {
				throw new ApiRequestException("the coupon day expired");
			}
		} else if (coupon.getEndDate().toLocalDate().getYear() < now.getYear()) {
			throw new ApiRequestException("the coupon day expired");
		}
		coupon.setAmount(coupon.getAmount() - 1);
		Customer c = byId.get();
		Set<Coupon> coupons = c.getCoupons();
		coupons.add(coupon);
		c.setCoupons(coupons);
		custRepo.save(c);
	}

	@Override
	public List<Coupon> getAllNonePurchaseCoupons(int customerId) {
		Set<Coupon> purchaseCoupons = getPurchaseCoupons(customerId);
		Set<Coupon> allCoupons = coupRepo.findAll().stream().collect(Collectors.toSet());
		allCoupons.removeAll(purchaseCoupons);
		return allCoupons.stream().collect(Collectors.toList());
	}

	//Return all coupons purchased by the customer
	public Set<Coupon> getPurchaseCoupons(int customerId) {
		Optional<Customer> byId = custRepo.findById(customerId);
		if (byId.isPresent())
			return byId.get().getCoupons();
		throw new ApiRequestException("customer id not found");
	}

	//Return all coupons from a specific category purchased by the customer
	public List<Coupon> getPurchaseCouponsByCategory(Category category, int customerId) {
		Optional<Customer> byId = custRepo.findById(customerId);
		if (!byId.isPresent())
			throw new ApiRequestException("customer id not found");
		List<Coupon> newList = new ArrayList<Coupon>();
		for (Coupon coupon : byId.get().getCoupons()) {
			if (coupon.getCategory().equals(category)) {
				newList.add(coupon);
			}
		}
		return newList;

	}

	//Return all coupons up to the maximum price the customer purchased
	public List<Coupon> getPurchaseCouponsByMaxPrice(int max, int customerId) {
		Optional<Customer> byId = custRepo.findById(customerId);
		if (!byId.isPresent())
			throw new ApiRequestException("customer id not found");
		List<Coupon> newList = new ArrayList<Coupon>();
		for (Coupon coupon : byId.get().getCoupons()) {
			if (coupon.getPrice() < max) {
				newList.add(coupon);
			}
		}
		return newList;
	}

	@Override
	public Integer getCustomerIdByEmail(String email) {
		return custRepo.findCustomerByEmail(email).getId();
	}


}
