package com.xyz.enterprise.learningmanagementsystem.service;

import com.xyz.enterprise.learningmanagementsystem.entities.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    List<Category> findAll();

    Optional<Category> findById(int id);

    Category save(Category category);

    void saveAll(List<Category> categories);

    Optional<Category> findByName(String categoryName);

    void deleteById(int id);
}
