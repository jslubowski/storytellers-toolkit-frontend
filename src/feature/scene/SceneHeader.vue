<script setup lang="ts">
import { computed } from 'vue'

import { useSceneStore } from '@/domain/scenario/store/scene/useSceneStore.ts'
import { useScenariosStore } from '@/domain/scenario/store/useScenariosStore.ts'

const props = defineProps<{
  scenarioId: string;
}>();

const sceneStore = useSceneStore();
const scenariosStore = useScenariosStore();

const scenarioName = computed(() => {
  return scenariosStore.scenarios.find(s => s.id === props.scenarioId)?.name || 'Unnamed Scenario'
});

</script>

<template>
  <div class="scene-header">
    <div class="scene-header-content">
      <div class="scenario-name uppercase tracking-wider text-xs">{{ scenarioName }}</div>
      <div class="font-display text-2xl">{{ sceneStore.scene?.name }}</div>
    </div>
  </div>
</template>

<style scoped>
.scene-header {
  height: 14rem;
  border-bottom: 1px solid hsl(var(--divide-border));
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}

.scene-header-content {
  margin-top: auto;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.scenario-name {
  color: hsl(var(--primary));
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
</style>
