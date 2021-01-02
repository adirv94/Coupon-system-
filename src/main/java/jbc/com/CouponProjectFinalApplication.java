package jbc.com;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.validation.Validator;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.bind.annotation.CrossOrigin;



@CrossOrigin
@EnableJpaRepositories
@Configuration
@SpringBootApplication
public class CouponProjectFinalApplication {

	public static void main(String[] args) {
		ApplicationContext context  = SpringApplication.run(CouponProjectFinalApplication.class, args);
		Test test = context.getBean(Test.class);

		test.testAll();

	}

}
