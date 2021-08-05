package com.xyz.enterprise.learningmanagementsystem.resources;

import com.xyz.enterprise.learningmanagementsystem.entities.*;
import com.xyz.enterprise.learningmanagementsystem.object_mapper.CourseMapper;
import com.xyz.enterprise.learningmanagementsystem.object_mapper.dto.CourseDto;
import com.xyz.enterprise.learningmanagementsystem.service.CourseService;
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
@RequestMapping("/course/api/")
public class CourseResource {

    private final CourseService courseService;
    private final UserService userService;
    private final CourseMapper courseMapper;

    public CourseResource(CourseService courseService, UserService userService, CourseMapper courseMapper) {
        this.courseService = courseService;
        this.userService = userService;
        this.courseMapper = courseMapper;
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

    @GetMapping("show-all-courses-only")
    public ResponseEntity<List<CourseDto>> showAllCoursesOnly() {
        return new ResponseEntity<>(courseMapper.modelsToDto(courseService.findAll()), HttpStatus.OK);
    }

    @GetMapping("show-one/{id}")
    public Optional<Course> showOne(@PathVariable long id) {
        return courseService.findById(id);
    }

    @GetMapping("show-course-by-page/{page}")
    public Page<Course> showPageByPage(@PathVariable("page") int page) {
        Pageable pageable = PageRequest.of(page, 9);
        return courseService.findAll(pageable);
    }

    @GetMapping("show-course-by-category/{categoryName}")
    public List<Course> findByCategory(@PathVariable String categoryName) {
        return courseService.findByCategoryName(categoryName);
    }

    @GetMapping("show-course-by-category/{categoryName}/{page}")
    public Page<Course> findByCategoryByPage(@PathVariable("categoryName") String categoryName, @PathVariable("page") int page) {
        Pageable pageable = PageRequest.of(page, 6);
        return courseService.findByCategoryNameByPage(categoryName, pageable);
    }

    @GetMapping("show-course-by-subject/{subjectName}")
    public List<Course> findBySubject(@PathVariable String subjectName) {
        return courseService.findBySubjectName(subjectName);
    }

    @GetMapping("show-course-by-subject/{subjectName}/{page}")
    public Page<Course> findBySubjectByPage(@PathVariable String subjectName, @PathVariable("page") int page) {
        Pageable pageable = PageRequest.of(page, 6);
        return courseService.findBySubjectNameByPage(subjectName, pageable);
    }

    @GetMapping("show-course-by-topic/{topicName}")
    public List<Course> findByTopic(@PathVariable String topicName) {
        return courseService.findByTopic(topicName);
    }

    @GetMapping("show-course-by-topic/{topicName}/{page}")
    public Page<Course> findByTopicByPage(@PathVariable String topicName, @PathVariable("page") int page) {
        Pageable pageable = PageRequest.of(page, 6);
        return courseService.findByTopicByPage(topicName, pageable);
    }
}
