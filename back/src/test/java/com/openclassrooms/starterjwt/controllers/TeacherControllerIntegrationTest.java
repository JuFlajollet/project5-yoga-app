package com.openclassrooms.starterjwt.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class TeacherControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;
    @BeforeEach
    public void init() {
    }

    @Test
    public void findById_shouldReturnResponseEntityOk_whenTeacherExists() throws Exception {
        this.mockMvc.perform(get("/api/teacher/1").with(SecurityMockMvcRequestPostProcessors.jwt()))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void findById_shouldReturnResponseEntityNotFound_whenTeacherNotExists() throws Exception {
        this.mockMvc.perform(get("/api/teacher/55").with(SecurityMockMvcRequestPostProcessors.jwt()))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    public void findById_shouldReturnResponseEntityBadRequest_whenIncorrectFormatId() throws Exception {
        this.mockMvc.perform(get("/api/teacher/number").with(SecurityMockMvcRequestPostProcessors.jwt()))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void findAll_shouldReturnResponseOk() throws Exception {
        this.mockMvc.perform(get("/api/teacher").with(SecurityMockMvcRequestPostProcessors.jwt()))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
