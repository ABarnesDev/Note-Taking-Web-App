package com.notes.server.services;

import com.notes.server.dao.NoteRepository;
import com.notes.server.dao.UserRepository;
import com.notes.server.dto.NoteDto;
import com.notes.server.dto.UserDto;
import com.notes.server.entities.Note;
import com.notes.server.entities.User;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class NoteServiceImpl implements NoteService {

    private final UserRepository userRepository;
    private final NoteRepository noteRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    @Override
    public NoteDto getNote(int noteId, UserDto userDto) {
        // Find a note by its id and the user's id
        Note note = noteRepository.findByIdAndUserId(noteId, userDto.getId());
        return modelMapper.map(note, NoteDto.class);
    }

    @Override
    public List<NoteDto> getNotesByUser(UserDto userDto) {
        // Find all the notes that belong to a specific user
        List<Note> notes = noteRepository.findByUserIdOrderByLastUpdateDesc(userDto.getId());
        return notes.stream().map(note -> modelMapper.map(note, NoteDto.class)).collect(Collectors.toList());
    }

    @Override
    public NoteDto createNote(UserDto userDto) {
        // Save a note to a specific user
        Note note = new Note();
        User user = userRepository.findById(userDto.getId()).get();
        note.setUser(user);
        Note newNote = noteRepository.save(note);

        return modelMapper.map(newNote, NoteDto.class);
    }

    @Override
    public NoteDto updateNote(NoteDto noteDto, UserDto userDto) {
        // Find, update, and save a note that belongs to a specific user
        Note note = noteRepository.findByIdAndUserId(noteDto.getId(), userDto.getId());
        note.setTitle(noteDto.getTitle());
        note.setContent(noteDto.getContent());
        Note updatedNote = noteRepository.save(note);
        return modelMapper.map(updatedNote, NoteDto.class);
    }

    @Override
    public void deleteNote(int noteId, UserDto userDto) {
        // Delete a note by its id and the user's id
        Note note = noteRepository.findByIdAndUserId(noteId, userDto.getId());
        noteRepository.delete(note);
    }
}
