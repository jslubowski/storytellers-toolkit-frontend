import type { Ref } from 'vue';

import type { ScenarioDeleteModalData } from '@/domain/scenario/store/useScenariosState.ts';

import type { CreateScenarioCommand } from '@/domain/scenario/types/createScenarioCommand.ts';
import type { ScenarioItem } from '@/domain/scenario/types/scenarioItem.ts';

import { scenarioApi } from '@/domain/scenario/api/scenarioApi.ts';
import { sceneApi } from '@/domain/scene/sceneApi.ts';

export const useScenariosActions = (
  scenarios: Ref<ScenarioItem[]>,
  isFetching: Ref<boolean>,
  isSaving: Ref<boolean>,
  error: Ref<string | null>,
  activeSceneId: Ref<string | null>,
  isDeleting: Ref<boolean>,
  deleteScenarioModalData: Ref<ScenarioDeleteModalData | null>,
) => {
  const fetchScenarios = async () => {
    isFetching.value = true;
    error.value = null;

    try {
      const { data } = await scenarioApi.getAllScenarios();
      scenarios.value = data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unexpected error occurred';
    } finally {
      isFetching.value = false;
    }
  };

  const addScenario = async (item: CreateScenarioCommand) => {
    isSaving.value = true;
    error.value = null;

    try {
      await scenarioApi.createScenario(item);
      await fetchScenarios();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unexpected error occurred';
    } finally {
      isSaving.value = false;
    }
  };

  const addScene = async (scenarioId: string, data: { name: string; description: string }) => {
    isSaving.value = true;
    error.value = null;

    try {
      const { data: response } = await sceneApi.createScene(scenarioId, data);
      await fetchScenarios();
      activeSceneId.value = response.entityId;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unexpected error occurred';
    } finally {
      isSaving.value = false;
    }
  };

  const openDeleteScenarioModal = (scenarioId: string, scenarioName: string) => {
    deleteScenarioModalData.value = { scenarioId, scenarioName };
  };

  const closeDeleteScenarioModal = () => {
    deleteScenarioModalData.value = null;
  };

  const deleteScenario = async () => {
    if (deleteScenarioModalData.value === null || deleteScenarioModalData.value.scenarioId === '')
      throw new Error('Scenario ID is missing');

    isDeleting.value = true;

    try {
      await scenarioApi.deleteScenario(deleteScenarioModalData.value!.scenarioId);
      await fetchScenarios();
      activeSceneId.value = null;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unexpected error occurred';
    } finally {
      isDeleting.value = false;
    }
  };

  return {
    fetchScenarios,
    addScenario,
    addScene,
    deleteScenario,
    openDeleteScenarioModal,
    closeDeleteScenarioModal,
  };
};
