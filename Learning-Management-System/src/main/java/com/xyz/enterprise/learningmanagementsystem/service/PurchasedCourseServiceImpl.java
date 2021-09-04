package com.xyz.enterprise.learningmanagementsystem.service;

import com.xyz.enterprise.learningmanagementsystem.entities.PurchasedCourse;
import com.xyz.enterprise.learningmanagementsystem.repository.PurchasedCourseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PurchasedCourseServiceImpl implements PurchasedCourseService {

    private final PurchasedCourseRepository purchasedCourseRepository;

    public PurchasedCourseServiceImpl(PurchasedCourseRepository purchasedCourseRepository) {
        this.purchasedCourseRepository = purchasedCourseRepository;
    }

    @Override
    public List<PurchasedCourse> findAll() {
        return purchasedCourseRepository.findAll();
    }

    @Override
    public Optional<PurchasedCourse> findById(Long id) {
        return purchasedCourseRepository.findById(id);
    }

    @Override
    public List<PurchasedCourse> findByUserId(Long userId) {
        return purchasedCourseRepository.findByUserId(userId);
    }

    @Override
    public List<PurchasedCourse> findByCourseId(Long courseId) {
        return purchasedCourseRepository.findByCourseId(courseId);
    }

    @Override
    public PurchasedCourse save(PurchasedCourse purchasedCourse) {
        return purchasedCourseRepository.save(purchasedCourse);
    }
}
