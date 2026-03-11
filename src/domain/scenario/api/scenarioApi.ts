import type { CreatedResponse } from '@/domain/scenario/types/createdResponse.ts'
import type { CreateScenarioCommand } from '@/domain/scenario/types/createScenarioCommand.ts'
import type { CreateSceneCommand } from '@/domain/scenario/types/createSceneCommand.ts'
import type {ScenarioItem} from "@/domain/scenario/types/scenarioItem.ts";
import type { SceneItem } from '@/domain/scenario/types/sceneItem.ts'

import apiClient from "@/shared/api/apiClient.ts";

const getAllScenarios = async () => await apiClient.get<ScenarioItem[]>('/scenarios');

const getScenarioById = async (id: string) =>
  await apiClient.get<ScenarioItem>(`/scenarios/${id}`);

const createScenario = async (command: CreateScenarioCommand) =>
  await apiClient.post<string>('/scenarios', command);

const createScene = async (scenarioId: string, command: CreateSceneCommand) =>
  await apiClient.post<CreatedResponse>(`/scenarios/${scenarioId}/scenes`, command);

const getScene = async (scenarioId: string, sceneId: string) =>
  await apiClient.get<SceneItem>(`/scenarios/${scenarioId}/scenes/${sceneId}`);

export const scenarioApi = {
  getAllScenarios,
  getScenarioById,
  createScenario,
  createScene,
  getScene
};
