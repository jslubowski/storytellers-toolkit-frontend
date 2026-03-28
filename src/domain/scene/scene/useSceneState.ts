import { ref } from 'vue'

import type { SceneItem } from '@/domain/scene/types/sceneItem.ts'

export const useSceneState = () => {
  const scene = ref<SceneItem | null>(null)
  const isFetching = ref(false)
  const error = ref<string | null>(null)

  const deleteSceneModalData = ref<DeleteSceneModalData| null>(null)

  return { scene, isFetching, error, deleteSceneModalData }
}

export type DeleteSceneModalData = { scenarioId: string; sceneId: string; sceneName: string }
