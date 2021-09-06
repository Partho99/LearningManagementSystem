package com.xyz.enterprise.learningmanagementsystem.repository;

import com.xyz.enterprise.learningmanagementsystem.entities.Review;
import com.xyz.enterprise.learningmanagementsystem.object_mapper.dto.RatingDetailsDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    List<Review> findByCourseIdOrderByCreatedDateAsc(long courseId);

    List<Review> findByBlogIdOrderByCreatedDateAsc(long blogId);

    @Query(value = "select count(*) total_user, sum(r.rating) rating_sum  from review r inner join blog_review br on r.id = br.review_id" +
            " right join blog b on  br.blog_id = b.id where b.id = :blogId", nativeQuery = true)
    RatingDetailsDto findByBlogIdAndRatingSum(@Param("blogId") long id);

    @Query(value = "select count(*) total_user, sum(r.rating) rating_sum from review r inner join course_review cr on " +
            "r.id = cr.review_id right join course c on  cr.course_id = c.id where c.id =:courseId",nativeQuery = true)
    Optional<RatingDetailsDto> findByCourseIdAndRatingSum(@Param("courseId") long courseId);
}
