package com.xyz.enterprise.learningmanagementsystem.object_mapper;

import com.xyz.enterprise.learningmanagementsystem.entities.Course;
import com.xyz.enterprise.learningmanagementsystem.object_mapper.dto.CourseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.UUID;

@Mapper(componentModel = "spring", imports = UUID.class)
public interface CourseMapper {

    ReviewMapper INSTANCE = Mappers.getMapper(ReviewMapper.class);

    @Mapping(source = "course.createdDate", target = "created_time")
    CourseDto modelToDto(Course course);

    List<CourseDto> modelsToDto(List<Course> courses);
}
