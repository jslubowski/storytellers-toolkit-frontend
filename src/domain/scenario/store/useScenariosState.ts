import { ref } from 'vue';

import type { ScenarioItem } from '@/domain/scenario/types/scenarioItem.ts';

export const useScenariosState = () => {
  const scenarios = ref<ScenarioItem[]>([]);
  const isFetching = ref(false);
  const isSaving = ref(false);
  const error = ref<string | null>(null);

  return { scenarios, isFetching, isSaving, error };
};
