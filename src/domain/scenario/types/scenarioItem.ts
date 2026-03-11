export type ScenarioItem = {
  id: string;
  name: string;
  description: string;
  scenes: SceneSummaryItem[];
};

export type SceneSummaryItem = {
  id: string;
  name: string;
};
