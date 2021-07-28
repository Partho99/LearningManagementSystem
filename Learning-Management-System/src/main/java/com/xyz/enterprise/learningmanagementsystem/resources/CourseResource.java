package com.xyz.enterprise.learningmanagementsystem.resources;

import com.xyz.enterprise.learningmanagementsystem.entities.*;
import com.xyz.enterprise.learningmanagementsystem.service.CourseService;
import com.xyz.enterprise.learningmanagementsystem.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/course/api/")
public class CourseResource {

    private final CourseService courseService;
    private final UserService userService;

    public CourseResource(CourseService courseService, UserService userService) {
        this.courseService = courseService;
        this.userService = userService;
    }

    @PostMapping("save/{id}")
    @PreAuthorize("hasAnyAuthority('role_admin','role_user','role_instructor')")
    public Course saveCourse(@RequestBody Course course, @PathVariable int id) {
        User user = new User();
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder
                .getContext().getAuthentication()
                .getPrincipal();
        Topic topic = new Topic();
        topic.setId(id);
        course.setTopic(topic);
        if (userService.findByUsername(principal.getUsername()).isEmpty()) {
            user.setUsername(principal.getUsername());
            user.setEnabled(principal.isEnabled());
            user.setScope(principal.getScope());
            userService.saveUser(user);
        } else if (userService.findByUsername(principal.getUsername()).get().getUsername().equals(principal.getUsername())) {
            user.setId(userService.findByUsername(principal.getUsername()).get().getId());
        }

        user.setId(user.getId());
        course.setUser(user);
        courseService.save(course);
        return course;
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAnyAuthority('role_admin','role_user')")
    public String deleteCourseById(@PathVariable long id) {
        courseService.deleteById(id);
        return "id no : " + id + " is deleted";
    }

    @GetMapping("show-all-courses")
    public List<Course> showAllCourses() {
        return courseService.findAll();
    }

    @GetMapping("show-one/{id}")
    public Optional<Course> showOne(@PathVariable long id) {
        return courseService.findById(id);
    }

    @GetMapping("show-course-by-page")
    public Page<Course> showPageByPage(Pageable pageable) {
        return courseService.findAll(pageable);
    }

    @GetMapping("show-course-by-category/{categoryName}")
    public List<Course> findByCategory(@PathVariable String categoryName) {
        return courseService.findByCategoryName(categoryName);
    }

    @GetMapping("show-course-by-subject/{subjectName}")
    public List<Course> findBySubject(@PathVariable String subjectName) {
        return courseService.findBySubjectName(subjectName);
    }

    @GetMapping("show-course-by-topic/{topicName}")
    public List<Course> findByTopic(@PathVariable String topicName) {
        return courseService.findByTopic(topicName);
    }
}
