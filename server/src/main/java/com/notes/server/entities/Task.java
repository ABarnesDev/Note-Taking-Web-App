package com.notes.server.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.*;

import java.time.*;

@Getter
@Setter
@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "content", length = Integer.MAX_VALUE)
    private String content;

    @Column(name = "is_completed")
    private Boolean isCompleted;

    @Column(name = "create_date")
    @JsonFormat(pattern = "yyyy-M-d")
    private LocalDate createDate;

    @UpdateTimestamp
    @Column(name = "last_update")
    private LocalDate lastUpdate;

}