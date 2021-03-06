package com.lms.authorizationserver.repository;

import com.lms.authorizationserver.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByEmail(String email);
}
