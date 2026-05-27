import { MomentRepository } from "@/repositories/moments/moment-repository.js";
import { SearchMomentUseCase } from "../moment/search-moment-use-case.js";

export function makeSearchMomentUseCase() {
  const momentsRepository = new MomentRepository();
  const useCase = new SearchMomentUseCase(momentsRepository);
  return useCase;
}