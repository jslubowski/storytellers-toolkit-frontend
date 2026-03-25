<script lang="ts" setup>
import { computed } from 'vue'

import Textarea from 'primevue/textarea'

const model = defineModel<string>({ required: true });

const props = defineProps<{
  label: string;
  id: string;
  max: number;
  isSaving: boolean;
}>();

const isWarning = computed(() => model.value.length > props.max * 0.9);
const isDanger = computed(() => model.value.length >= props.max);
</script>

<template>
  <div class="field">
    <div class="field-header">
      <label :for="id">{{ label }}</label>
      <div class="field-meta">
        <span class="char-count" :class="{ warning: isWarning, danger: isDanger }">
          {{ model.length }} / {{ max }}
        </span>
      </div>
    </div>
    <Textarea
      fluid
      :id="id"
      v-model="model"
      style="resize: none"
      :maxlength="max"
    />
  </div>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  min-height: 0;
}

.field-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.field-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

label {
  font-family: 'Cinzel', serif;
  font-size: 0.875rem;
  color: hsl(var(--primary));
  font-weight: 500;
}

.saving, .saved, .char-count {
  font-size: 0.7rem;
}

.saving {
  color: hsl(var(--muted-foreground));
  display: flex;
  align-items: center;
  gap: 4px;
}

.saved {
  color: hsl(var(--primary));
  display: flex;
  align-items: center;
  gap: 4px;
}

.char-count {
  color: hsl(var(--muted-foreground));
}

.char-count.warning {
  color: hsl(var(--warning, 38 92% 50%));
}

.char-count.danger {
  color: hsl(var(--destructive));
}

:deep(.p-textarea) {
  height: 100%;
}
</style>
