package com.openclassrooms.starterjwt.repository;

import com.openclassrooms.starterjwt.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class UserRepositoryTest {
    @Autowired
    UserRepository repository;
    @Autowired
    private TestEntityManager testEntityManager;

    String email;
    User user;

    @BeforeEach
    public void init() {
        email = "yoga@studio.com";
        user = User.builder()
                .id(1L)
                .email("yoga@studio.com")
                .firstName("Admin")
                .lastName("Admin")
                .password("password")
                .admin(true)
                .build();
    }

    @Test
    public void findByEmail_shouldReturnAssociatedUser_whenEmailFound() {
        Optional<User> result = repository.findByEmail(email);

        if(result.isPresent()){
            assertEquals(result.get().getId(), user.getId());
            assertEquals(result.get().getEmail(), user.getEmail());
            assertEquals(result.get().getFirstName(), user.getFirstName());
            assertEquals(result.get().getLastName(), user.getLastName());
            assertEquals(result.get().isAdmin(), user.isAdmin());
        } else {
            fail("user associated to email should exist");
        }
    }

    @Test
    public void findByEmail_shouldReturnEmpty_whenEmailNotFound() {
        email = "notyoga@studio.com";

        Optional<User> result = repository.findByEmail(email);

        assertEquals(result, Optional.empty());
    }

    @Test
    public void existsByEmail_shouldReturnTrue_whenEmailFound() {
        Boolean result = repository.existsByEmail(email);

        assertTrue(result);
    }

    @Test
    public void existsByEmail_shouldReturnFalse_whenEmailNotFound() {
        email = "notyoga@studio.com";

        Boolean result = repository.existsByEmail(email);

        assertFalse(result);
    }
}
