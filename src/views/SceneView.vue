<script setup lang="ts">
import { computed, watch } from 'vue'

import ProgressSpinner from 'primevue/progressspinner';
import { useRoute } from 'vue-router';

import { useSceneStore } from '@/domain/scenario/store/scene/useSceneStore.ts';
import { useScenariosStore } from '@/domain/scenario/store/useScenariosStore.ts'

import SceneBody from '@/feature/scene/SceneBody.vue'
import SceneHeader from '@/feature/scene/SceneHeader.vue'

const route = useRoute();
const scenariosStore = useScenariosStore();
const sceneStore = useSceneStore();

const scenarioId = computed(() => route.params.scenarioId as string);
const sceneId = computed(() => route.params.sceneId as string);

watch(
  [scenarioId, sceneId],
  async ([newScenarioId, newSceneId]) => {
    if (newScenarioId && newSceneId) {
      scenariosStore.setActiveScene(newSceneId);
      await sceneStore.fetchScene(newScenarioId, newSceneId);
    }
  },
  { immediate: true }
);

</script>

<template>
  <div class="scene-view">
    <div v-if="sceneStore.isFetching" class="spinner-container">
      <ProgressSpinner strokeWidth="4" />
    </div>
    <div v-else-if="sceneStore.error">{{ sceneStore.error }}</div>
    <template v-else-if="sceneStore.scene">
      <SceneHeader :scenario-id="scenarioId" />
      <SceneBody />
    </template>
  </div>
</template>

<style scoped>
.scene-view {
  height: 100%;
}

.spinner-container {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}
</style>
