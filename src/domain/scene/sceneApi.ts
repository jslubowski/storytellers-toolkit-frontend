import type { CreatedResponse } from '@/domain/scenario/types/createdResponse.ts'
import type { CreateSceneCommand } from '@/domain/scenario/types/createSceneCommand.ts'
import type { SceneItem } from '@/domain/scene/types/sceneItem.ts'

import apiClient from "@/shared/api/apiClient.ts";

const getScene = async (scenarioId: string, sceneId: string) =>
  await apiClient.get<SceneItem>(`/scenarios/${scenarioId}/scenes/${sceneId}`);

const createScene = async (scenarioId: string, command: CreateSceneCommand) =>
  await apiClient.post<CreatedResponse>(`/scenarios/${scenarioId}/scenes`, command);

const updateDescription = async (scenarioId: string, sceneId: string, description: string) =>
  await apiClient.patch(`/scenarios/${scenarioId}/scenes/${sceneId}/description`, { description });

const updateGmNotes = async (scenarioId: string, sceneId: string, gmNotes: string | null) =>
  await apiClient.patch(`/scenarios/${scenarioId}/scenes/${sceneId}/gm-notes`, { gmNotes });

const deleteScene = async (scenarioId: string, sceneId: string) =>
  await apiClient.delete(`/scenarios/${scenarioId}/scenes/${sceneId}`);

export const sceneApi = {
  getScene,
  createScene,
  updateDescription,
  updateGmNotes,
  deleteScene
};
