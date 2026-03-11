import { ref } from 'vue';

export const useSceneSelection = () => {
  const activeSceneId = ref<string | null>(null);

  const setActiveScene = (sceneId: string) => {
    activeSceneId.value = sceneId;
  };

  return { activeSceneId, setActiveScene };
}
