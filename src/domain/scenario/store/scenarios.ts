import {defineStore} from "pinia";
import {ref} from "vue";
import type {ScenarioItem} from "@/domain/scenario/types/scenarioItem.ts";
import {scenarioApi} from "@/domain/scenario/api/scenarioApi.ts";

export const useScenariosStore = defineStore('scenarios', () => {
  const scenarios = ref<ScenarioItem[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchScenarios = async () => {
    isLoading.value = true;
    error.value = null;

    await scenarioApi.getAllScenarios()
      .then(response => {
        scenarios.value = response.data;
      })
      .catch(error => {
        error.value = error;
      })
      .finally(() => {
        isLoading.value = false;
      });
  }

  return { scenarios, isLoading, fetchScenarios };
});
