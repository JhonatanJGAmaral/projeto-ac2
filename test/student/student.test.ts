import { getStudentService } from "./utils";
import { MOCKED_STUDENT, MOCKED_STUDENTS } from "../../mock/students";
import { SubscriptionState } from "../../src/models/CursoEstudante.model";
import {
  CreateStudentFactory,
  UpdateStudentFactory,
} from "../../src/factory/Student.payloads";

describe("student", () => {
  describe("getOne", () => {
    it("Deve retornar um aluno ao mandar um id válido", async () => {
      const { service } = getStudentService();

      const studentFetched = MOCKED_STUDENT;
      const response = await service.getOne(studentFetched.id);

      expect(response.error).toBeFalsy();
      expect(response.message).toBe("Aluno pego com sucesso");

      expect(response.data?.name).toBe(studentFetched.name);
      expect(response.data?.id).toBe(studentFetched.id);
    });

    it("Deve retornar um erro ao mandar um id inválido", async () => {
      const { service } = getStudentService();

      const response = await service.getOne("ID INVÁLIDDO");

      expect(response.error).toBeTruthy();
      expect(response.message).toBe("Erro ao pegar o aluno");

      expect(response.data).toBe(undefined);
    });
  });

  describe("getAll", () => {
    it("Deve retornar uma lista de alunos", async () => {
      const { service } = getStudentService();

      const response = await service.getAll();

      expect(response.error).toBeFalsy();
      expect(response.message).toBe("Alunos listados com sucesso");
    });
  });

  describe("create", () => {
    it("Deve retornar os valores esperados ao criar um aluno", async () => {
      const { service } = getStudentService();

      const studentPayload = new CreateStudentFactory({
        name: "Leles",
        subscription: SubscriptionState.PREMIUM,
      });

      const response = await service.create(studentPayload);

      expect(response.error).toBeFalsy();
      expect(response.message).toBe("Aluno criado com sucesso");

      expect(!!response.data?.id).toBeTruthy();
      expect(response.data?.countAvailableCourses).toBe(0);
      expect(response.data?.name).toBe(studentPayload.name);
      expect(response.data?.subscription).toBe(studentPayload.subscription);
    });

    it("Deve retornar erro ao tentar criar aluno sem enviar um nome", async () => {
      const { service } = getStudentService();

      const studentPayload = new CreateStudentFactory({
        name: "",
        subscription: SubscriptionState.PREMIUM,
      });

      const response = await service.create(studentPayload);

      expect(response.error).toBeTruthy();
      expect(response.message).toBe("Nome do aluno é inválido");

      expect(response.data).toBe(undefined);
    });

    it("Deve adicionar os valores padrão, nos campos opicionais, ao tentar criar um aluno", async () => {
      const { service } = getStudentService();

      const studentPayload = new CreateStudentFactory({
        name: "Andreia THE BOSS",
      });

      const response = await service.create(studentPayload);

      expect(response.error).toBeFalsy();
      expect(response.message).toBe("Aluno criado com sucesso");

      expect(!!response.data?.id).toBeTruthy();
      expect(response.data?.countAvailableCourses).toBe(0);
      expect(response.data?.name).toBe(studentPayload.name);
      expect(response.data?.subscription).toBe(SubscriptionState.BASIC);
    });
  });

  describe("update", () => {
    it("Deve retornar erro ao tentar atualizar aluno inválido", async () => {
      const { service } = getStudentService();

      const studentPayload = new UpdateStudentFactory({
        name: "",
        subscription: SubscriptionState.PREMIUM,
      });

      const response = await service.update("ID INVÁLIDO", studentPayload);

      expect(response.error).toBeTruthy();
      expect(response.message).toBe("Aluno não encontrado");

      expect(response.data).toBe(undefined);
    });

    it("Deve atualizar somente o nome do aluno, quando passado somente ele no payload", async () => {
      const { service } = getStudentService();

      const studentPayload = new UpdateStudentFactory({
        name: "King Julian",
      });

      const studentUsed = MOCKED_STUDENTS[1];

      const response = await service.update(studentUsed.id, studentPayload);

      expect(response.error).toBeFalsy();
      expect(response.message).toBe("Aluno atualizado com sucesso");

      expect(response.data?.id).toBe(studentUsed.id);
      expect(response.data?.name).toBe(studentPayload.name);
      expect(response.data?.subscription).toBe(studentUsed.subscription);
      expect(response.data?.countAvailableCourses).toBe(
        studentUsed.countAvailableCourses
      );
    });

    it("Deve atualizar somente a inscrição do aluno, quando passado somente ele no payload", async () => {
      const { service } = getStudentService();

      const studentPayload = new UpdateStudentFactory({
        subscription: SubscriptionState.PREMIUM,
      });

      const studentUsed = MOCKED_STUDENTS[1];

      const response = await service.update(studentUsed.id, studentPayload);

      expect(response.error).toBeFalsy();
      expect(response.message).toBe("Aluno atualizado com sucesso");

      expect(response.data?.id).toBe(studentUsed.id);
      expect(response.data?.name).toBe(studentUsed.name);
      expect(response.data?.subscription).toBe(studentPayload.subscription);
      expect(response.data?.countAvailableCourses).toBe(
        studentUsed.countAvailableCourses
      );
    });
  });

  describe("delete", () => {
    it("Deve retornar erro ao tentar remover um aluno inválido", async () => {
      const { service } = getStudentService();

      const response = await service.delete("ID INVÁLIDO");

      expect(response.error).toBeTruthy();
      expect(response.message).toBe("Aluno não encontrado");

      expect(response.data).toBe(undefined);
    });

    it("Deve remover um aluno", async () => {
      const { service } = getStudentService();

      const studentUsed = MOCKED_STUDENTS[1];

      const response = await service.delete(studentUsed.id);

      expect(response.error).toBeFalsy();
      expect(response.message).toBe("Aluno removido com sucesso");

      expect(response.data).toBe(undefined);

      const getResponse = await service.getOne(studentUsed.id);

      expect(getResponse.error).toBeTruthy();
      expect(getResponse.message).toBe("Erro ao pegar o aluno");

      expect(getResponse.data).toBe(undefined);
    });
  });
});
