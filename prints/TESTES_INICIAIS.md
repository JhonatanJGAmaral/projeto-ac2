```

/**
   * @author Eduardo
   */
  it("Dado que tenho média igual a 5 ao finalizar um curso então, não tenho acesso a 3 cursos adicionais.", () => {
    const gradeAverage = 5;

    const { db, course, student, service } = fillUsersCoursesTest(gradeAverage);

    const courseVinculated = service.finishCourse(student.id, course.id);

    expect(courseVinculated.isFinished).toBe(true);
    expect(courseVinculated.testAverage).toBe(gradeAverage);

    const coursesChoosedByStudent = [MOCKED_COURSES.slice(0, 3)].flat();

    expect(
      service.chooseAditionalCourses(coursesChoosedByStudent, student.id)
    ).toThrow("Usuário não tem cursos adicionais disponíveis");
  });

  /**
   * @author Jhonatan
   */
  it("dado que tenho média igual a 8 ao finalizar um curso então, tenho acesso a 3 cursos adicionais.", () => {
    const gradeAverage = 8;

    const { db, course, student, service } = fillUsersCoursesTest(gradeAverage);

    const courseVinculated = service.finishCourse(student.id, course.id);

    expect(courseVinculated.isFinished).toBe(true);
    expect(courseVinculated.testAverage).toBe(gradeAverage);

    const coursesChoosedByStudent = [MOCKED_COURSES.slice(0, 3)].flat();

    service.chooseAditionalCourses(coursesChoosedByStudent, student.id);

    for (const courseAdded of coursesChoosedByStudent) {
      const isCourseAdded = !!db.getStudentCourse(student.id, courseAdded.id);
      expect(isCourseAdded).toBe(true);
    }
  });

  /**
   * @author Enrico
   */
  it("dado que ganhei acesso a 3 cursos ao finalizar um curso com média acima de 7 espero receber um aviso requisitando que eu selecione a quantidade correta de cursos a que tenho direito.", () => {
    const gradeAverage = 8;

    const { db, course, student, service } = fillUsersCoursesTest(gradeAverage);

    const courseVinculated = service.finishCourse(student.id, course.id);

    expect(courseVinculated.isFinished).toBe(true);
    expect(courseVinculated.testAverage).toBe(gradeAverage);

    const coursesChoosedByStudent = [MOCKED_COURSES.slice(0, 2)].flat();

    expect(
      service.chooseAditionalCourses(coursesChoosedByStudent, student.id)
    ).toThrow(
      "Você não selecionou todos os cursos disponíveis, você tem direito a 3 cursos."
    );
  });

  /**
   * @author Daniel
   */
  it("dado que ganhei acesso a 3 cursos ao finalizar um curso com média acima de 7 espero receber um aviso informando que selecionei mais cursos do que tenho direito..", () => {
    const gradeAverage = 8;

    const { db, course, student, service } = fillUsersCoursesTest(gradeAverage);

    const courseVinculated = service.finishCourse(student.id, course.id);

    expect(courseVinculated.isFinished).toBe(true);
    expect(courseVinculated.testAverage).toBe(gradeAverage);

    const coursesChoosedByStudent = [MOCKED_COURSES.slice(0, 4)].flat();

    expect(
      service.chooseAditionalCourses(coursesChoosedByStudent, student.id)
    ).toThrow(
      "Você não selecionou cursos a mais, você tem direito a 3 cursos."
    );
  });

```
