import { object, ObjectSchema, string } from 'yup'

export type NewScenarioForm = {
  name: string,
};

export const newScenarioFormSchema: ObjectSchema<NewScenarioForm> = object({
  name: string().required('Scenario name is required'),
});
