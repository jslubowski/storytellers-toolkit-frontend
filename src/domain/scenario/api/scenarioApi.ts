import apiClient from "@/shared/api/apiClient.ts";
import type {ScenarioItem} from "@/domain/scenario/types/scenarioItem.ts";

const getAllScenarios = async () => await apiClient.get<ScenarioItem[]>('/scenarios');

export const scenarioApi = {
  getAllScenarios
};
