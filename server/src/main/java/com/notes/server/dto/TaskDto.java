package com.notes.server.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.*;

@Getter
@Setter
public class TaskDto {
    private int id;
    private String content;
    private Boolean isCompleted;
    @JsonFormat(pattern = "yyyy-M-d")
    private LocalDate createDate;
    private LocalDate lastUpdate;
}
