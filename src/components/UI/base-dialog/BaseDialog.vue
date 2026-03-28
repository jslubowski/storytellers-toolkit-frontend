<script setup lang="ts">
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

const props = defineProps<{
  headerText: string;
  confirmLabel: string;
  disableConfirm?: boolean;
  onConfirm: () => void;
  loading?: boolean;
  confirmButtonSeverity?: 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast';
}>()

const visible = defineModel<boolean>('visible', { required: true })
</script>

<template>
  <Dialog
    modal
    class="base-dialog"
    v-model:visible="visible"
    :draggable="false"
    :style="{ width: '32rem'}"
    :pt="{
      pcCloseButton: {
        root: {
          class: 'my-custom-close-btn',
          size: 'small',
        }
      }
    }"
  >
    <template #header>
      <h3 class="text-glow header-text">{{ headerText }}</h3>
    </template>
    <slot></slot>
    <template #footer>
      <Button class="base-dialog-button" @click="visible = false" severity="warn" size="small"
              label="Cancel" />
      <Button class="base-dialog-button" @click="props.onConfirm()" :disabled="disableConfirm"
              size="small" :label="confirmLabel" :loading="loading" :severity="props.confirmButtonSeverity" />
    </template>
  </Dialog>
</template>

<style>
.base-dialog {
  width: 25rem;
}

.my-custom-close-btn:hover {
  background: hsl(var(--sidebar-accent)) !important;
}

.header-text {
  color: hsl(var(--popover-foreground));
}

.my-custom-close-btn {
  border-radius: 4px !important;
  transition: all 0.3s !important;
}

.my-custom-close-btn:hover {
  color: hsl(var(--sidebar-foreground)) !important;
}

.base-dialog-button {
  padding: 8px 16px !important;
}

h3 {
  margin: 0;
}
</style>
