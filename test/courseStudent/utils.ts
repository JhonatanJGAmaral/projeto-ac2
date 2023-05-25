import { getDatabaseFilled } from "../../mock/database";
import { MOCKED_COURSE, MOCKED_COURSES } from "../../mock/courses";
import { MOCKED_STUDENT, MOCKED_STUDENTS } from "../../mock/students";
import { StudentCourseService } from "../../src/services/courseStudent.service";

export const fillUsersCoursesTest = (grade = 7, student = MOCKED_STUDENT) => {
  const { db } = getDatabaseFilled();
  expect(db.courses.length).toEqual(MOCKED_COURSES.length);
  expect(db.students.length).toEqual(MOCKED_STUDENTS.length);

  const course = MOCKED_COURSE;

  const service = new StudentCourseService(db);
  const { data: initialCourseVinculated } = service.startCourse(
    student.id,
    course.id
  );

  expect(initialCourseVinculated?.course?.id).toBe(course.id);
  expect(initialCourseVinculated?.student?.id).toBe(student.id);

  let courseVinculated = initialCourseVinculated;

  for (let i = 0; i < course.countTests; i++) {
    const { data } = service.makeTest(student.id, course.id, grade);
    if (!!data) courseVinculated = data;
    expect(data?.tests?.length).toBe(i + 1);
  }

  return { db, student, course, service, courseVinculated };
};
