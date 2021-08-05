package com.xyz.enterprise.learningmanagementsystem.service;

import com.xyz.enterprise.learningmanagementsystem.entities.Review;

import java.util.List;
import java.util.Optional;

public interface ReviewService {

    List<Review> findAll();

    Optional<Review> findById(int id);

    Review save(Review review);

    void saveAll(List<Review> subjects);

    Optional<Review> findByName(String subjectName);

    List<Review> findAllByCourse_Id(long id);
}