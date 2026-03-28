<script lang="ts" setup>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useRoute } from 'vue-router';

import SceneEditorField from './SceneEditorField.vue';

import { useSceneStore } from '@/domain/scene/scene/useSceneStore.js';

const DESCRIPTION_MAX = 2000;
const GM_NOTES_MAX = 5000;

const route = useRoute();
const sceneStore = useSceneStore();
const scenarioId = route.params.scenarioId as string;
const sceneId = route.params.sceneId as string;

const { isSavingDescription, isSavingGmNotes } = storeToRefs(sceneStore);

const description = ref(sceneStore.scene?.description ?? '');
const gmNotes = ref(sceneStore.scene?.gmNotes ?? '');

watch(() => sceneStore.scene, (newScene) => {
  description.value = newScene?.description ?? '';
  gmNotes.value = newScene?.gmNotes ?? '';
});

watch(description, (val) => {
  if (val.length <= DESCRIPTION_MAX) sceneStore.saveDescription(scenarioId, sceneId, val);
});

watch(gmNotes, (val) => {
  if (val.length <= GM_NOTES_MAX) sceneStore.saveGmNotes(scenarioId, sceneId, val);
});
</script>

<template>
  <div class="scene-body">
    <SceneEditorField
      v-model="description"
      label="Scene Description"
      id="scene_description"
      :max="DESCRIPTION_MAX"
      :is-saving="isSavingDescription"
    />
    <SceneEditorField
      v-model="gmNotes"
      label="GM Notes"
      id="gm_notes"
      :max="GM_NOTES_MAX"
      :is-saving="isSavingGmNotes"
    />
  </div>
</template>

<style scoped>
.scene-body {
  margin: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 25rem;
}
</style>
