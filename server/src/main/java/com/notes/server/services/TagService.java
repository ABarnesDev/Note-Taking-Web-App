package com.notes.server.services;

import com.notes.server.dto.TagDto;

import java.util.List;

public interface TagService {
    List<TagDto> getTagsByUser(int userId);
    TagDto addTagToNote(TagDto tagDto, int userId, int noteId);
    void removeTagFromNote(TagDto tagDto, int userId, int noteId);
    void deleteTag(int tagId, int userId);
}
