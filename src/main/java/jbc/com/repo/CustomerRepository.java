package jbc.com.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import jbc.com.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN 'true' ELSE 'false' END FROM Customer c WHERE c.email = ?1 AND c.password = ?2")
    public Boolean isCustomerExists(String email,String password);
    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN 'true' ELSE 'false' END FROM Customer c WHERE c.email = ?1")
    public boolean isCustomerEmailExists(String email);
    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN 'true' ELSE 'false' END FROM Customer c WHERE c.id = ?1")
    public boolean isCustomerIdExists(int id);
    public Customer findCustomerByEmail(String email);
}