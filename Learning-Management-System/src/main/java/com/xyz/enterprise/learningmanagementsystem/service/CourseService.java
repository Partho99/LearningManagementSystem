package com.xyz.enterprise.learningmanagementsystem.service;

import com.xyz.enterprise.learningmanagementsystem.entities.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CourseService {
    List<Course> findAll();

    Optional<Course> findById(long id);

    Course save(Course course);

    void saveAll(List<Course> courses);

    Optional<Course> findByName(String courseName);

    void deleteById(long id);

    Page<Course> findAll(Pageable pageable);

    List<Course> findByCategoryName(@Param("categoryName") String categoryName);

    Page<Course> findByCategoryNameByPage(@Param("categoryName") String categoryName, Pageable pageable);

    List<Course> findBySubjectName(@Param("subjectName") String subjectName);

    Page<Course> findBySubjectNameByPage(@Param("subjectName") String subjectName, Pageable pageable);

    List<Course> findByTopic(@Param("topicName") String topicName);

    Page<Course> findByTopicByPage(@Param("topicName") String topicName, Pageable pageable);
}
