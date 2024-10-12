package com.notes.server.services;

import com.notes.server.dao.NoteRepository;
import com.notes.server.dao.TagRepository;
import com.notes.server.dto.TagDto;
import com.notes.server.entities.Note;
import com.notes.server.entities.Tag;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;
    private final NoteRepository noteRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<TagDto> getTagsByUser(int userId) {
        // Find all tags that belong to a specific user
        List<Tag> tags = tagRepository.findByUserIdOrderByName(userId);
        return tags.stream().map(tag -> modelMapper.map(tag, TagDto.class)).collect(Collectors.toList());
    }

    @Override
    public TagDto addTagToNote(TagDto tagDto, int userId, int noteId) {

        // Find a tag by its name and the user's id
        Tag tag = tagRepository.findByNameAndUserId(tagDto.getName(), userId);
        // Find a note by its id and the user's id
        Note note = noteRepository.findByIdAndUserId(noteId, userId);

        // If the tag doesn't exist, create a new tag
        if (tag == null) {
            tag = new Tag();
            tag.setName(tagDto.getName().toLowerCase());
            tag.setUser(note.getUser());
        }

        // Add the tag to the note and save it
        tag.getNotes().add(note);
        noteRepository.save(note);
        Tag newTag = tagRepository.save(tag);

        return modelMapper.map(newTag, TagDto.class);
    }

    @Override
    public void removeTagFromNote(TagDto tagDto, int userId, int noteId) {
        Note note = noteRepository.findByIdAndUserId(noteId, userId);
        Tag tag = tagRepository.findById(tagDto.getId()).get();

        tag.getNotes().remove(note);

        tagRepository.save(tag);

    }

    @Override
    @Transactional
    public void deleteTag(int tagId, int userId) {
        tagRepository.deleteByIdAndUserId(tagId, userId);
    }
}
