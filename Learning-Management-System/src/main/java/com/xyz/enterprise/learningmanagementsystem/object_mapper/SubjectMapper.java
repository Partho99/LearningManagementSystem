package com.xyz.enterprise.learningmanagementsystem.object_mapper;

import com.xyz.enterprise.learningmanagementsystem.object_mapper.dto.SubjectDto;
import com.xyz.enterprise.learningmanagementsystem.entities.Subject;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SubjectMapper {

    private final ModelMapper modelMapper;

    public SubjectMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public SubjectDto entityToDto(Subject subject) {
        SubjectDto subjectDto = modelMapper.map(subject, SubjectDto.class);
        return subjectDto;
    }

    public List<SubjectDto> entityToDto(List<Subject> subjects) {
        return subjects.stream().map(subject -> entityToDto(subject)).collect(Collectors.toList());
    }
}
