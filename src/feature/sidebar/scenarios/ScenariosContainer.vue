<script setup lang="ts">
import 'primeicons/primeicons.css'
import ScenariosHeader from "@/feature/sidebar/scenarios/ScenariosHeader.vue";
import {useScenariosStore} from "@/domain/scenario/store/scenarios.ts";
import ScenarioItem from "@/feature/sidebar/scenarios/scenarios-list/ScenarioItem.vue";

const scenarioStore = useScenariosStore();
</script>

<template>
  <div class="scenarios-container">
    <ScenariosHeader/>
    <div class="scenario-list">
      <ScenarioItem
        v-for="scenarioItem in scenarioStore.scenarios"
        :scenario-id="scenarioItem.id"
        :scenario-name="scenarioItem.name"
      />
    </div>
  </div>
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
