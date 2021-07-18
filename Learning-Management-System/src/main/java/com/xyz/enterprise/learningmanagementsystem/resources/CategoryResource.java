package com.xyz.enterprise.learningmanagementsystem.resources;

import com.xyz.enterprise.learningmanagementsystem.entities.Category;
import com.xyz.enterprise.learningmanagementsystem.entities.Subject;
import com.xyz.enterprise.learningmanagementsystem.entities.Topic;
import com.xyz.enterprise.learningmanagementsystem.service.CategoryService;
import com.xyz.enterprise.learningmanagementsystem.service.SubjectService;
import com.xyz.enterprise.learningmanagementsystem.service.TopicService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/category/api/")
public class CategoryResource {

    private final CategoryService categoryService;
    private final SubjectService subjectService;
    private final TopicService topicService;

    public CategoryResource(CategoryService categoryService, SubjectService subjectService, TopicService topicService) {
        this.categoryService = categoryService;
        this.subjectService = subjectService;
        this.topicService = topicService;
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
}
