import { ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';

import type { Ref } from 'vue';

import type { SceneItem } from '@/domain/scene/types/sceneItem.ts';

import type { DeleteSceneModalData } from '@/domain/scene/scene/useSceneState.ts';
import { sceneApi } from '@/domain/scene/sceneApi.ts';

export function useSceneActions(
  scene: Ref<SceneItem | null>,
  isFetching: Ref<boolean>,
  error: Ref<string | null>,
  deleteSceneModalData: Ref<DeleteSceneModalData | null>,
) {
  const isSavingDescription = ref(false);
  const isSavingGmNotes = ref(false);
  const isDeletingScene = ref(false);

  const fetchScene = async (scenarioId: string, sceneId: string) => {
    isFetching.value = true;
    error.value = null;
    try {
      const { data } = await sceneApi.getScene(scenarioId, sceneId);
      scene.value = data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load scene';
    } finally {
      isFetching.value = false;
    }
  };

  const saveDescription = useDebounceFn(
    async (scenarioId: string, sceneId: string, description: string) => {
      isSavingDescription.value = true;

      try {
        await sceneApi.updateDescription(scenarioId, sceneId, description);
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to save description';
      } finally {
        isSavingDescription.value = false;
      }
    },
    2000,
  );

  const saveGmNotes = useDebounceFn(
    async (scenarioId: string, sceneId: string, gmNotes: string | null) => {
      isSavingGmNotes.value = true;

      try {
        await sceneApi.updateGmNotes(scenarioId, sceneId, gmNotes);
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to save GM notes';
      } finally {
        isSavingGmNotes.value = false;
      }
    },
    2000,
  );

  const deleteScene = async () => {
    if (!deleteSceneModalData.value) {
      console.error('scene data not set');
      return;
    }

    isDeletingScene.value = true;

    try {
      await sceneApi.deleteScene(
        deleteSceneModalData.value.scenarioId,
        deleteSceneModalData.value.sceneId,
      );
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to save GM notes';
    } finally {
      isDeletingScene.value = false;
    }
  };

  const openDeleteSceneModal = (scenarioId: string, sceneId: string, sceneName: string) => {
    deleteSceneModalData.value = { scenarioId, sceneId, sceneName };
  };

  const closeDeleteSceneModal = () => {
    deleteSceneModalData.value = null;
  };

  return {
    fetchScene,
    saveDescription,
    saveGmNotes,
    deleteScene,
    openDeleteSceneModal,
    closeDeleteSceneModal,
    isDeletingScene,
    isSavingDescription,
    isSavingGmNotes,
  };
}
