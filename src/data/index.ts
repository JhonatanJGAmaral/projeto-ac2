import array from "../utils/array";
import { Course } from "../models/Curso.model";
import { removeByIndex } from "../utils/databse";
import { Student } from "../models/Estudante.model";
import { TopicoForum } from "../models/TopicoForum.model";
import { CourseStudent } from "../models/CursoEstudante.model";

export class DataBase {
  public courses: Course[] = [];
  public students: Student[] = [];
  public coursesStudent: CourseStudent[] = [];
  public readonly topicosForum: TopicoForum[] = [];

  // #region Students Queries

  public getStudentById(id: string): Student | undefined {
    return !!this.students
      ? this.students.find((s: Student) => !!s?.id && s?.id === id)
      : undefined;
  }

  public setStudent(payload: Student): Student {
    const indexToUpdate = this.students.findIndex(
      (s: Student) => s?.id === payload.id
    );

    return (this.students[indexToUpdate] = payload);
  }

  public setManyStudents(payload: Student[]): Student[] {
    this.students = array.isValid(payload) ? payload : this.students;

    return this.students;
  }

  public removeStudent(id: string): Student[] {
    const indexToUpdate = this.students.findIndex((s: Student) => s?.id === id);
    const listUpdated = removeByIndex(this.students, indexToUpdate);

    return this.setManyStudents(listUpdated);
  }

  // #endregion Students Queries

  // #region Courses Queries

  public getCourseById(id: string): Course | undefined {
    return !!this.courses
      ? this.courses.find((c: Course) => !!c?.id && c?.id === id)
      : undefined;
  }

  public setCourse(payload: Course): Course {
    const indexToUpdate = this.courses.findIndex(
      (c: Course) => c?.id === payload.id
    );

    return (this.courses[indexToUpdate] = payload);
  }

  public setManyCourses(payload: Course[]): Course[] {
    this.courses = array.isValid(payload) ? payload : this.courses;

    return this.courses;
  }

  public removeCourse(id: string): Course[] {
    const indexToUpdate = this.courses.findIndex((c: Course) => c?.id === id);
    const listUpdated = removeByIndex(this.courses, indexToUpdate);

    return this.setManyCourses(listUpdated);
  }

  // #endregion Courses Queries

  // #region CourseStudents Queries

  public setCourseStudent(payload: CourseStudent): CourseStudent {
    const indexToUpdate = this.coursesStudent.findIndex(
      (s: CourseStudent) => s?.id === payload.id
    );

    return (this.coursesStudent[indexToUpdate] = payload);
  }

  public getCourseStudent(
    studentId: string,
    courseId: string
  ): CourseStudent | undefined {
    const courseStudents = this.coursesStudent.filter(
      (item) => item.student.id === studentId && item.course.id === courseId
    );

    return courseStudents.length >= 0 ? courseStudents[0] : undefined;
  }

  // #endregion CourseStudents Queries
}
