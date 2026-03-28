<script setup lang="ts">
import { ref } from 'vue'

import { Form, type FormSubmitEvent } from '@primevue/forms'
import { yupResolver } from '@primevue/forms/resolvers/yup'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import * as yup from 'yup'

import { useScenariosStore } from '@/domain/scenario/store/useScenariosStore.ts'

import BaseDialog from '@/components/UI/base-dialog/BaseDialog.vue'
import BaseInputText from '@/components/UI/base-input-text/BaseInputText.vue'

const props = defineProps<{
  scenarioId: string;
}>();

const visible = defineModel<boolean>('visible', { required: true });

const scenariosStore = useScenariosStore();
const formRef = ref();

const formSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string()
});

const formInitialValues = {
  name: '',
  description: ''
};

const resolver = yupResolver(formSchema);

const handleSave = () => {
  formRef.value?.submit();
};

const onFormSubmit = async (e: FormSubmitEvent) => {
  const success = await scenariosStore.addScene(props.scenarioId, {
    name: e.values.name,
    description: e.values.description
  });

  if (success) {
    visible.value = false;
  }
};
</script>

<template>
  <Form
    ref="formRef"
    v-slot="$form"
    @submit="onFormSubmit"
    :validateOnValueUpdate="true"
    :resolver="resolver"
    :initial-values="formInitialValues"
  >
    <BaseDialog
      :on-confirm="handleSave"
      v-model:visible="visible"
      confirm-label="Add Scene"
      header-text="New Scene"
      :disable-confirm="!$form?.name?.value"
    >
      <transition name="p-message-content">
        <Message
          v-if="scenariosStore.error"
          severity="error"
          variant="simple"
          class="error-message"
        >
          {{ scenariosStore.error }}
        </Message>
      </transition>

      <div v-if="scenariosStore.isSaving" class="spinner-wrapper">
        <ProgressSpinner style="width: 40px; height: 40px" />
      </div>

      <template v-else>
        <div class="form-fields">
          <BaseInputText
            name="name"
            label="Scene Name"
            required
            placeholder="e.g. The Dark Forest"
            :error-message="$form.name?.error?.message"
          />
          <BaseInputText
            name="description"
            label="Description"
            placeholder="Describe the scene..."
            :error-message="$form.description?.error?.message"
          />
        </div>
      </template>
    </BaseDialog>
  </Form>
</template>

<style scoped>
.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.spinner-wrapper {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
}

.error-message {
  margin-bottom: 1rem;
}
</style>
