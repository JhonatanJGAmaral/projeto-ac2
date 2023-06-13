import { getCourseService } from "./utils";
import { SubscriptionState } from "../../src/models/CursoEstudante.model";
import { MOCKED_COURSE, MOCKED_COURSES } from "../../mock/courses";
import {
  CreateCourseFactory,
  UpdateCourseFactory,
} from "../../src/factory/Course.payloads";

describe("course", () => {
  describe("getOne", () => {
    it("Deve retornar um curso ao mandar um id válido", async () => {
      //cenário
      const { service } = getCourseService();

      //execução
      const courseFetched = MOCKED_COURSE;
      const response = await service.getOne(courseFetched.id);

      //resultados
      expect(response.error).toBeFalsy();
      expect(response.message).toBe("Curso pego com sucesso");

      expect(response.data?.name).toBe(courseFetched.name);
      expect(response.data?.id).toBe(courseFetched.id);
    });

    it("Deve retornar um erro ao mandar um id inválido", async () => {
      //cenário
      const { service } = getCourseService();

      //execução
      const response = await service.getOne("ID INVÁLIDDO");

      //resultados
      expect(response.error).toBeTruthy();
      expect(response.message).toBe("Erro ao pegar o curso");

      expect(response.data).toBe(undefined);
    });
  });

  describe("getAll", () => {
    it("Deve retornar uma lista de cursos", async () => {
      const { service } = getCourseService();

      const response = await service.getAll();

      expect(response.error).toBeFalsy();
      expect(response.message).toBe("Cursos listados com sucesso");
    });
  });

  describe("create", () => {
    it("Deve retornar os valores esperados ao criar um curso", async () => {
      //cenário
      const { service } = getCourseService();

      //execução
      const coursePayload = new CreateCourseFactory({
        name: "Eng Software II",
        teacher: "Leles",
        countTests: 47,
      });

      const response = await service.create(coursePayload);

      //resultados
      expect(response.error).toBeFalsy();
      expect(response.message).toBe("Curso criado com sucesso");

      expect(!!response.data?.id).toBeTruthy();
      expect(response.data?.name).toBe(coursePayload.name);
      expect(response.data?.teacher).toBe(coursePayload.teacher);
      expect(response.data?.countTests).toBe(coursePayload.countTests);
    });

    it("Deve retornar erro ao tentar criar curso sem enviar um nome", async () => {
      //cenário
      const { service } = getCourseService();

      //execução
      const coursePayload = new CreateCourseFactory({
        name: "",
      } as any);

      const response = await service.create(coursePayload);

      //resultados
      expect(response.error).toBeTruthy();
      expect(response.message).toBe("Nome do curso é inválido");

      expect(response.data).toBe(undefined);
    });

    it("Deve adicionar os valores padrão, nos campos opicionais, ao tentar criar um curso", async () => {
      const { service } = getCourseService();

      const coursePayload = new CreateCourseFactory({
        name: "Curso top",
        teacher: "Andreia THE BOSS",
      } as any);

      const response = await service.create(coursePayload);

      expect(response.message).toBe("Curso criado com sucesso");
      expect(response.error).toBeFalsy();

      expect(!!response.data?.id).toBeTruthy();
      expect(response.data?.name).toBe(coursePayload.name);
      expect(response.data?.teacher).toBe(coursePayload.teacher);
      expect(response.data?.countTests).toBe(1);
    });
  });

  describe("update", () => {
    it("Deve retornar erro ao tentar atualizar curso inválido", async () => {
      const { service } = getCourseService();

      const coursePayload = new UpdateCourseFactory({
        name: "",
      });

      const response = await service.update("ID INVÁLIDO", coursePayload);

      expect(response.error).toBeTruthy();
      expect(response.message).toBe("Curso não encontrado");

      expect(response.data).toBe(undefined);
    });

    it("Deve atualizar somente o nome do curso, quando passado somente ele no payload", async () => {
      const { service } = getCourseService();

      const coursePayload = new UpdateCourseFactory({
        name: "King Julian",
      });

      const courseUsed = MOCKED_COURSES[1];

      const response = await service.update(courseUsed.id, coursePayload);

      expect(response.error).toBeFalsy();
      expect(response.message).toBe("Curso atualizado com sucesso");

      expect(response.data?.id).toBe(courseUsed.id);
      expect(response.data?.name).toBe(coursePayload.name);
      expect(response.data?.teacher).toBe(courseUsed.teacher);
      expect(response.data?.countTests).toBe(courseUsed.countTests);
    });
  });

  describe("delete", () => {
    it("Deve retornar erro ao tentar remover um curso inválido", async () => {
      const { service } = getCourseService();

      const response = await service.delete("ID INVÁLIDO");

      expect(response.error).toBeTruthy();
      expect(response.message).toBe("Curso não encontrado");

      expect(response.data).toBe(undefined);
    });

    it("Deve remover um curso", async () => {
      const { service } = getCourseService();

      const courseUsed = MOCKED_COURSES[1];

      const response = await service.delete(courseUsed.id);

      expect(response.error).toBeFalsy();
      expect(response.message).toBe("Curso removido com sucesso");

      expect(response.data).toBe(undefined);

      const getResponse = await service.getOne(courseUsed.id);

      expect(getResponse.error).toBeTruthy();
      expect(getResponse.message).toBe("Erro ao pegar o curso");

      expect(getResponse.data).toBe(undefined);
    });
  });
});
