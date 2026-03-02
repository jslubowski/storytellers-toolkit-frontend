<script setup lang="ts">
import {ref} from "vue";

import Button from "primevue/button";

import NewScenarioDialog
  from '@/feature/sidebar/scenarios/new-scenario-dialog/NewScenarioDialog.vue'

const isDialogVisible = ref(false);

const openDialog = () => {
  isDialogVisible.value = true;
};

</script>

<template>
  <div class="container-header">
    <div class="uppercase text-muted-foreground tracking-wider">Scenarios</div>
    <Button @click="openDialog" class="add-scenario-button" size="small" icon="pi pi-plus"/>
  </div>
  <NewScenarioDialog v-model:is-dialog-visible="isDialogVisible" />
</template>

<style scoped>
.container-header {
  display: flex;
  align-content: center;
  flex-direction: row;
  justify-content: space-between;

  > .uppercase {
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
}

.add-scenario-button {
  background-color: transparent;
  color: hsl(var(--muted-foreground));
  border-color: transparent;
  padding: 4px;
}

.add-scenario-button:hover {
  background: hsl(var(--sidebar-accent)) !important;
  border-color: hsl(var(--sidebar-accent)) !important;
  color: var(--primary) !important;
}

</style>
