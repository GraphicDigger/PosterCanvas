import { variables } from './variable.data';

export const variableApi = {

  getVariableById: (id) => {
    return Promise.resolve(variables[id]);
  },

  getVariables: async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      return variables;
      // return screens.filter(screen => !screen.content)
    } catch (error) {
      throw error;
    }
  },

  updateVariableValue: async (id, newValue) => {
    try {
      // console.log('API updateVariableValue called:', { id, newValue });
      if (variables[id]) {
        variables[id] = {
          ...variables[id],
          value: newValue,
        };
        return variables[id];
      }
      throw new Error('Variable not found');
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
};
