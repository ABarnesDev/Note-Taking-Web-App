package com.notes.server.dto;

import lombok.*;

import java.time.OffsetDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NoteDto {
    private Integer id;
    private String title;
    private String content;
    private OffsetDateTime createDate;
    private OffsetDateTime lastUpdate;
    private Set<TagDto> tags = new LinkedHashSet<>();
}
