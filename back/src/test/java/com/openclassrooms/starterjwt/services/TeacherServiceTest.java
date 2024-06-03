package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.repository.TeacherRepository;
import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.when;

@SpringBootTest
public class TeacherServiceTest {

    private TeacherService service;

    @Mock
    private TeacherRepository teacherRepository;

    Teacher firstTeacher;
    Teacher secondTeacher;

    @BeforeEach
    public void init() {
        service = new TeacherService(teacherRepository);
        firstTeacher = Teacher.builder().id(1L).firstName("test1").lastName("test1").build();
        secondTeacher = Teacher.builder().id(2L).firstName("test2").lastName("test2").build();
    }

    @Test
    public void findAll_shouldReturnListOfTeachers() {
        List<Teacher> teachersList = Stream.of(firstTeacher, secondTeacher).collect(Collectors.toList());

        when(teacherRepository.findAll()).thenReturn(teachersList);

        List<Teacher> results = service.findAll();

        assertThat(results).isEqualTo(teachersList);
    }

    @Test
    public void findById_shouldReturnAssociatedTeacher_whenIdFound() {
        Long id = 2L;

        when(teacherRepository.findById(id)).thenReturn(Optional.of(secondTeacher));

        Teacher result = service.findById(id);

        assertThat(result).isEqualTo(secondTeacher);
    }

    @Test
    public void findById_shouldReturnNull_whenIdNotFound() {
        Long id = 5L;

        when(teacherRepository.findById(id)).thenReturn(Optional.empty());

        Teacher result = service.findById(id);

        assertThat(result).isEqualTo(null);
    }
}
