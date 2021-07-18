package com.xyz.enterprise.learningmanagementsystem.repository;

import com.xyz.enterprise.learningmanagementsystem.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional
public interface CourseRepository extends JpaRepository<Course, Long> {
    Optional<Course> findByName(String subjectName);
}
