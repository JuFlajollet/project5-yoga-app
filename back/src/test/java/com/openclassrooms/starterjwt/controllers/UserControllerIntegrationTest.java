package com.openclassrooms.starterjwt.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class UserControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;
    @BeforeEach
    public void init() {
    }

    @Test
    public void findById_shouldReturnResponseEntityOk_whenUserExists() throws Exception {
        this.mockMvc.perform(get("/api/user/1").with(SecurityMockMvcRequestPostProcessors.jwt()))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void findById_shouldReturnResponseEntityNotFound_whenUserNotExists() throws Exception {
        this.mockMvc.perform(get("/api/user/55").with(SecurityMockMvcRequestPostProcessors.jwt()))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    public void findById_shouldReturnResponseEntityBadRequest_whenIncorrectFormatId() throws Exception {
        this.mockMvc.perform(get("/api/user/number").with(SecurityMockMvcRequestPostProcessors.jwt()))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void save_shouldReturnResponseNotFound_whenUserNotFound() throws Exception {
        this.mockMvc.perform(delete("/api/user/55").with(SecurityMockMvcRequestPostProcessors.jwt()))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    public void save_shouldReturnResponseBadRequest_whenInvalidFormatId() throws Exception {
        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken("test@gmail.com", "password");

        this.mockMvc.perform(delete("/api/user/number").with(SecurityMockMvcRequestPostProcessors.authentication(authRequest)))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void save_shouldReturnResponseUnauthorized_whenLoggedUserNotMatchRequestId() throws Exception {
        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken("test@gmail.com", "password");

        this.mockMvc.perform(delete("/api/user/1").with(SecurityMockMvcRequestPostProcessors.authentication(authRequest)))
                .andDo(print())
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void save_shouldReturnResponseOk_whenUserSuccessfullyDeleted() throws Exception {
        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken("test@gmail.com", "password");
        
        this.mockMvc.perform(delete("/api/user/2").with(SecurityMockMvcRequestPostProcessors.authentication(authRequest)))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
