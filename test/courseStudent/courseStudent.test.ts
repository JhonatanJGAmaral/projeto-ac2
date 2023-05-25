import { MOCKED_STUDENTS } from "../../mock/students";
import { MOCKED_COURSES } from "../../mock/courses";
import { fillUsersCoursesTest } from "./utils";

describe("CourseStudent", () => {
  describe("Eduardo", () => {
    /**
     * @author Eduardo
     */
    it("Deve vincular o usuário a um curso e fazer todas as provas", () => {
      fillUsersCoursesTest(7, MOCKED_STUDENTS[4]);
    });

    /**
     * @author Eduardo
     */
    it("Dado que tenho média igual a 5 ao finalizar um curso então, não tenho acesso a 3 cursos adicionais.", async () => {
      const gradeAverage = 5;

      const { db, course, student, service } = fillUsersCoursesTest(
        gradeAverage,
        MOCKED_STUDENTS[0]
      );

      const { data: courseVinculated } = service.finishCourse(
        student.id,
        course.id
      );

      expect(courseVinculated?.isFinished).toBe(true);
      expect(courseVinculated?.testAverage).toBe(gradeAverage);

      const coursesChoosedByStudent = [MOCKED_COURSES.slice(0, 3)].flat();

      const { error, message } = service.chooseAditionalCourses(
        coursesChoosedByStudent,
        student.id
      );

      expect(error).toBe(true);
      expect(message).toBe("Usuário não tem cursos adicionais disponíveis");
    });
  });

  describe("Jhonatan", () => {
    /**
     * @author Jhonatan
     */
    it("dado que tenho média igual a 8 ao finalizar um curso então, tenho acesso a 3 cursos adicionais.", async () => {
      const gradeAverage = 8;

      const { db, course, student, service } = fillUsersCoursesTest(
        gradeAverage,
        MOCKED_STUDENTS[1]
      );

      const { data: courseVinculated } = service.finishCourse(
        student.id,
        course.id
      );

      expect(courseVinculated?.isFinished).toBe(true);
      expect(courseVinculated?.testAverage).toBe(gradeAverage);

      const coursesChoosedByStudent = [MOCKED_COURSES.slice(0, 3)].flat();

      const { error } = service.chooseAditionalCourses(
        coursesChoosedByStudent,
        student.id
      );

      expect(error).toBe(false);

      for (const courseAdded of coursesChoosedByStudent) {
        const isCourseAdded = !!db.getCourseStudent(student.id, courseAdded.id);
        expect(isCourseAdded).toBe(true);
      }
    });
  });

  describe("Enrico", () => {
    /**
     * @author Enrico
     */
    it("dado que ganhei acesso a 3 cursos ao finalizar um curso com média acima de 7 espero receber um aviso requisitando que eu selecione a quantidade correta de cursos a que tenho direito.", async () => {
      const gradeAverage = 8;

      const { db, course, student, service } = fillUsersCoursesTest(
        gradeAverage,
        MOCKED_STUDENTS[2]
      );

      const { data: courseVinculated } = service.finishCourse(
        student.id,
        course.id
      );

      expect(courseVinculated?.isFinished).toBe(true);
      expect(courseVinculated?.testAverage).toBe(gradeAverage);

      const coursesChoosedByStudent = [MOCKED_COURSES.slice(0, 2)].flat();

      const { error, message } = service.chooseAditionalCourses(
        coursesChoosedByStudent,
        student.id
      );

      expect(error).toBe(true);
      expect(message).toBe(
        "Você não selecionou cursos suficientes, você tem direito a 3 cursos."
      );
    });
  });

  describe("Daniel", () => {
    /**
     * @author Daniel
     */
    it("dado que ganhei acesso a 3 cursos ao finalizar um curso com média acima de 7 espero receber um aviso informando que selecionei mais cursos do que tenho direito.", async () => {
      const gradeAverage = 8;

      const { db, course, student, service } = fillUsersCoursesTest(
        gradeAverage,
        MOCKED_STUDENTS[3]
      );

      const { data: courseVinculated } = service.finishCourse(
        student.id,
        course.id
      );

      expect(courseVinculated?.isFinished).toBe(true);
      expect(courseVinculated?.testAverage).toBe(gradeAverage);

      const coursesChoosedByStudent = [MOCKED_COURSES.slice(0, 7)].flat();

      const { error, message } = service.chooseAditionalCourses(
        coursesChoosedByStudent,
        student.id,
        "Daniel"
      );

      expect(error).toBe(true);
      expect(message).toBe(
        "Você selecionou mais cursos do que tem disponível, você tem direito a 3 cursos."
      );
    });
  });
});
