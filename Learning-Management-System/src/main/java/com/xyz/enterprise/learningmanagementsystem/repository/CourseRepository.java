package com.xyz.enterprise.learningmanagementsystem.repository;

import com.xyz.enterprise.learningmanagementsystem.entities.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface CourseRepository extends JpaRepository<Course, Long> {

    Optional<Course> findByName(String subjectName);

    Page<Course> findAll(Pageable pageable);

    @Query(value = "select * from course c inner join topic t on c.topic_id = t.id inner join subject s on s.id = t.subject_id" +
            " inner join category ca on ca.id = s.category_id where ca.name = :categoryName", nativeQuery = true)
    List<Course> findByCategoryName(@Param("categoryName") String categoryName);

    @Query(value = "select * from course c inner join topic t on c.topic_id = t.id inner join subject s " +
            "on s.id = t.subject_id where s.name = :subjectName", nativeQuery = true)
    List<Course> findBySubjectName(@Param("subjectName") String subjectName);

    @Query(value = "select * from course c inner join topic t on c.topic_id = t.id where t.name = :topicName", nativeQuery = true)
    List<Course> findByTopic(@Param("topicName") String topicName);
}
