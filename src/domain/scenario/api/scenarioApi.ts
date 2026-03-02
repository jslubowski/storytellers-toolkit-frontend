import type { CreateScenarioCommand } from '@/domain/scenario/types/createScenarioCommand.ts'
import type {ScenarioItem} from "@/domain/scenario/types/scenarioItem.ts";

import apiClient from "@/shared/api/apiClient.ts";

const getAllScenarios = async () => await apiClient.get<ScenarioItem[]>('/scenarios');

const getScenarioById = async (id: string) =>
  await apiClient.get<ScenarioItem>(`/scenarios/${id}`);

const createScenario = async (command: CreateScenarioCommand) =>
  await apiClient.post<string>('/scenarios', command);

export const scenarioApi = {
  getAllScenarios,
  getScenarioById,
  createScenario
};
