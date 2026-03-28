import { defineStore } from 'pinia';

import { useScenariosActions } from './useScenariosActions.ts';
import { useScenariosState } from './useScenariosState.ts';
import { useSceneSelection } from '../../scene/store/useSceneSelection.ts';

export const useScenariosStore = defineStore('scenarios', () => {
  const { scenarios, isFetching, isSaving, error, isDeletingScenario, deleteScenarioModalData } =
    useScenariosState();
  const sceneSelection = useSceneSelection();
  const scenariosActions = useScenariosActions(
    scenarios,
    isFetching,
    isSaving,
    error,
    sceneSelection.activeSceneId,
    isDeletingScenario,
    deleteScenarioModalData,
  );

  return {
    scenarios,
    isFetching,
    isSaving,
    error,
    isDeletingScenario,
    deleteScenarioModalData,
    ...sceneSelection,
    ...scenariosActions,
  };
});
