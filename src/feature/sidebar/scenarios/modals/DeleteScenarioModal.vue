<script setup lang="ts">
import { useScenariosStore } from '@/domain/scenario/store/useScenariosStore.ts';

import BaseDialog from '@/components/UI/base-dialog/BaseDialog.vue';

const scenarioStore = useScenariosStore();

const handleDelete = async () => {
  await scenarioStore.deleteScenario();
  scenarioStore.closeDeleteScenarioModal();
};
</script>
<template>
  <BaseDialog
    :visible="!!scenarioStore.deleteScenarioModalData"
    @update:visible="(val) => !val && scenarioStore.closeDeleteScenarioModal()"
    header-text="Delete Scenario"
    confirm-label="Delete"
    :on-confirm="handleDelete"
    :loading="scenarioStore.isDeletingScenario"
    :disable-confirm="scenarioStore.isDeletingScenario"
    confirm-button-severity="danger"
  >
    <p>
      Are you sure you want to delete
      {{ scenarioStore.deleteScenarioModalData?.scenarioName ?? '' }} and all its scenes? This
      action cannot be undone.
    </p>
  </BaseDialog>
</template>
