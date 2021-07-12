package com.xyz.enterprise.learningmanagementsystem.entities;

import javax.persistence.*;

@Entity
public class CourseDescription extends AuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Lob
    private String description;

    @Lob
    private String learningFromThisCourse;

    @Lob
    private String eligibleForThisCourse;

    @Lob
    private String courseIncludes;

}
