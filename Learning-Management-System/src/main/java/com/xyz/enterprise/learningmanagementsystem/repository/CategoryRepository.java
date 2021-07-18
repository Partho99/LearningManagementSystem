package com.xyz.enterprise.learningmanagementsystem.repository;

import com.xyz.enterprise.learningmanagementsystem.entities.Category;
import com.xyz.enterprise.learningmanagementsystem.entities.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Optional<Category> findByName(String categoryName);

}
