<script setup lang="ts">
import Header from './header/Header.vue';
import ScenariosContainer from "@/feature/sidebar/scenarios/ScenariosContainer.vue";
import {ProgressSpinner} from "primevue";
import {useScenariosStore} from "@/domain/scenario/store/scenarios.ts";
import {onMounted} from "vue";

const scenariosStore = useScenariosStore();

onMounted(() => {
  scenariosStore.fetchScenarios();
});
</script>

<template>
  <div class="scenario-sidebar">
    <Header />

    <div v-if="scenariosStore.isLoading" class="spinner-container">
<!-- change color to --primary, probably by themes      -->
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

</style>
