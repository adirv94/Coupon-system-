package jbc.com.Job;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import jbc.com.model.Coupon;
import jbc.com.repo.CouponRepository;


@Component
@Scope("singleton")
public class Job implements Runnable{

	@Autowired
	protected CouponRepository coupServImpl;
	private boolean flag;
	Date date;
	ArrayList<Coupon> arr;
	LocalDateTime now;
	
	@SuppressWarnings("deprecation")
	@Override
	public void run() {

		while(!flag) {
			arr = (ArrayList<Coupon>) coupServImpl.findAll();
			now = LocalDateTime.now();
			date = new Date(now.getYear(), now.getMonthValue(), now.getDayOfMonth());
			for (Coupon coupon : arr) {
				if(coupon.getEndDate().getDay()>date.getDay() && coupon.getEndDate().getMonth()>date.getMonth() && coupon.getEndDate().getYear()>date.getYear())
				{
					coupServImpl.deleteById(coupon.getId());
				}
			}
			try {
				Thread.sleep(864000000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}
	public void stop() {
		flag = true;
	}

}