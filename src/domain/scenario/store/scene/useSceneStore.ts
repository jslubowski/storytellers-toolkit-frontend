import { defineStore } from 'pinia'

import { useSceneActions } from './useSceneActions.ts'
import { useSceneState } from './useSceneState.ts'

export const useSceneStore = defineStore('scene', () => {
  const { scene, isFetching, error } = useSceneState();
  const { fetchScene, saveDescription, saveGmNotes, isSavingDescription, isSavingGmNotes } = useSceneActions(scene, isFetching, error);

  return { scene, isFetching, error, fetchScene, saveDescription, saveGmNotes, isSavingDescription, isSavingGmNotes };
});
