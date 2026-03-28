<script setup lang="ts">
import { ref } from 'vue';

import { useScenariosStore } from '@/domain/scenario/store/useScenariosStore.ts';

import 'primeicons/primeicons.css';

import AddSceneModal from '@/feature/sidebar/scenarios/modals/AddSceneModal.vue';
import DeleteScenarioModal from '@/feature/sidebar/scenarios/modals/DeleteScenarioModal.vue';
import DeleteSceneModal from '@/feature/sidebar/scenarios/modals/DeleteSceneModal.vue';
import ScenarioItem from '@/feature/sidebar/scenarios/scenarios-list/ScenarioItem.vue';
import ScenariosHeader from '@/feature/sidebar/scenarios/ScenariosHeader.vue';

const scenarioStore = useScenariosStore();

const showAddScene = ref(false);
const activeScenarioId = ref<string | null>(null);

const openAddScene = (scenarioId: string) => {
  activeScenarioId.value = scenarioId;
  showAddScene.value = true;
};
</script>

<template>
  <div class="scenarios-container">
    <ScenariosHeader />
    <div class="scenario-list">
      <ScenarioItem
        v-bind:key="scenarioItem.id"
        v-for="scenarioItem in scenarioStore.scenarios"
        :scenario-id="scenarioItem.id"
        :scenario-name="scenarioItem.name"
        :scenes="scenarioItem.scenes"
        @add-scene="openAddScene"
      />
    </div>
  </div>

  <AddSceneModal
    v-if="activeScenarioId"
    v-model:visible="showAddScene"
    :scenario-id="activeScenarioId"
  />
  <DeleteSceneModal />
  <DeleteScenarioModal />
</template>

<style>
.scenarios-container {
  padding: 1rem 1rem;
}

.scenario-list {
  display: flex;
  flex-direction: column;
}
</style>
