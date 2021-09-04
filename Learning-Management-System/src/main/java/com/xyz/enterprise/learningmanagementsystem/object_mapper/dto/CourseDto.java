package com.xyz.enterprise.learningmanagementsystem.object_mapper.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.xyz.enterprise.learningmanagementsystem.entities.CourseOverview;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;
import java.util.Optional;

public class CourseDto {
    private long id;
    private String name;
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Optional<Date> created_time;
    private Optional<String> createdBy;
    private RatingDetailsDto ratingDetailsDto;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public Optional<Date> getCreated_time() {
        return created_time;
    }

    public void setCreated_time(Optional<Date> created_time) {
        this.created_time = created_time;
    }

    public Optional<String> getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Optional<String> createdBy) {
        this.createdBy = createdBy;
    }

    public RatingDetailsDto getRatingDetailsDto() {
        return ratingDetailsDto;
    }

    public void setRatingDetailsDto(RatingDetailsDto ratingDetailsDto) {
        this.ratingDetailsDto = ratingDetailsDto;
    }
}
