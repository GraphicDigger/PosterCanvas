export * from './constants/pickerTabs';

// Export missing useColor hook
export const useColor = () => {
  // Placeholder implementation
  return {
    color: '#000000',
    setColor: () => {},
    format: 'hex',
    setFormat: () => {},
  };
};
