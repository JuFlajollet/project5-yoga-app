package com.openclassrooms.starterjwt.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openclassrooms.starterjwt.payload.request.LoginRequest;
import com.openclassrooms.starterjwt.payload.request.SignupRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    SignupRequest signupRequest;
    LoginRequest loginRequest;

    @BeforeEach
    public void init() {
        signupRequest = new SignupRequest();
        loginRequest = new LoginRequest();
    }

    @Test
    public void authenticateUser_shouldReturnResponseEntityOk_whenLoginIsCorrect() throws Exception {
        loginRequest.setEmail("test@gmail.com");
        loginRequest.setPassword("password");
        ObjectMapper objectMapper = new ObjectMapper();
        String loginRequestJson = objectMapper.writeValueAsString(loginRequest);

        this.mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginRequestJson))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void authenticateUser_shouldReturnResponseEntityUnauthorized_whenLoginIsIncorrect() throws Exception {
        loginRequest.setEmail("test@gmail.com");
        loginRequest.setPassword("incorrect");
        ObjectMapper objectMapper = new ObjectMapper();
        String loginRequestJson = objectMapper.writeValueAsString(loginRequest);

        this.mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginRequestJson))
                .andDo(print())
                .andExpect(status().isUnauthorized())
                .andExpect(content().string(containsString("Bad credentials")));
    }

    @Test
    public void register_shouldReturnResponseEntityBadRequest_whenUserAlreadyExist() throws Exception {
        signupRequest.setEmail("yoga@studio.com");
        signupRequest.setFirstName("Admin");
        signupRequest.setLastName("Admin");
        signupRequest.setPassword("password");
        ObjectMapper objectMapper = new ObjectMapper();
        String signupRequestJson = objectMapper.writeValueAsString(signupRequest);

        this.mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(signupRequestJson))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("Error: Email is already taken!")));
    }

    @Test
    public void register_shouldReturnResponseEntityOk_whenUserSuccessfullyRegistered() throws Exception {
        signupRequest.setEmail("anotherYoga@studio.com");
        signupRequest.setFirstName("Admin");
        signupRequest.setLastName("Admin");
        signupRequest.setPassword("password");
        ObjectMapper objectMapper = new ObjectMapper();
        String signupRequestJson = objectMapper.writeValueAsString(signupRequest);

        this.mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(signupRequestJson))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("User registered successfully!")));
    }
}
