import { MOCKED_COURSES } from "../mock/courses";
import { MOCKED_STUDENTS } from "../mock/students";
import { DataBase } from "../src/data/index";

export const getDatabaseFilled = () => {
  const db = new DataBase();
  MOCKED_COURSES.forEach((mocked_course) => db.courses.push(mocked_course));
  MOCKED_STUDENTS.forEach((mocked_student) => db.students.push(mocked_student));

  return { db };
};
