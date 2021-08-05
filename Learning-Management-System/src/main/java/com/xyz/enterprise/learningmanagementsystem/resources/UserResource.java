package com.xyz.enterprise.learningmanagementsystem.resources;

import com.xyz.enterprise.learningmanagementsystem.entities.Course;
import com.xyz.enterprise.learningmanagementsystem.entities.Review;
import com.xyz.enterprise.learningmanagementsystem.entities.User;
import com.xyz.enterprise.learningmanagementsystem.entities.UserPrincipal;
import com.xyz.enterprise.learningmanagementsystem.object_mapper.ReviewMapper;
import com.xyz.enterprise.learningmanagementsystem.object_mapper.dto.CourseReviews;
import com.xyz.enterprise.learningmanagementsystem.service.ReviewService;
import com.xyz.enterprise.learningmanagementsystem.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @PostMapping("submit-review/{id}")
    @PreAuthorize("hasAnyAuthority('role_admin','role_user','role_instructor')")
    public Review postReviews(@RequestBody Review review, @PathVariable int id) {

        User user = new User();
        Course course = new Course();
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder
                .getContext().getAuthentication()
                .getPrincipal();
        if (userService.findByUsername(principal.getUsername()).isEmpty()) {
            user.setUsername(principal.getUsername());
            user.setEnabled(principal.isEnabled());
            user.setScope(principal.getScope());
            userService.saveUser(user);
        } else if (userService.findByUsername(principal.getUsername()).get().getUsername().equals(principal.getUsername())) {
            user.setId(userService.findByUsername(principal.getUsername()).get().getId());
        }

        user.setId(user.getId());
        course.setId(id);
        review.setCourse(course);
        review.setUser(user);
        return reviewService.save(review);
    }

    @GetMapping("reviews-details/{id}")
    public ResponseEntity<List<CourseReviews>> findByCourseId(@PathVariable int id) {
        return new ResponseEntity<>(reviewMapper.modelsToDto(reviewService.findAllByCourse_Id(id)), HttpStatus.OK);
    }
}
