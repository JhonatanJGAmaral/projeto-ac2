import { DataBase } from "../data/index";
import { Test } from "../models/Prova.model";
import { CourseStudent } from "../models/CursoEstudante.model";
import { Course } from "../models/Curso.model";

type StudentCourseResponse = {
  data?: CourseStudent;
  error: boolean;
  message?: string;
};

export class StudentCourseService {
  constructor(protected readonly db: DataBase) {}

  public startCourse(
    studentId: string,
    courseId: string
  ): StudentCourseResponse {
    const student = this.db.getStudentById(studentId);
    const course = this.db.getCourseById(courseId);

    if (!course) return { error: true, message: "Curso não encontrado" };
    if (!student) return { error: true, message: "Estudante não encontrado" };

    const courseVinculated = new CourseStudent(course, student);
    this.db.coursesStudent.push(courseVinculated);

    return { data: courseVinculated, error: false };
  }

  public makeTest(
    studentId: string,
    courseId: string,
    grade: number
  ): StudentCourseResponse {
    const studentCourse = this.db.getCourseStudent(studentId, courseId);

    if (!studentCourse)
      return { error: true, message: "Curso não vinculado ao usuário" };

    if (grade < 0) {
      return { error: true, message: "Valor inválido para a nota" };
    }
    if (studentCourse.course.countTests <= studentCourse.tests.length) {
      return {
        error: true,
        message: "Você já realizou o máximo de provas para esse curso",
      };
    }

    const newTest = new Test(grade);
    studentCourse.tests.push(newTest);

    return { data: studentCourse, error: false };
  }

  public finishCourse(
    studentId: string,
    courseId: string
  ): StudentCourseResponse {
    const studentCourse = this.db.getCourseStudent(studentId, courseId);

    if (!studentCourse)
      return { error: true, message: "Curso não vinculado ao usuário" };

    const hasMadedAllTests =
      studentCourse.course.countTests === studentCourse.tests.length;

    if (!hasMadedAllTests) {
      return {
        error: true,
        message: "O estudante não fez todos os testes disponíveis",
      };
    }

    studentCourse.isFinished = true;
    studentCourse.testAverage =
      studentCourse.tests.reduce(
        (previousGrade, currentTest) => previousGrade + currentTest.grade,
        0
      ) / studentCourse.course.countTests;

    this.db.setCourseStudent(studentCourse);

    if (studentCourse.testAverage >= 7.0) {
      const studentToUpdate = this.db.getStudentById(studentCourse.student.id);

      if (!!studentToUpdate) {
        studentToUpdate.countAvailableCourses += 3;

        this.db.setStudent(studentToUpdate);
      }
    }

    return { data: studentCourse, error: false };
  }

  public chooseAditionalCourses(
    courses: Course[],
    studentId: string,
    context: string = ""
  ): StudentCourseResponse {
    const student = this.db.getStudentById(studentId);

    if (!student) return { error: true, message: "Estudante não encontrado" };

    const canChooseAdditionalCourses = student.countAvailableCourses > 1;

    if (!canChooseAdditionalCourses)
      return {
        error: true,
        message: "Usuário não tem cursos adicionais disponíveis",
      };

    const hasLessCoursesThatNeed =
      student.countAvailableCourses > courses.length;

    if (hasLessCoursesThatNeed)
      return {
        error: true,
        message:
          "Você não selecionou cursos suficientes, você tem direito a 3 cursos.",
      };

    const hasMoreCoursesThatNeed =
      student.countAvailableCourses < courses.length;

    if (hasMoreCoursesThatNeed)
      return {
        error: true,
        message:
          "Você selecionou mais cursos do que tem disponível, você tem direito a 3 cursos.",
      };

    for (const courseToAds of courses) {
      this.startCourse(student.id, courseToAds.id);
    }

    return { error: false };
  }
}
