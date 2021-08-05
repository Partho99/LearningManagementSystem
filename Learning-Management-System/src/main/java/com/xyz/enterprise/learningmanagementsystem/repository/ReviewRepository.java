package com.xyz.enterprise.learningmanagementsystem.repository;

import com.xyz.enterprise.learningmanagementsystem.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface ReviewRepository extends JpaRepository<Review,Integer> {


    @Query(value = "select * from review r inner join user_review ur on r.id = ur.review_id " +
            "inner join user u on u.id = ur.user_id inner join course_review cr on cr.review_id = r.id inner join course " +
            "c on c.id = cr.course_id where c.id = :courseId", nativeQuery = true)
    List<Review> findByCourseId(@Param("courseId") long courseId);
}
