package com.xyz.enterprise.learningmanagementsystem.service;

import com.xyz.enterprise.learningmanagementsystem.entities.Course;
import com.xyz.enterprise.learningmanagementsystem.object_mapper.dto.AllCourse;
import com.xyz.enterprise.learningmanagementsystem.repository.CourseRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    public CourseServiceImpl(CourseRepository courseRepository, EntityManager entityManager) {
        this.courseRepository = courseRepository;
    }

    @Override
    public List<Course> findAll() {
        return courseRepository.findAll();
    }

    @Override
    public Optional<Course> findById(long id) {
        return courseRepository.findById(id);
    }

    @Override
    public Course save(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public void saveAll(List<Course> courses) {
        courseRepository.saveAll(courses);
    }

    @Override
    public Optional<Course> findByName(String courseName) {
        return courseRepository.findByCourseName(courseName);
    }

    @Override
    public void deleteById(long id) {
        courseRepository.deleteById(id);
    }

    @Override
    public Page<Course> findAll(Pageable pageable) {
        return courseRepository.findAll(pageable);
    }

    @Override
    public List<Course> findByCategoryName(String categoryName) {
        return courseRepository.findByCategoryName(categoryName);
    }

    @Override
    public Page<Course> findByCategoryNameByPage(String categoryName, Pageable pageable) {
        return courseRepository.findByCategoryNameByPage(categoryName, pageable);
    }


    @Override
    public List<Course> findBySubjectName(String subjectName) {
        return courseRepository.findBySubjectName(subjectName);
    }

    @Override
    public Page<Course> findBySubjectNameByPage(String subjectName, Pageable pageable) {
        return courseRepository.findBySubjectNameByPage(subjectName, pageable);
    }

    @Override
    public List<Course> findByTopic(String topicName) {
        return courseRepository.findByTopic(topicName);
    }

    @Override
    public Page<Course> findByTopicByPage(String topicName, Pageable pageable) {
        return courseRepository.findByTopicByPage(topicName, pageable);
    }

    @Override
    public List<Course> findNewCourses(String topicName) {
        return courseRepository.findNewCourses(topicName);
    }

    @Override
    public Page<Course> findCourseByUserEmail(String userEmail, Pageable pageable) {
        return courseRepository.findCourseByUserEmail(userEmail,pageable);
    }


}
