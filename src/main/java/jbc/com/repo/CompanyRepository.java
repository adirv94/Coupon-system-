package jbc.com.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import jbc.com.model.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {
	
    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN 'true' ELSE 'false' END FROM Company c WHERE c.email = ?1 AND c.password = ?2")
    public Boolean isCompanyExists(String email,String password);
    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN 'true' ELSE 'false' END FROM Company c WHERE c.email = ?1")
	public boolean isCompanyEmailExists(String email);
    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN 'true' ELSE 'false' END FROM Company c WHERE c.name = ?1")
	public boolean isCompanyNameExists(String name);
    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN 'true' ELSE 'false' END FROM Company c WHERE c.id = ?1")
	public boolean isCompanyIdExists(int id);
    public Company findCompanyByEmail(String email);
}
