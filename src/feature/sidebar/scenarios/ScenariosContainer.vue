<script setup lang="ts">
import {useScenariosStore} from "@/domain/scenario/store/scenarios.ts";

import 'primeicons/primeicons.css'

import ScenarioItem from "@/feature/sidebar/scenarios/scenarios-list/ScenarioItem.vue";
import ScenariosHeader from "@/feature/sidebar/scenarios/ScenariosHeader.vue";

const scenarioStore = useScenariosStore();
</script>

<template>
  <div class="scenarios-container">
    <ScenariosHeader/>
    <div class="scenario-list">
      <ScenarioItem
        v-bind:key="scenarioItem.id"
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
