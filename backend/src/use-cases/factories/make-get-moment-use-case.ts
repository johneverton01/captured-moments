import { MomentRepository } from "@/repositories/moments/moment-repository.js";
import { GetMomentUseCase } from "../moment/get-moment-use-case.js";

export function makeGetMomentUseCase() {
  const momentsRepository = new MomentRepository();
  const useCase = new GetMomentUseCase(momentsRepository);
  return useCase;
}