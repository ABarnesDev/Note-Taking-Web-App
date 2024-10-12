package com.notes.server.controllers;

import com.notes.server.dto.TagDto;
import com.notes.server.dto.UserDto;
import com.notes.server.services.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/tags")
@RestController
public class TagController {

    private final TagService tagService;

    @GetMapping("/")
    public List<TagDto> getTags(@AuthenticationPrincipal UserDto userDto) {
        return tagService.getTagsByUser(userDto.getId());
    }
    @PostMapping("/add")
    public TagDto addTagToNote(@AuthenticationPrincipal UserDto userDto, @RequestBody TagDto tagDto, @RequestParam int noteId) {
        return tagService.addTagToNote(tagDto, userDto.getId(), noteId);
    }

    @PostMapping("/remove")
    public void removeTagFromNote(@AuthenticationPrincipal UserDto userDto, @RequestBody TagDto tagDto, @RequestParam int noteId) {
        tagService.removeTagFromNote(tagDto, userDto.getId(), noteId);
    }

    @DeleteMapping("/delete")
    public void deleteTag(@AuthenticationPrincipal UserDto userDto, @RequestParam int tagId) {
        tagService.deleteTag(tagId, userDto.getId());
    }
}
