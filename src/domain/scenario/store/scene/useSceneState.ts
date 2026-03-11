import { ref } from 'vue'

import type { SceneItem } from '@/domain/scenario/types/sceneItem.ts'

export const useSceneState = () => {
  const scene = ref<SceneItem | null>(null);
  const isFetching = ref(false);
  const error = ref<string | null>(null);

  return { scene, isFetching, error };
};
