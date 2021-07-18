package com.xyz.enterprise.learningmanagementsystem.service;

import com.xyz.enterprise.learningmanagementsystem.entities.Course;
import com.xyz.enterprise.learningmanagementsystem.entities.Subject;

import java.util.List;
import java.util.Optional;

public interface CourseService {
    List<Course> findAll();

    Optional<Course> findById(long id);

    Course save(Course course);

    void saveAll(List<Course> courses);

    Optional<Course> findByName(String courseName);

    void deleteById(long id);
}
