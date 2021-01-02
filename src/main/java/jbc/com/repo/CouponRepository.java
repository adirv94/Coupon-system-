package jbc.com.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jbc.com.model.Coupon;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Integer> {
	

}
