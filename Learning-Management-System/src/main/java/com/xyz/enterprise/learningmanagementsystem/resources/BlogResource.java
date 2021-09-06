package com.xyz.enterprise.learningmanagementsystem.resources;

import com.xyz.enterprise.learningmanagementsystem.entities.Blog;
import com.xyz.enterprise.learningmanagementsystem.entities.Review;
import com.xyz.enterprise.learningmanagementsystem.entities.User;
import com.xyz.enterprise.learningmanagementsystem.entities.UserPrincipal;
import com.xyz.enterprise.learningmanagementsystem.service.BlogService;
import com.xyz.enterprise.learningmanagementsystem.service.ReviewService;
import com.xyz.enterprise.learningmanagementsystem.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/blog/api/")
public class BlogResource {

    private final BlogService blogService;
    private final UserService userService;
    private final ReviewService reviewService;

    public BlogResource(BlogService blogService, UserService userService, ReviewService reviewService) {
        this.blogService = blogService;
        this.userService = userService;
        this.reviewService = reviewService;
    }


    @PostMapping("save")
    @PreAuthorize("hasAnyAuthority('role_admin','role_instructor')")
    public Blog saveBlog(@RequestBody Blog blog) {
        User user = new User();
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        if (userService.findByEmail(principal.getEmail()).isEmpty()) {
            user.setEmail(principal.getEmail());
            user.setEnabled(principal.isEnabled());
            user.setScope(principal.getScope());
            user.setImageUrl(user.getImageUrl());
            userService.saveUser(user);
        } else if (userService.findByEmail(principal.getEmail()).get().getEmail().equals(principal.getEmail())) {
            user.setId(userService.findByEmail(principal.getEmail()).get().getId());
        }

        user.setId(user.getId());
        blog.setUser(user);
        return blogService.save(blog);
    }

    @DeleteMapping("delete/{id}")
    public String deleteBlog(@PathVariable long id) {
        blogService.deleteById(id);
        return "id no : " + id + " is deleted";
    }

    @GetMapping("show-all-blogs")
    public List<Blog> showAllBlogs() {
        return blogService.findAll();
    }

    @GetMapping("show-all-blogs-by-page/{page}")
    public Page<Blog> showAllBlogsByPage(@PathVariable("page") int page) {
        Pageable pageable = PageRequest.of(page, 9);
        return blogService.findAll(pageable);
    }

    @GetMapping("show-one/{id}")
    public Optional<Blog> showOne(@PathVariable long id) {
        return blogService.findById(id);
    }

    @PostMapping("submit-blog-review/{id}")
    @PreAuthorize("hasAnyAuthority('role_admin','role_user','role_instructor')")
    public Review blogReviews(@RequestBody Review review, @PathVariable int id) {

        User user = new User();
        Blog blog = new Blog();
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder
                .getContext().getAuthentication()
                .getPrincipal();

        if (userService.findByEmail(principal.getEmail()).isEmpty()) {
            user.setFullName(principal.getFullName());
            user.setEmail(principal.getEmail());
            user.setEnabled(principal.isEnabled());
            user.setScope(principal.getScope());
            user.setImageUrl(principal.getImageUrl());
            userService.saveUser(user);
        } else if (userService.findByEmail(principal.getEmail()).get().getEmail().equals(principal.getEmail())) {
            user.setId(userService.findByEmail(principal.getEmail()).get().getId());
        }

        user.setId(user.getId());
        blog.setId(id);
        review.setBlog(blog);
        review.setUser(user);
        return reviewService.save(review);
    }

    @GetMapping("show-blog-rating-details/{id}")
    public ResponseEntity<?> showBlogRatingDetails(@PathVariable("id") long id) {
        return new ResponseEntity<>(reviewService.findByBlogIdAndRatingSum(id), HttpStatus.OK);
    }
}
