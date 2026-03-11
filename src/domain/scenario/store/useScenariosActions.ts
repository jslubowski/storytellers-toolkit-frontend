import type { Ref } from 'vue';

import type { CreateScenarioCommand } from '@/domain/scenario/types/createScenarioCommand.ts';
import type { ScenarioItem } from '@/domain/scenario/types/scenarioItem.ts';

import { scenarioApi } from '@/domain/scenario/api/scenarioApi.ts';

export const useScenariosActions = (
  scenarios: Ref<ScenarioItem[]>,
  isFetching: Ref<boolean>,
  isSaving: Ref<boolean>,
  error: Ref<string | null>,
  activeSceneId: Ref<string | null>
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

  const addScenario = async (item: CreateScenarioCommand): Promise<boolean> => {
    isSaving.value = true;
    error.value = null;

    try {
      await scenarioApi.createScenario(item);
      await fetchScenarios();
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unexpected error occurred';
      return false;
    } finally {
      isSaving.value = false;
    }
  };

  const addScene = async (
    scenarioId: string,
    data: { name: string; description: string }
  ): Promise<boolean> => {
    isSaving.value = true;
    error.value = null;

    try {
      const { data: response } = await scenarioApi.createScene(scenarioId, data);
      await fetchScenarios();
      activeSceneId.value = response.entityId;
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unexpected error occurred';
      return false;
    } finally {
      isSaving.value = false;
    }
  };

  return { fetchScenarios, addScenario, addScene };
}
