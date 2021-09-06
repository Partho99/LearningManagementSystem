package com.xyz.enterprise.learningmanagementsystem.object_mapper;

import com.xyz.enterprise.learningmanagementsystem.entities.Review;
import com.xyz.enterprise.learningmanagementsystem.object_mapper.dto.ReviewsDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.UUID;

@Mapper(componentModel = "spring", imports = UUID.class, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewMapper {

    ReviewMapper INSTANCE = Mappers.getMapper(ReviewMapper.class);

    @Mapping(source = "review.user.email", target = "email")
    @Mapping(source = "review.user.imageUrl", target = "imageUrl")
    @Mapping(source = "review.user.fullName", target = "fullName")
    @Mapping(source = "review.createdDate", target = "created_time")
    ReviewsDto modelToDto(Review review);

    List<ReviewsDto> modelsToDto(List<Review> review);


    Review dtoToModel(ReviewsDto courseReviews);
}
