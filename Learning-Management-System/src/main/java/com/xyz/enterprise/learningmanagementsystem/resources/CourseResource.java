package com.xyz.enterprise.learningmanagementsystem.resources;

import com.xyz.enterprise.learningmanagementsystem.entities.*;
import com.xyz.enterprise.learningmanagementsystem.object_mapper.CourseMapper;
import com.xyz.enterprise.learningmanagementsystem.object_mapper.dto.AllCourse;
import com.xyz.enterprise.learningmanagementsystem.object_mapper.dto.CourseDto;
import com.xyz.enterprise.learningmanagementsystem.object_mapper.dto.CoursePageDto;
import com.xyz.enterprise.learningmanagementsystem.service.CourseService;
import com.xyz.enterprise.learningmanagementsystem.service.PurchasedCourseService;
import com.xyz.enterprise.learningmanagementsystem.service.ReviewService;
import com.xyz.enterprise.learningmanagementsystem.service.UserService;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.*;


@RestController
@CrossOrigin("*")
@RequestMapping("/course/api/")
public class CourseResource {

    private final CourseService courseService;
    private final UserService userService;
    private final CourseMapper courseMapper;
    private final ReviewService reviewService;
    private final PurchasedCourseService purchasedCourseService;

    public CourseResource(CourseService courseService, UserService userService, CourseMapper courseMapper, ReviewService reviewService, PurchasedCourseService purchasedCourseService) {
        this.courseService = courseService;
        this.userService = userService;
        this.courseMapper = courseMapper;
        this.reviewService = reviewService;
        this.purchasedCourseService = purchasedCourseService;
    }

    @PostMapping("save/{id}")
    @PreAuthorize("hasAnyAuthority('role_admin','role_user','role_instructor')")
    public Course saveCourse(@RequestBody Course course, @PathVariable int id) {
        User user = new User();
        Image image = new Image();
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder
                .getContext().getAuthentication()
                .getPrincipal();
        Topic topic = new Topic();
        topic.setId(id);
        course.setTopic(topic);
        image.setImageUrl(course.getCourseImage());
        if (userService.findByEmail(principal.getEmail()).isEmpty()) {
            user.setEmail(principal.getEmail());
            user.setEnabled(principal.isEnabled());
            user.setScope(principal.getScope());
            userService.saveUser(user);
        } else if (userService.findByEmail(principal.getEmail()).get().getEmail().equals(principal.getEmail())) {
            user.setId(userService.findByEmail(principal.getEmail()).get().getId());
        }

        user.setId(user.getId());
        course.setUser(user);
        course.setImage(image);
        courseService.save(course);
        return course;
    }

    @Value("${image.upload.path}")
    String uploadPath;

    @Value("${image.upload.uri}")
    String uploadUri;

    @PostMapping(value = "save-course-image", consumes = "multipart/form-data")
    @PreAuthorize("hasAnyAuthority('role_admin','role_user','role_instructor')")
    public String saveCourseImage(@RequestPart("imageFile") MultipartFile imageFile) throws IOException {
        String sourceName;
        String sourceExt;
        File destFile;
        String destFileName;
        do {
            sourceName = imageFile.getOriginalFilename();
            sourceExt = FilenameUtils.getExtension(sourceName);
            destFileName = RandomStringUtils.randomAlphabetic(18).concat(".").concat(sourceExt);
            destFile = new File(uploadPath.concat(destFileName));
        }
        while (destFile.exists());
        imageFile.transferTo(destFile);
        return "/assets/images/course-images/" + destFileName;
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAnyAuthority('role_admin','role_user')")
    public String deleteCourseById(@PathVariable Long id) {

        if (reviewService.findAllByCourse_Id(id) != null) {
            reviewService.deleteAllByCourseId(id);
        }
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
    public ResponseEntity<?> findByCategoryByPage(@PathVariable("categoryName") String categoryName, @PathVariable("page") int page) {
        Pageable pageable = PageRequest.of(page, 9);
        Page<Course> coursePage = courseService.findByCategoryNameByPage(categoryName, pageable);
        return getCoursesByPage(pageable, coursePage);
    }

    @GetMapping("show-course-by-subject/{subjectName}")
    public List<Course> findBySubject(@PathVariable String subjectName) {
        return courseService.findBySubjectName(subjectName);
    }

    @GetMapping("show-course-by-subject/{subjectName}/{page}")
    public ResponseEntity<?> findBySubjectByPage(@PathVariable String subjectName, @PathVariable("page") int page) {
        Pageable pageable = PageRequest.of(page, 6);
        Page<Course> coursePage = courseService.findBySubjectNameByPage(subjectName, pageable);
        return getCoursesByPage(pageable, coursePage);
    }

    @GetMapping("show-course-by-topic/{topicName}")
    public List<Course> findByTopic(@PathVariable String topicName) {
        return courseService.findByTopic(topicName);
    }

    @GetMapping("show-course-by-topic/{topicName}/{page}")
    public ResponseEntity<?> findByTopicByPage(@PathVariable String topicName, @PathVariable("page") int page) {
        Pageable pageable = PageRequest.of(page, 6);
        Page<Course> coursePage = courseService.findByTopicByPage(topicName, pageable);
        return getCoursesByPage(pageable, coursePage);
    }

    @PostMapping("submit-course-review/{id}")
    @PreAuthorize("hasAnyAuthority('role_admin','role_user','role_instructor')")
    public Review courseReviews(@RequestBody Review review, @PathVariable int id) {

        User user = new User();
        Course course = new Course();
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder
                .getContext().getAuthentication()
                .getPrincipal();

        if (userService.findByEmail(principal.getEmail()).isEmpty()) {
            user.setFullName(principal.getFullName());
            user.setEmail(principal.getEmail());
            user.setEnabled(principal.isEnabled());
            user.setScope(principal.getScope());
            userService.saveUser(user);
        } else if (userService.findByEmail(principal.getEmail()).get().getEmail().equals(principal.getEmail())) {
            user.setId(userService.findByEmail(principal.getEmail()).get().getId());
        }

        user.setId(user.getId());
        course.setId(id);
        review.setCourse(course);
        review.setUser(user);
        return reviewService.save(review);
    }

    @GetMapping("show-course-rating-details/{id}")
    public ResponseEntity<?> showCourseRatingDetails(@PathVariable("id") long id) {
        return new ResponseEntity<>(reviewService.findByCourseIdAndRatingSum(id), HttpStatus.OK);
    }

    @PostMapping("purchase-course/{courseId}")
    @PreAuthorize("hasAnyAuthority('role_admin','role_user','role_instructor')")
    public ResponseEntity<?> purchaseCourse(@PathVariable("courseId") Long courseId) throws SQLException {
        PurchasedCourse purchasedCourse = new PurchasedCourse();
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder
                .getContext().getAuthentication()
                .getPrincipal();
        Map<String, Boolean> checkStatus = new HashMap<>();
        Long id = userService.findByEmail(principal.getEmail()).get().getId();
        List<PurchasedCourse> oPurchasedCourse = purchasedCourseService.findByUserId(id);

        for (PurchasedCourse pC : oPurchasedCourse) {
            if (pC.getCourseId().equals(courseId)) {
                throw new SQLException("Already purchased!");
            } else {
                purchasedCourse.setCourseId(courseId);
                purchasedCourse.setUserId(id);
                purchasedCourseService.save(purchasedCourse);
                checkStatus.put("purchase_status", true);
            }
        }
        purchasedCourse.setCourseId(courseId);
        purchasedCourse.setUserId(id);
        purchasedCourseService.save(purchasedCourse);
        checkStatus.put("purchase_status", true);
        return new ResponseEntity<>(checkStatus, HttpStatus.OK);
    }

    @GetMapping("check-course-purchase-status/{courseId}")
    public ResponseEntity<?> checkCoursePurchaseStatus(@PathVariable("courseId") Long courseId) {
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder
                .getContext().getAuthentication()
                .getPrincipal();
        Map<String, Boolean> checkStatus = new HashMap<>();
        if (principal == null) {
            checkStatus.put("purchase_status", false);
        } else {
            Long id = userService.findByEmail(principal.getEmail()).get().getId();
            List<PurchasedCourse> oPurchasedCourse = purchasedCourseService.findByUserId(id);
            for (PurchasedCourse pC : oPurchasedCourse) {
                System.out.println(pC.getCourseId());
                if (pC.getCourseId().equals(courseId)) {
                    checkStatus.put("purchase_status", true);
                    break;
                } else {
                    checkStatus.put("purchase_status", false);
                }
            }
        }


        return new ResponseEntity<>(checkStatus, HttpStatus.OK);
    }

    @GetMapping("show-new-courses/{topicName}")
    public ResponseEntity<?> showNewCourses(@PathVariable String topicName) {
        List<Course> newCourses = courseService.findNewCourses(topicName);
        List<CoursePageDto> newCoursePageDtoList = new ArrayList<>();
        for (Course course : newCourses) {
            CoursePageDto coursePageDto = new CoursePageDto();
            coursePageDto.setId(course.getId());
            coursePageDto.setCreatedBy(course.getCreatedBy());
            coursePageDto.setCourseName(course.getCourseName());
            coursePageDto.setCreated_time(course.getCreatedDate());
            coursePageDto.setRating_details(reviewService.findByCourseIdAndRatingSum(course.getId()));
            coursePageDto.setTopic(course.getTopic());
            coursePageDto.setUser(course.getUser());
            try {
                coursePageDto.setImageUrl(Optional.ofNullable(course.getImage().getImageUrl()));
            } catch (NullPointerException nE) {
                coursePageDto.setImageUrl(null);
            }
            newCoursePageDtoList.add(coursePageDto);
        }
        return new ResponseEntity<>(newCoursePageDtoList, HttpStatus.OK);
    }

    @GetMapping("show-course-created-by-instructor/{email}/{page}")
    public ResponseEntity<?> showCoursesCreatedByUser(@PathVariable("email") String email, @PathVariable("page") int page) {
        Pageable pageable = PageRequest.of(page, 6);
        Page<Course> coursePage = courseService.findCourseByUserEmail(email, pageable);
        return getCoursesByPage(pageable, coursePage);
    }

    /**
     * This below code is behaving like util class
     */
    private ResponseEntity<?> getCoursesByPage(Pageable pageable, Page<Course> coursePage) {
        List<CoursePageDto> coursePageDtoList = new ArrayList<>();
        for (Course course : coursePage) {
            CoursePageDto coursePageDto = new CoursePageDto();
            coursePageDto.setId(course.getId());
            coursePageDto.setCreatedBy(course.getCreatedBy());
            coursePageDto.setCourseName(course.getCourseName());
            coursePageDto.setCreated_time(course.getCreatedDate());
            coursePageDto.setRating_details(reviewService.findByCourseIdAndRatingSum(course.getId()));
            coursePageDto.setTopic(course.getTopic());
            coursePageDto.setUser(course.getUser());
            coursePageDto.setSections(course.getSections());
            try {
                coursePageDto.setImageUrl(Optional.ofNullable(course.getImage().getImageUrl()));
            } catch (NullPointerException nE) {
                coursePageDto.setImageUrl(null);
            }

            coursePageDtoList.add(coursePageDto);
        }
        final Page<CoursePageDto> pageData = new PageImpl<>(coursePageDtoList, pageable, coursePage.getTotalElements());
        return new ResponseEntity<>(pageData, HttpStatus.OK);
    }
}
