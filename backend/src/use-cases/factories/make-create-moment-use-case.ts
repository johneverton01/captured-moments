import { MomentRepository } from "@/repositories/moments/moment-repository.js";
import { CreateMomentUseCase } from "../moment/create-moment-use-case.js";

export function makeCreateMomentUseCase() {
  const momentsRepository = new MomentRepository();
  const useCase = new CreateMomentUseCase(momentsRepository);
  return useCase;
}