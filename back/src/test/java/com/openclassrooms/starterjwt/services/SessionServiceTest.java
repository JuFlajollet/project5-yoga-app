package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.exception.BadRequestException;
import com.openclassrooms.starterjwt.exception.NotFoundException;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertThrowsExactly;
import static org.mockito.Mockito.*;

@SpringBootTest
public class SessionServiceTest {

    private SessionService service;

    @Mock
    private SessionRepository sessionRepository;
    @Mock
    private UserRepository userRepository;

    Long id;
    Long userId;
    User mockUser;
    Session mockSession;

    @BeforeEach
    public void init() {
        service = new SessionService(sessionRepository, userRepository);
        id = 1L;
        userId = 1L;
        mockSession = new Session();
        mockUser = new User();
    }

    @Test
    public void participate_shouldSaveSession_givenIdAndUserId() {
        mockUser = User.builder()
                .id(userId)
                .email("test@gmail.com")
                .firstName("test")
                .lastName("test")
                .password("password")
                .build();
        mockSession = Session.builder().users(new ArrayList<>()).build();

        when(sessionRepository.findById(id)).thenReturn(Optional.of(mockSession));
        when(userRepository.findById(userId)).thenReturn(Optional.of(mockUser));

        service.participate(id, userId);

        verify(sessionRepository, times(1)).save(mockSession);
    }

    @Test
    public void participate_shouldThrowNotFoundException_whenSessionNotFound() {
        when(sessionRepository.findById(id)).thenReturn(Optional.empty());

        assertThrowsExactly(NotFoundException.class, () -> service.participate(id, userId));
    }

    @Test
    public void participate_shouldThrowNotFoundException_whenUserNotFound() {
        when(sessionRepository.findById(id)).thenReturn(Optional.of(mockSession));
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrowsExactly(NotFoundException.class, () -> service.participate(id, userId));
    }

    @Test
    public void participate_shouldBadRequestException_whenUserAlreadyParticipate() {
        mockUser = User.builder()
                .id(userId)
                .email("test@gmail.com")
                .firstName("test")
                .lastName("test")
                .password("password")
                .build();
        mockSession = Session.builder().users(Arrays.asList(mockUser)).build();

        when(sessionRepository.findById(id)).thenReturn(Optional.of(mockSession));
        when(userRepository.findById(userId)).thenReturn(Optional.of(mockUser));

        assertThrowsExactly(BadRequestException.class, () -> service.participate(id, userId));
    }

    @Test
    public void noLongerParticipate_shouldThrowNotFoundException_whenSessionNotFound() {
        when(sessionRepository.findById(id)).thenReturn(Optional.empty());

        assertThrowsExactly(NotFoundException.class, () -> service.noLongerParticipate(id, userId));
    }

    @Test
    public void noLongerParticipate_shouldThrowBadRequestException_whenNoUserAlreadyParticipate() {
        mockUser = User.builder()
                .id(userId)
                .email("test@gmail.com")
                .firstName("test")
                .lastName("test")
                .password("password")
                .build();
        mockSession = Session.builder().users(new ArrayList<>()).build();

        when(sessionRepository.findById(id)).thenReturn(Optional.of(mockSession));

        assertThrowsExactly(BadRequestException.class, () -> service.noLongerParticipate(id, userId));
    }

    @Test
    public void noLongerParticipate_shouldSaveSession_givenIdAndUserId() {
        mockUser = User.builder()
                .id(userId)
                .email("test@gmail.com")
                .firstName("test")
                .lastName("test")
                .password("password")
                .build();
        mockSession = Session.builder().users(Arrays.asList(mockUser)).build();

        when(sessionRepository.findById(id)).thenReturn(Optional.of(mockSession));

        service.noLongerParticipate(id, userId);

        verify(sessionRepository, times(1)).save(mockSession);
    }
}
