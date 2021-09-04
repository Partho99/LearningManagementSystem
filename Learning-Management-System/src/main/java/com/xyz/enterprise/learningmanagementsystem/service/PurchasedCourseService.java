package com.xyz.enterprise.learningmanagementsystem.service;

import com.xyz.enterprise.learningmanagementsystem.entities.PurchasedCourse;

import java.util.List;
import java.util.Optional;

public interface PurchasedCourseService {

    List<PurchasedCourse> findAll();

    Optional<PurchasedCourse> findById(Long id);

    List<PurchasedCourse> findByCourseId(Long courseId);

    List<PurchasedCourse> findByUserId(Long userId);

    PurchasedCourse save(PurchasedCourse purchasedCourse);
}
