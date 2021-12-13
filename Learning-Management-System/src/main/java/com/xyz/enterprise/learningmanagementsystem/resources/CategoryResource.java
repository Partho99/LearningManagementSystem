package com.xyz.enterprise.learningmanagementsystem.resources;

import com.xyz.enterprise.learningmanagementsystem.entities.Category;
import com.xyz.enterprise.learningmanagementsystem.entities.Course;
import com.xyz.enterprise.learningmanagementsystem.entities.Subject;
import com.xyz.enterprise.learningmanagementsystem.entities.Topic;
import com.xyz.enterprise.learningmanagementsystem.object_mapper.dto.CoursePageDto;
import com.xyz.enterprise.learningmanagementsystem.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/category/api/")
public class CategoryResource {

    private final CategoryService categoryService;
    private final SubjectService subjectService;
    private final TopicService topicService;
    private final CourseService courseService;
    private final ReviewService reviewService;

    public CategoryResource(CategoryService categoryService, SubjectService subjectService, TopicService topicService,
                            CourseService courseService, ReviewService reviewService) {
        this.categoryService = categoryService;
        this.subjectService = subjectService;
        this.topicService = topicService;
        this.courseService = courseService;
        this.reviewService = reviewService;
    }

    @PostMapping("save")
    public void saveCategory(@RequestBody Category category) {
        List<Subject> subjects = category.getSubjects();
        List<Topic> topics;

        categoryService.save(category);

        subjects.forEach(s -> s.setCategory(category));
        subjectService.saveAll(subjects);

        for (Subject subject : subjects) {
            topics = subject.getTopics();
            topics.forEach(t -> t.setSubject(subject));
            topicService.saveAll(topics);
        }

    }

    @GetMapping("find-all")
    public List<Category> findAllCategory() {
        return categoryService.findAll();
    }

    @DeleteMapping("delete/{id}")
    public void deleteCategoryById(@PathVariable int id) {
        categoryService.deleteById(id);
    }

    @GetMapping("popular/{categoryName}")
    public ResponseEntity<?> showOne(@PathVariable String categoryName) {
        Long courseId = categoryService.findPopularCourseIdByCategory(categoryName);
        Optional<Course> course = courseService.findById(courseId);

        CoursePageDto popularCourse = new CoursePageDto();
        popularCourse.setId(course.get().getId());
        popularCourse.setCreatedBy(course.get().getCreatedBy());
        popularCourse.setCourseName(course.get().getCourseName());
        popularCourse.setCreated_time(course.get().getCreatedDate());
        popularCourse.setRating_details(reviewService.findByCourseIdAndRatingSum(course.get().getId()));
        popularCourse.setTopic(course.get().getTopic());
        popularCourse.setUser(course.get().getUser());
        popularCourse.setSections(course.get().getSections());
        try {
            popularCourse.setImageUrl(Optional.ofNullable(course.get().getImage().getImageUrl()));
        } catch (NullPointerException nE) {
            popularCourse.setImageUrl(null);
        }

        return new ResponseEntity<>(popularCourse, HttpStatus.OK);
    }

}
