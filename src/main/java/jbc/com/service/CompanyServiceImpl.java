package jbc.com.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import jbc.com.exception.ApiRequestException;
import org.springframework.stereotype.Service;

import jbc.com.model.Category;
import jbc.com.model.Company;
import jbc.com.model.Coupon;


@Service
public class CompanyServiceImpl extends ClientService implements CompanyService{

	//Adding a new coupon
	public Coupon addCoupon(Coupon coupon,int companyId) {
		Optional<Company> byId = compRepo.findById(companyId);
		if (!byId.isPresent()){
			throw new ApiRequestException("company id not found");
		}
		List<Coupon> coupons = byId.get().getCoupons();
		boolean flag=false;
		for (Coupon coup : coupons) {
			if (coup.getTitle().equals(coupon.getTitle())) {
				flag=true;
				break;
			}
		}
		if (flag) {
			throw new ApiRequestException("u cant add coupon with same title in same company");
		}
		else {
			Company c = byId.get();
			List<Coupon> list =c.getCoupons();
			list.add(coupon);
			c.setCoupons(list);
			c = compRepo.save(c);
			coupon = c.getCoupons().get(c.getCoupons().size()-1);
			return coupon;
		}

	}

	//Update existing coupon
	public Coupon updateCoupon(Coupon coupon) {
		for (Coupon coup : coupRepo.findAll()) {
			if (coup.getId() == coupon.getId()) {
				return coupRepo.save(coupon);
			}
		}
		throw new ApiRequestException("u cant update coupon id");
	}

	//Delete an existing coupon
	public void deleteCoupon(Coupon coupon) {
		coupRepo.deleteById(coupon.getId());
	}

	//Return all company coupons
	public List<Coupon> getAllCoupons(int companyId) {
		Optional<Company> optionalCompany = compRepo.findById(companyId);
		if (optionalCompany.isPresent()){
			return optionalCompany.get().getCoupons();
		}
		throw new ApiRequestException("no company found");
	}

	//Return all coupons from a specific category of the company
	public List<Coupon> getAllCouponsByCategory(Category category,int companyId) {
		List<Coupon> newList = new ArrayList<Coupon>();
		for (Coupon coupon : compRepo.findById(companyId).get().getCoupons()) {
			if (coupon.getCategory() == category) {
				newList.add(coupon);
			}
		}
		return newList;
	}

	//Return all coupons up to the company's maximum price
	public List<Coupon> getAllCouponsByMaxPrice(int max,int companyId) {
		Optional<Company> byId = compRepo.findById(companyId);
		if (!byId.isPresent()){
			throw new ApiRequestException("company id not found");
		}
		List<Coupon> newList = new ArrayList<Coupon>();
		for (Coupon coupon : byId.get().getCoupons()) {
			if (coupon.getPrice() < max) {
				newList.add(coupon);
			}
		}
		return newList;
	}

	@Override
	public Integer getCompanyIdByEmail(String email) {
		return compRepo.findCompanyByEmail(email).getId();
	}
}
