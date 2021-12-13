package com.xyz.enterprise.learningmanagementsystem.repository;

import com.xyz.enterprise.learningmanagementsystem.entities.Category;
import com.xyz.enterprise.learningmanagementsystem.entities.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    Optional<Category> findByName(String categoryName);

    @Query(value = "select cr.course_id from course_review cr inner join course c on c.id = cr.course_id inner join topic t " +
            "on t.id = c.topic_id inner join subject s on s.id = t.subject_id inner join category cat " +
            "on cat.id = s.category_id  where cat.name =:categoryName and  cr.course_id in (select id from course) " +
            "group by cr.course_id order by count(cr.review_id) desc limit 1", nativeQuery = true)
    Long findPopularCourseIdByCategory(@Param("categoryName") String categoryName);

}
