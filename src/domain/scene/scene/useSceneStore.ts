import { defineStore } from 'pinia'

import { useSceneActions } from './useSceneActions.ts'
import { useSceneState } from './useSceneState.ts'

export const useSceneStore = defineStore('scene', () => {
  const { scene, isFetching, error, deleteSceneModalData } = useSceneState();
  const {
    fetchScene,
    saveDescription,
    saveGmNotes,
    deleteScene,
    openDeleteSceneModal,
    closeDeleteSceneModal,
    isDeletingScene,
    isSavingDescription,
    isSavingGmNotes
  } = useSceneActions(scene, isFetching, error, deleteSceneModalData);

  return {
    scene,
    isFetching,
    error,
    deleteSceneModalData,
    fetchScene,
    saveDescription,
    saveGmNotes,
    deleteScene,
    openDeleteSceneModal,
    closeDeleteSceneModal,
    isDeletingScene,
    isSavingDescription,
    isSavingGmNotes
  }
});
