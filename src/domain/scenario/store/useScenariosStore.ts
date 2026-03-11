import { defineStore } from 'pinia'

import { useScenariosActions } from './useScenariosActions.ts'
import { useScenariosState } from './useScenariosState.ts'
import { useSceneSelection } from './useSceneSelection.ts'

export const useScenariosStore = defineStore('scenarios', () => {
  const { scenarios, isFetching, isSaving, error } = useScenariosState()
  const { activeSceneId, setActiveScene } = useSceneSelection()
  const {
    fetchScenarios,
    addScenario,
    addScene
  } = useScenariosActions(scenarios, isFetching, isSaving, error, activeSceneId)

  return {
    scenarios,
    isFetching,
    isSaving,
    error,
    activeSceneId,
    fetchScenarios,
    addScenario,
    setActiveScene,
    addScene
  }
});
