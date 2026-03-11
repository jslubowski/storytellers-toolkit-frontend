<script setup lang="ts">
import { ref, watch } from 'vue'

import { useScenariosStore } from '@/domain/scenario/store/useScenariosStore.ts'

import router from '@/router'

const props = defineProps<{
  scenarioId: string;
  scenarioName: string;
  scenes: { id: string; name: string; }[];
}>();

const emit = defineEmits<{
  addScene: [scenarioId: string];

}>();
const store = useScenariosStore();
const isExpanded = ref(false);

watch(() => store.activeSceneId, (activeSceneId) => {
  if (props.scenes.some(scene => scene.id === activeSceneId)) {
    isExpanded.value = true;
  }});

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

const navigateToScene = (sceneId: string) => {
  router.push({ name: 'scene', params: { scenarioId: props.scenarioId, sceneId } });
};

</script>

<template>
  <div class="scenario-item">
    <div class="scenario-header" @click="toggleExpand">
      <div class="scenario-left">
        <i class="pi pi-chevron-right chevron" :class="{ rotated: isExpanded }" />
        <i class="pi pi-book scenario-icon" />
        <span class="scenario-name">{{ scenarioName }}</span>
      </div>
    </div>

    <Transition name="collapse">
      <div v-if="isExpanded" class="scenes-list">
        <div
          v-for="scene in scenes"
          :key="scene.id"
          class="scene-item"
          :class="{ active: store.activeSceneId === scene.id }"
          @click="navigateToScene(scene.id)"
        >
          <span class="scene-name">{{ scene.name }}</span>
        </div>

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
  padding: 8px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.scenario-header:hover {
  background: hsl(var(--sidebar-accent));
}

.scenario-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.chevron {
  font-size: 0.5rem;
  color: hsl(var(--sidebar-foreground));
  transition: transform 0.2s ease;
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
}

.scene-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.scene-item:hover {
   > span {
     color: hsl(var(--foreground));
   }
  background: hsl(var(--sidebar-accent));
}

.scene-item.active {
  background: hsl(var(--primary) / 0.15);
}

.scene-item.active .scene-name {
  color: hsl(var(--primary));
}

.scene-name {
  font-size: 0.75rem;
  color: hsl(var(--muted-foreground));
}

.add-scene {
  > i {
    font-size: 0.7rem;
  }
  font-size: 0.8rem;
  color: hsl(var(--muted-foreground) / 0.6);
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.add-scene:hover {
  cursor: pointer;
  color: hsl(var(--muted-foreground));
}

.collapse-enter-active,
.collapse-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform-origin: top;
}

.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  transform: scaleY(0.95);
}
</style>
