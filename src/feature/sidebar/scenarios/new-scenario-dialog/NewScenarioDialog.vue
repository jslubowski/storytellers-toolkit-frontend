<script setup lang="ts">
import { ref } from 'vue'

import { Form, type FormSubmitEvent } from '@primevue/forms'
import { yupResolver } from '@primevue/forms/resolvers/yup'
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';

import { useScenariosStore } from '@/domain/scenario/store/scenarios.ts'

import BaseDialog from '@/components/UI/base-dialog/BaseDialog.vue'
import BaseInputText from '@/components/UI/base-input-text/BaseInputText.vue'

import {
  type NewScenarioForm, newScenarioFormSchema
} from '@/feature/sidebar/scenarios/new-scenario-dialog/types/NewScenarioForm.ts'

const isDialogVisible = defineModel<boolean>('isDialogVisible', { required: true });
const scenariosStore = useScenariosStore();
const handleSave = () => {
  formRef.value?.submit();
};
const onFormSubmit = async (e: FormSubmitEvent) => {
  const values = {...e.values} as NewScenarioForm;
  await scenariosStore.addScenario(values);

  if (!scenariosStore.error) {
    isDialogVisible.value = false;
    return;
  }
};
const formRef = ref();

const formInitialValues: NewScenarioForm = {
  name: ''
}
const resolver = yupResolver(newScenarioFormSchema)

</script>
<template>
  <Form ref="formRef" v-slot="$form" @submit="onFormSubmit" :validateOnValueUpdate="true" :resolver="resolver"
        :initial-values="formInitialValues">
    <BaseDialog :on-confirm="handleSave" v-model:visible="isDialogVisible"
                confirm-label="Create Scenario"
                header-text="New Scenario"
                :disable-confirm="!$form?.name?.value"
    >
      <transition name="p-message-content">
        <Message
          v-if="scenariosStore.error"
          severity="error"
          variant="simple"
          class="mb-4"
        >
          {{ scenariosStore.error }}
        </Message>
      </transition>

      <div v-if="scenariosStore.isSaving" class="flex justify-center py-4">
        <ProgressSpinner style="width: 40px; height: 40px" />
      </div>
      <BaseInputText
        v-else
        name="name"
        label="Scenario Name"
        required placeholder="e.g. The Lost Crypt"
        :error-message="$form.name?.error?.message" />
    </BaseDialog>
  </Form>
</template>

