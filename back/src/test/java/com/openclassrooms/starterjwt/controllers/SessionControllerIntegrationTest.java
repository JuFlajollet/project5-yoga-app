package com.openclassrooms.starterjwt.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.openclassrooms.starterjwt.dto.SessionDto;
import com.openclassrooms.starterjwt.mapper.SessionMapper;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Date;

import static org.assertj.core.util.DateUtil.now;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class SessionControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private SessionMapper sessionMapper;

    String sessionJson;

    @BeforeEach
    public void init() throws JsonProcessingException {
        Teacher teacher = Teacher.builder()
                .id(1L)
                .firstName("teacher")
                .lastName("teacher")
                .build();
        Session session = Session.builder()
                .name("Another Session")
                .description("Another description")
                .date(now())
                .teacher(teacher)
                .build();
        SessionDto sessionDto = sessionMapper.toDto(session);
        ObjectMapper objectMapper = new ObjectMapper();
        sessionJson = objectMapper.writeValueAsString(sessionDto);
    }

    @Test
    public void findById_shouldReturnResponseEntityNotFound_whenSessionNotFound() throws Exception {
        this.mockMvc.perform(get("/api/session/55").with(SecurityMockMvcRequestPostProcessors.jwt()))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    public void findById_shouldReturnResponseEntityBadRequest_whenInvalidIdFormat() throws Exception {
        this.mockMvc.perform(get("/api/session/number").with(SecurityMockMvcRequestPostProcessors.jwt()))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void findById_shouldReturnResponseEntityOk_whenValidId() throws Exception {
        this.mockMvc.perform(get("/api/session/1").with(SecurityMockMvcRequestPostProcessors.jwt()))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void findAll_shouldReturnResponseEntityOk() throws Exception {
        this.mockMvc.perform(get("/api/session").with(SecurityMockMvcRequestPostProcessors.jwt()))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void create_shouldReturnResponseEntityOk_whenSessionSuccessfullyCreated() throws Exception {
        this.mockMvc.perform(post("/api/session").with(SecurityMockMvcRequestPostProcessors.jwt())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(sessionJson))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Another Session"));
    }

    @Test
    public void update_shouldReturnResponseEntityOk_whenUpdateSuccesful() throws Exception {
        this.mockMvc.perform(put("/api/session/1").with(SecurityMockMvcRequestPostProcessors.jwt())
                .contentType(MediaType.APPLICATION_JSON)
                .content(sessionJson))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Another Session"));
    }

    @Test
    public void update_shouldReturnResponseEntityBadRequest_whenInvalidIdFormat() throws Exception {
        this.mockMvc.perform(put("/api/session/number").with(SecurityMockMvcRequestPostProcessors.jwt())
                .contentType(MediaType.APPLICATION_JSON)
                .content(sessionJson))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void save_shouldReturnResponseEntityOk_whenDeleteSuccesful() throws Exception {
        this.mockMvc.perform(delete("/api/session/1").with(SecurityMockMvcRequestPostProcessors.jwt()))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void save_shouldReturnResponseEntityNotFound_whenSessionNotFound() throws Exception {
        this.mockMvc.perform(delete("/api/session/55").with(SecurityMockMvcRequestPostProcessors.jwt()))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    public void save_shouldReturnResponseEntityBadRequest_whenInvalidIdFormat() throws Exception {
        this.mockMvc.perform(delete("/api/session/number").with(SecurityMockMvcRequestPostProcessors.jwt()))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void participate_shouldReturnResponseEntityOk_whenUserSuccessfullyAddedToSession() throws Exception {
        this.mockMvc.perform(post("/api/session/1/participate/1").with(SecurityMockMvcRequestPostProcessors.jwt()))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void participate_shouldReturnResponseEntityBadRequest_whenInvalidIdFormat() throws Exception {
        this.mockMvc.perform(post("/api/session/number/participate/number").with(SecurityMockMvcRequestPostProcessors.jwt()))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void noLongerParticipate_shouldReturnResponseEntityOk_whenUserSuccessfullyRemovedFromSession() throws Exception {
        this.mockMvc.perform(post("/api/session/1/participate/1").with(SecurityMockMvcRequestPostProcessors.jwt()))
                .andDo(print());
        this.mockMvc.perform(delete("/api/session/1/participate/1").with(SecurityMockMvcRequestPostProcessors.jwt()))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void noLongerParticipate_shouldReturnResponseEntityBadRequest_whenInvalidIdFormat() throws Exception {
        this.mockMvc.perform(delete("/api/session/number/participate/number").with(SecurityMockMvcRequestPostProcessors.jwt()))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }
}
