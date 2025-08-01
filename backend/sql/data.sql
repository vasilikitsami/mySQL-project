INSERT INTO teachers (first_name, last_name) VALUES
	('Nikolaos' , 'Mitianoudis'),
    ('Vasileios' , 'Tsaousidis'),
    ('Efraimidis' , 'Pavlos');
    
INSERT INTO students (first_name, last_name) VALUES
	('Vasiliki' , 'Tsami'),
    ('Vicky' , 'Milioudi'),
    ('Tasos' , 'Stefanou');

INSERT INTO courses (course_name, course_code, teacher_id) VALUES
	('Electrical Circuits II', 'ECIR201', 1),
	('Digital Signal Processing', 'DSP301', 1),
	('Networks', 'NET202', 2),
	('Computer Networks', 'CNET303', 2),
	('Algorithms and Data Structures', 'ADS101', 3),
	('Algorithms and Complexity', 'ACOMP401', 3);
    
INSERT INTO student_courses (student_id, course_id) VALUES

(1,1),
(1,2),
(1,5),

(2,3),
(2,4),

(3,1),
(3,5),
(3,6);