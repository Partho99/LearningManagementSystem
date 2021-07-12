package com.xyz.enterprise.learningmanagementsystem.resources;

import com.xyz.enterprise.learningmanagementsystem.dto.SubjectDto;
import com.xyz.enterprise.learningmanagementsystem.entities.Subject;
import com.xyz.enterprise.learningmanagementsystem.object_mapper.SubjectMapper;
import com.xyz.enterprise.learningmanagementsystem.service.SubjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/subject/api/")
public class SubjectResource {


    private final SubjectService subjectService;
    private final SubjectMapper subjectMapper;

    public SubjectResource(SubjectService subjectService, SubjectMapper subjectMapper) {
        this.subjectService = subjectService;
        this.subjectMapper = subjectMapper;
    }

    @PostMapping("save")
    public void saveSubject(@RequestBody Subject subject) {
        subjectService.save(subject);
    }

    @GetMapping("show-subject-details/{subjectName}")
    public Optional<Subject> findSubjectByName(@PathVariable String subjectName) {
        return subjectService.findByName(subjectName);
    }

    @GetMapping("show-all-subject")
    public List<SubjectDto> showAllSubjects() {

        List<Subject> subjects = subjectService.findAll();
        List<SubjectDto> subjectDto = subjectMapper.entityToDto(subjects);
        return subjectDto;
    }
}
