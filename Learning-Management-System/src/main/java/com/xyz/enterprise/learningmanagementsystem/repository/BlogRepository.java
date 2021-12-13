package com.xyz.enterprise.learningmanagementsystem.repository;

import com.xyz.enterprise.learningmanagementsystem.entities.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional
public interface BlogRepository extends JpaRepository<Blog, Long> {
    Optional<Blog> findByTitle(String blogTitle);

    Page<Blog> findAll(Pageable pageable);

    default Blog findPopularBlog() {
        return null;
    }
}
