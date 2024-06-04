package com.openclassrooms.starterjwt.security.jwt;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class JwtUtilsTest {
    @Autowired
    private JwtUtils utils;
    @Autowired
    private AuthenticationManager authManager;

    @Test
    public void getUserNameFromJwtToken_shouldReturnUsername() {
        String expectedUsername = "test@gmail.com";

        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(expectedUsername,"password");
        Authentication authentication = authManager.authenticate(authRequest);
        String token = utils.generateJwtToken(authentication);

        String result = utils.getUserNameFromJwtToken(token);

        assert(expectedUsername.equals(result));
    }

    @Test
    public void validateJwtToken_shouldReturnTrue_whenValidToken() {
        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken("test@gmail.com","password");
        Authentication authentication = authManager.authenticate(authRequest);
        String token = utils.generateJwtToken(authentication);

        assertTrue(utils.validateJwtToken(token));
    }

    @Test
    public void validateJwtToken_shouldReturnFalse_whenInvalidToken() {
        String token = "invalid";

        assertFalse(utils.validateJwtToken(token));
    }
}
