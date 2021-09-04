package com.xyz.enterprise.learningmanagementsystem.repository;

import com.xyz.enterprise.learningmanagementsystem.entities.PurchasedCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface PurchasedCourseRepository extends JpaRepository<PurchasedCourse, Long> {

    List<PurchasedCourse> findByUserId(Long userId);

    List<PurchasedCourse> findByCourseId(Long courseId);
}
