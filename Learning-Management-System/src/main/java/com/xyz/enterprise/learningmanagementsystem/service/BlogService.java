package com.xyz.enterprise.learningmanagementsystem.service;

import com.xyz.enterprise.learningmanagementsystem.entities.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface BlogService {

    List<Blog> findAll();

    Page<Blog> findAll(Pageable pageable);

    Optional<Blog> findById(long id);

    Blog save(Blog blog);

    void saveAll(List<Blog> blogs);

    Optional<Blog> findByTitle(String blogTitle);

    void deleteById(long id);

    Blog findPopularBlog();
}
