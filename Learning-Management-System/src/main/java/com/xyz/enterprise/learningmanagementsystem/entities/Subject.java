package com.xyz.enterprise.learningmanagementsystem.entities;

import javax.persistence.*;
import java.util.List;

@Entity
public class Subject extends AuditableEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;

    @OneToMany
    private List<Topic> topics;

}
