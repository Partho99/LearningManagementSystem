package com.xyz.enterprise.learningmanagementsystem.repository;

import com.xyz.enterprise.learningmanagementsystem.entities.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Integer> {

    Optional<Topic> findByName(String topicName);

    @Query(value = "select distinct * from topic t inner join subject s on t.subject_id = s.id " +
            "inner join category c on s.category_id=c.id where c.name =:categoryName", nativeQuery = true)
    List<Topic> findTopicByCategoryName(@Param("categoryName") String categoryName);
}
