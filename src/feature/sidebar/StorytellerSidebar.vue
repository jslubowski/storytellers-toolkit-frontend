<script setup lang="ts">
import {onMounted} from "vue";

import {ProgressSpinner} from "primevue";

import {useScenariosStore} from "@/domain/scenario/store/scenarios.ts";

import SidebarHeader from './header/SidebarHeader.vue';

import ScenariosContainer from "@/feature/sidebar/scenarios/ScenariosContainer.vue";

const scenariosStore = useScenariosStore();

onMounted(() => scenariosStore.fetchScenarios());
</script>

<template>
  <div class="scenario-sidebar">
    <SidebarHeader />

    <div v-if="scenariosStore.isFetching" class="spinner-container">
      <ProgressSpinner strokeWidth="4" />
    </div>
    <ScenariosContainer v-else />
  </div>
</template>

<style scoped>
.scenario-sidebar {
  background: hsl(220 14% 10%);
  width: 22rem;
  height: 100%;
  border-right: 1px solid hsl(var(--divide-border));

  display: flex;
  flex-direction: column;
}

.spinner-container {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
}

.p-progress-spinner-circle {
  /* Use the PrimeUI primary variable or your own */
  stroke: hsl(var(--primary)) !important;
  /* Disable the multi-color keyframe animation */
  animation: p-progress-spinner-dash 1.5s ease-in-out infinite !important;
}

</style>
