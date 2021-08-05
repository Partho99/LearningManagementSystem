package com.xyz.enterprise.learningmanagementsystem.object_mapper;

import com.xyz.enterprise.learningmanagementsystem.entities.Review;
import com.xyz.enterprise.learningmanagementsystem.object_mapper.dto.CourseReviews;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.UUID;

@Mapper(componentModel = "spring", imports = UUID.class)
public interface ReviewMapper {

    ReviewMapper INSTANCE = Mappers.getMapper(ReviewMapper.class);

    @Mapping(source = "review.user.username", target = "username")
    @Mapping(source = "review.createdDate", target = "created_time")
    CourseReviews modelToDto(Review review);

    List<CourseReviews> modelsToDto(List<Review> review);


    Review dtoToModel(CourseReviews courseReviews);
}
