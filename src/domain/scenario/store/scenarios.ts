import {ref} from "vue";
import {defineStore} from "pinia";

import type { CreateScenarioCommand } from '@/domain/scenario/types/createScenarioCommand.ts'
import type {ScenarioItem} from "@/domain/scenario/types/scenarioItem.ts";

import {scenarioApi} from "@/domain/scenario/api/scenarioApi.ts";

export const useScenariosStore = defineStore('scenarios', () => {
  const scenarios = ref<ScenarioItem[]>([]);
  const isFetching = ref(false);
  const isSaving = ref(false);
  const error = ref<string | null>(null);

  const fetchScenarios = async () => {
    isFetching.value = true;
    error.value = null;

    try {
      const { data } = await scenarioApi.getAllScenarios();
      scenarios.value = data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = "An unexpected error occurred";
      }
    } finally {
      isFetching.value = false;
    }
  };

  const addScenario = async (item: CreateScenarioCommand) => {
    isSaving.value = true;
    error.value = null;

    try {
      await scenarioApi.createScenario(item);
      fetchScenarios().catch((err: Error) => {
        error.value = err.message;
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = "An unexpected error occurred";
      }
    } finally {
      isSaving.value = false;
    }
  };

  return { scenarios, isFetching, isSaving, error, fetchScenarios, addScenario };
});
