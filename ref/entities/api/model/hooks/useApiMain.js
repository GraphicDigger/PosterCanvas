import { useApi, useApiMutations } from './useApi';
import { useApiCall, useApiCallMutations } from './useApiCall';

/**
 * Основной хук для работы с API и API-вызовами
 * Объединяет функциональность useApi и useApiCall для удобства использования
 */
export const useApiMain = () => {
  const api = useApi();
  const apiCall = useApiCall();

  return {
    // Из useApi
    allApis: api.allApis,
    customApis: api.customApis,
    categoryApis: api.categoryApis,
    selectedApiId: api.selectedApiId,
    selectedApi: api.selectedApi,
    connector: api.connector,

    // Из useApiCall
    selectedCallId: apiCall.selectedCallId,
    selectedCall: apiCall.selectedCall,
    callHeaders: apiCall.callHeaders,
    callParameters: apiCall.callParameters,
  };
};

/**
 * Хук для работы с мутациями API и API-вызовов
 * Объединяет функциональность useApiMutations и useApiCallMutations
 */
export const useApiMainMutations = () => {
  const apiMutations = useApiMutations();
  const apiCallMutations = useApiCallMutations();

  return {
    // Из useApiMutations
    updateConnector: apiMutations.updateConnector,

    // Общие мутации (дублируются в обоих хуках)
    addCall: apiMutations.addCall || apiCallMutations.addCall,
    removeCall: apiMutations.removeCall || apiCallMutations.removeCall,
  };
};
