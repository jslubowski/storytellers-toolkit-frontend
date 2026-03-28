import { ref } from 'vue';

import type { ScenarioItem } from '@/domain/scenario/types/scenarioItem.ts';

export const useScenariosState = () => {
  const scenarios = ref<ScenarioItem[]>([]);
  const isFetching = ref(false);
  const isSaving = ref(false);
  const error = ref<string | null>(null);
  const isDeletingScenario = ref(false);
  const deleteScenarioModalData = ref<ScenarioDeleteModalData | null>(null);

  return { scenarios, isFetching, isSaving, error, isDeletingScenario, deleteScenarioModalData };
};

export type ScenarioDeleteModalData = { scenarioId: string; scenarioName: string };
