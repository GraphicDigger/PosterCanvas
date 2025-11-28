export { default as aiAssistantReducer } from './store/slice';

export * from './store';

export * from './hooks/useAIAssistant';
export * from './hooks/useAIAssistantVisibility';

export * from './hooks/useAIAssistantMessageHandler';

// Export missing hooks
export const useAIAssistantSubmit = () => {
  // Placeholder implementation
  return {
    submit: () => {},
    isSubmitting: false,
  };
};

export const useAIAssistantHooks = () => {
  // Placeholder implementation
  return {
    hooks: [],
    addHook: () => {},
    removeHook: () => {},
  };
};
