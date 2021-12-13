package com.xyz.enterprise.learningmanagementsystem.resources;

import com.xyz.enterprise.learningmanagementsystem.entities.*;
import com.xyz.enterprise.learningmanagementsystem.object_mapper.ReviewMapper;
import com.xyz.enterprise.learningmanagementsystem.object_mapper.dto.ReviewsDto;
import com.xyz.enterprise.learningmanagementsystem.service.ReviewService;
import com.xyz.enterprise.learningmanagementsystem.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/api/")
@CrossOrigin("*")
public class UserResource {

    private final UserService userService;
    private final ReviewService reviewService;
    private final ReviewMapper reviewMapper;

    public UserResource(UserService userService, ReviewService reviewService, ReviewMapper reviewMapper) {
        this.userService = userService;
        this.reviewService = reviewService;
        this.reviewMapper = reviewMapper;
    }


    @GetMapping("show-all-instructor")
    public List<User> findAllInstructor() {
        return userService.findAllInstructor();
    }

    @GetMapping("course-reviews-details/{id}")
    public ResponseEntity<List<ReviewsDto>> findByCourseId(@PathVariable long id) {
        return new ResponseEntity<>(reviewMapper.modelsToDto(reviewService.findAllByCourse_Id(id)), HttpStatus.OK);
    }

    @GetMapping("blog-reviews-details/{id}")
    public ResponseEntity<List<ReviewsDto>> findByBlogId(@PathVariable long id) {
        return new ResponseEntity<>(reviewMapper.modelsToDto(reviewService.findAllByBlog_Id(id)), HttpStatus.OK);
    }
}
