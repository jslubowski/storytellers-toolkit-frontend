<script setup lang="ts">
import { ref, watch } from 'vue';

import Button from 'primevue/button';

import { useScenariosStore } from '@/domain/scenario/store/useScenariosStore.ts';

import SceneItem from './SceneItem.vue'; // Import child

import { useSceneStore } from '@/domain/scene/scene/useSceneStore.ts';
import router from '@/router';

const props = defineProps<{
  scenarioId: string;
  scenarioName: string;
  scenes: { id: string; name: string }[];
}>();

const emit = defineEmits<{
  addScene: [scenarioId: string];
}>();

const scenariosStore = useScenariosStore();
const sceneStore = useSceneStore();
const isExpanded = ref(false);
const isHoveredOver = ref(false);

watch(
  () => scenariosStore.activeSceneId,
  (activeId) => {
    if (props.scenes.some((s) => s.id === activeId)) {
      isExpanded.value = true;
    }
  },
  { immediate: true },
);

const navigateToScene = (sceneId: string) => {
  router.push({ name: 'scene', params: { scenarioId: props.scenarioId, sceneId } });
};

const handleDeleteScene = (id: string, name: string) => {
  sceneStore.openDeleteSceneModal(props.scenarioId, id, name);
};
</script>

<template>
  <div class="scenario-item" @mouseenter="isHoveredOver = true" @mouseleave="isHoveredOver = false">
    <div class="scenario-header">
      <div class="scenario-left" @click="isExpanded = !isExpanded">
        <div class="chevron-wrapper">
          <i class="pi pi-chevron-right chevron" :class="{ rotated: isExpanded }" />
        </div>
        <i class="pi pi-book scenario-icon" />
        <span class="scenario-name">{{ scenarioName }}</span>
      </div>

      <Transition name="fade">
        <Button
          v-show="isHoveredOver"
          class="delete-button"
          size="small"
          icon="pi pi-trash"
          @click="() => scenariosStore.openDeleteScenarioModal(scenarioId, scenarioName)"
        />
      </Transition>
    </div>

    <Transition name="collapse">
      <div v-if="isExpanded" class="scenes-list">
        <SceneItem
          v-for="scene in scenes"
          :key="scene.id"
          :scene="scene"
          :is-active="scenariosStore.activeSceneId === scene.id"
          @navigate="navigateToScene"
          @delete="handleDeleteScene"
        />
        <div class="add-scene" @click.stop="emit('addScene', scenarioId)">
          <i class="pi pi-plus add-icon" />
          <span>Add scene</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.scenario-item {
  width: 100%;
  user-select: none;
}

.scenario-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.scenario-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  padding: 8px 0;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.15s ease;
}

.scenario-left:hover {
  background: hsl(var(--sidebar-accent));
}

.chevron-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.chevron {
  display: block;
  transform-origin: center;
  font-size: 0.5rem;
  color: hsl(var(--sidebar-foreground));
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.chevron.rotated {
  transform: rotate(90deg);
}

.scenario-icon {
  font-size: 0.8rem;
  color: hsl(var(--primary));
}

.scenario-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: hsl(var(--sidebar-foreground));
}

.scenes-list {
  padding: 2px 0 2px 28px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.add-scene {
  font-size: 0.8rem;
  color: hsl(var(--muted-foreground) / 0.6);
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: color 0.15s ease;
}

.add-scene:hover {
  color: hsl(var(--muted-foreground));
}

.add-icon {
  font-size: 0.7rem;
}

/* Transitions */
.collapse-enter-active,
.collapse-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  transform-origin: top;
}

.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  transform: scaleY(0.95);
}

.delete-button {
  font-size: 0.75rem;
  background-color: transparent;
  border-color: transparent;
  color: hsl(var(--muted-foreground) / 0.6);
  transition: all 0.2s ease;
}

.delete-button:hover {
  color: hsl(var(--destructive)) !important;
  background-color: hsl(var(--destructive) / 0.1) !important;
  border-color: transparent !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
