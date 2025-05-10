package com.example.stud_erp.controller;

import com.example.stud_erp.entity.ClassSession;
import com.example.stud_erp.service.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/classes")
public class ClassController  {

    @Autowired
    private ClassService classService;

    @GetMapping
    public ResponseEntity<List<ClassSession>> getAllClasses() {
        List<ClassSession> classes = classService.getAllClasses();
        return ResponseEntity.ok(classes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getClassById(@PathVariable Long id) {
        ClassSession clazz = classService.getClassById(id);
        if (clazz == null) {
            return ResponseEntity.notFound().build();
        }

        Map<String, Object> response = new HashMap<>();
        response.put("Lecturer", clazz.getLecturer());
        response.put("Subject", clazz.getSubject());
        response.put("Time", clazz.getTime());

        Map<String, String> attendanceMap = new HashMap<>();
        int presentCount = 0;
        int absentCount = 0;

        for (var attendance : clazz.getAttendance()) {
            attendanceMap.put(attendance.getStudentName(), attendance.getStatus());
            if ("p".equalsIgnoreCase(attendance.getStatus())) {
                presentCount++;
            } else {
                absentCount++;
            }
        }

        response.put("Attendance", attendanceMap);

        Map<String, Integer> totals = new HashMap<>();
        totals.put("Present", presentCount);
        totals.put("Absent", absentCount);

        response.put("Totals", totals);

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ClassSession> createClass(@RequestBody ClassSession clazz) {
        ClassSession savedClass = classService.saveClass(clazz);
        return ResponseEntity.ok(savedClass);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClass(@PathVariable Long id) {
        try {
            classService.deleteClass(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting class: " + e.getMessage());
        }
    }
}

