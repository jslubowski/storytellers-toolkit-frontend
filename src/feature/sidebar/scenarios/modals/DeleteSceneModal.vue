<script setup lang="ts">
import { useScenariosStore } from '@/domain/scenario/store/useScenariosStore.ts'

import BaseDialog from '@/components/UI/base-dialog/BaseDialog.vue'

import { useSceneStore } from '@/domain/scene/scene/useSceneStore.ts'

const sceneStore = useSceneStore();
const scenarioStore = useScenariosStore();

const handleDelete = async () => {
  await sceneStore.deleteScene();
  sceneStore.closeDeleteSceneModal();
  await scenarioStore.fetchScenarios();
};

</script>

<template>
  <BaseDialog
  :visible="!!sceneStore.deleteSceneModalData"
  @update:visible="(val) => !val && sceneStore.closeDeleteSceneModal()"
  header-text="Delete Scene"
  confirm-label="Delete"
  :on-confirm="handleDelete"
  :loading="sceneStore.isDeletingScene"
  :disable-confirm="sceneStore.isDeletingScene"
  confirm-button-severity="danger"
  >
    <p>Are you sure you want to delete {{ sceneStore.deleteSceneModalData!.sceneName ?? ''}}? This action cannot be undone.</p>
  </BaseDialog>
</template>

<style scoped>
p {
  font-size: 0.875rem;
}
</style>
