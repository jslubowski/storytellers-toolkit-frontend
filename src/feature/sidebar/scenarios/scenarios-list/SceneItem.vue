<script setup lang="ts">
import { ref } from 'vue';

import Button from 'primevue/button';

import { useScenariosStore } from '@/domain/scenario/store/useScenariosStore.ts';

const props = defineProps<{
  scene: { id: string; name: string };
  isActive: boolean;
}>();

const emit = defineEmits<{
  navigate: [id: string];
}>();

const isHoveredOver = ref(false);

const scenarioStore = useScenariosStore();

const handleScenarioDelete = () =>
  scenarioStore.openDeleteScenarioModal(props.scene.id, props.scene.name);
</script>

<template>
  <div class="scene-item" @mouseenter="isHoveredOver = true" @mouseleave="isHoveredOver = false">
    <div class="scene-name" :class="{ active: isActive }" @click="emit('navigate', scene.id)">
      {{ scene.name }}
    </div>
    <Transition name="fade">
      <Button
        class="delete-button"
        v-show="isHoveredOver || isActive"
        size="small"
        icon="pi pi-trash"
        @click="handleScenarioDelete"
      />
    </Transition>
  </div>
</template>

<style scoped>
.scene-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.scene-name:hover {
  > span {
    color: hsl(var(--foreground));
  }

  background: hsl(var(--sidebar-accent));
}

.scene-name.active {
  background: hsl(var(--primary) / 0.15);
  color: hsl(var(--primary));
}

.scene-name {
  font-size: 0.75rem;
  color: hsl(var(--muted-foreground));
  gap: 8px;
  padding: 7px 8px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.15s ease;
  flex: 1;
  height: 100%;
}

.delete-button {
  font-size: 0.75rem;
  background-color: transparent;
  border-color: transparent;
  color: hsl(var(--muted-foreground) / 0.6);
}

.delete-button:hover {
  color: hsl(var(--destructive)) !important;
  background-color: hsl(var(--destructive) / 0.1) !important;
  border-color: transparent !important;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
