package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.*;

@SpringBootTest
public class UserServiceTest {

    private UserService service;

    @Mock
    private UserRepository userRepository;

    User user;

    @BeforeEach
    public void init(){
        service = new UserService(userRepository);
        user = User.builder()
                .id(1L)
                .email("test@gmail.com")
                .firstName("test")
                .lastName("test")
                .password("password")
                .admin(true)
                .build();
    }

    @Test
    public void delete_shouldDeleteUser_givenId() {
        Long id = 1L;
        doNothing().when(userRepository).deleteById(id);

        service.delete(id);

        verify(userRepository, times(1)).deleteById(id);
    }

    @Test
    public void findById_shouldFindUser_givenId() {
        Long id = 1L;
        when(userRepository.findById(id)).thenReturn(Optional.of(user));

        User result = service.findById(id);

        assertThat(result).isEqualTo(user);
    }

    @Test
    public void findById_shouldNotFindUser_givenInvalidId() {
        Long invalidId = 2L;
        when(userRepository.findById(invalidId)).thenReturn(Optional.empty());

        User result = service.findById(invalidId);

        assertThat(result).isEqualTo(null);
    }
}
