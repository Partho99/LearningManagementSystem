package com.xyz.enterprise.learningmanagementsystem.service;

import com.xyz.enterprise.learningmanagementsystem.entities.Review;
import com.xyz.enterprise.learningmanagementsystem.object_mapper.dto.RatingDetailsDto;
import com.xyz.enterprise.learningmanagementsystem.repository.ReviewRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override
    public List<Review> findAll() {
        return null;
    }

    @Override
    public Optional<Review> findById(int id) {
        return Optional.empty();
    }

    @Override
    public void deleteAllByCourseId(Long id) {
        reviewRepository.deleteAllByCourseId(id);
    }


    @Override
    public Review save(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public void saveAll(List<Review> subjects) {

    }

    @Override
    public Optional<Review> findByName(String subjectName) {
        return Optional.empty();
    }

    @Override
    public List<Review> findAllByCourse_Id(long id) {
        return reviewRepository.findByCourseIdOrderByCreatedDateAsc(id);
    }

    @Override
    public List<Review> findAllByBlog_Id(long blogId) {
        return reviewRepository.findByBlogIdOrderByCreatedDateAsc(blogId);
    }

    @Override
    public RatingDetailsDto findByBlogIdAndRatingSum(long blogId) {
        return reviewRepository.findByBlogIdAndRatingSum(blogId);
    }

    @Override
    public Optional<RatingDetailsDto> findByCourseIdAndRatingSum(long courseId) {
        return reviewRepository.findByCourseIdAndRatingSum(courseId);
    }
}
