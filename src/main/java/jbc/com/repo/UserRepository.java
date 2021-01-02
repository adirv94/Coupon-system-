package jbc.com.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import jbc.com.model.User;
import jbc.com.security.ApplictionUserRole;

import javax.transaction.Transactional;

public interface UserRepository extends JpaRepository<User, Integer>{
	Optional<User> findByEmail(String email);
	@Transactional
	@Modifying
	@Query("delete from User u where u.email = ?1")
	Integer deleteByEmail(String email);
}
