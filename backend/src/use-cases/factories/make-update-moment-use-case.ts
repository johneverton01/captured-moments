import { MomentRepository } from "@/repositories/moments/moment-repository.js";
import { UpdateMomentUseCase } from "../moment/update-moment-use-case.js";

export function makeUpdateMomentUseCase() {
  const momentsRepository = new MomentRepository();
  const useCase = new UpdateMomentUseCase(momentsRepository);
  return useCase;
}