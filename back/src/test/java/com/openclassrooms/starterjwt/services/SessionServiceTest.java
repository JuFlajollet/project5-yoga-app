package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.exception.NotFoundException;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertThrowsExactly;
import static org.mockito.Mockito.when;

@SpringBootTest
public class SessionServiceTest {

    private SessionService service;

    @Mock
    private SessionRepository sessionRepository;
    @Mock
    private UserRepository userRepository;

    @BeforeEach
    public void init() {
        service = new SessionService(sessionRepository, userRepository);
    }

    @Test
    public void participate_shouldSaveSession_givenIdAndUserId() {
        Long id = 1L;
        Long userId = 1L;
        User mockUser = new User();
        Session mockSession = new Session();
    }

    @Test
    public void participate_shouldThrowNotFoundException_whenSessionNotFound() {
        Long id = 1L;
        Long userId = 1L;
        User mockUser = new User();

        when(sessionRepository.findById(id)).thenReturn(Optional.empty());
        when(userRepository.findById(userId)).thenReturn(Optional.of(mockUser));

        assertThrowsExactly(NotFoundException.class, () -> service.participate(id, userId));
    }

    @Test
    public void participate_shouldThrowNotFoundException_whenUserNotFound() {
        Long id = 1L;
        Long userId = 1L;
        Session mockSession = new Session();

        when(sessionRepository.findById(id)).thenReturn(Optional.of(mockSession));
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrowsExactly(NotFoundException.class, () -> service.participate(id, userId));
    }
}
