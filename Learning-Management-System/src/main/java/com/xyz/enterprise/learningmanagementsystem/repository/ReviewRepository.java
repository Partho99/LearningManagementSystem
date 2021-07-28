package com.xyz.enterprise.learningmanagementsystem.repository;

import com.xyz.enterprise.learningmanagementsystem.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface ReviewRepository extends JpaRepository<Review,Integer> {
}
