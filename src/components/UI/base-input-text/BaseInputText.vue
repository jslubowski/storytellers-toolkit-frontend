<script setup lang="ts">
import InputText from 'primevue/inputtext'

interface Props {
  name: string;
  label?: string;
  errorMessage?: string;
  required?: boolean;
}

defineProps<Props>()

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <div class="field-container">
    <label v-if="label" :for="name" class="input-label">
      {{ label }}
      <span v-if="required" class="required-star">*</span>
    </label>

    <InputText
      v-bind="$attrs"
      :id="name"
      :name="name"
      :invalid="!!errorMessage"
      size="small"
    />

    <small v-if="errorMessage" class="error-text">
      {{ errorMessage }}
    </small>
  </div>
</template>

<style scoped>
.field-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input-label {
  font-weight: 500;
  font-size: 0.875rem;
  color: hsl(var(--foreground));
  margin-bottom: 6px;
}

.required-star {
  color: #ef4444;
  margin-left: 2px;
}

.error-text {
  color: #ef4444;
  font-size: 0.75rem;
  min-height: 1rem;
}
</style>
