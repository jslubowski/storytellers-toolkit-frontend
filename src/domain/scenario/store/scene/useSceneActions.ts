import type { Ref } from 'vue'

import type { SceneItem } from '@/domain/scenario/types/sceneItem.ts'

import { scenarioApi } from '@/domain/scenario/api/scenarioApi.ts'

export const useSceneActions = (
  scene: Ref<SceneItem | null>,
  isFetching: Ref<boolean>,
  error: Ref<string | null>
) => {
  const fetchScene = async (scenarioId: string, sceneId: string) => {
    isFetching.value = true;
    error.value = null;

    try {
      const { data } = await scenarioApi.getScene(scenarioId, sceneId);
      scene.value = data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load scene';
    } finally {
      isFetching.value = false;
    }
  };

  return { fetchScene };
}
