import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addCode } from '../../model';
import { v4 as uuidv4 } from 'uuid';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { updateCode } from '../../model';
// Хук для работы с мутациями кода
export const useCodeMutation = () => {
  const dispatch = useDispatch();

  const createCodeHandler = useCallback((code) => {
    if (!code) {return;}
    // Иначе создаем новый код
    const newCode = {
      id: code.id || `code-${uuidv4()}`,
      name: code.name || 'Новый код',
      kind: ENTITY_KINDS.CODE,
      language: code.language || 'jsx',
      content: code.content || '',
      componentId: code.componentId,
      ...code,
    };
    dispatch(createCodeAction(code));
  }, [dispatch]);

  const addCodeHandler = useCallback((code) => {
    dispatch(addCode(code));
    return code;
  }, [dispatch]);

  const updateCodeHandler = useCallback((code) => {
    if (!code || !code.id) {return;}
    dispatch(updateCode(code));
  }, [dispatch]);

  const removeCodeHandler = useCallback((codeId) => {
    if (!codeId) {return;}
    dispatch(removeCodeAction(codeId));
  }, [dispatch]);


  return {
    createCode: createCodeHandler,
    addCode: addCodeHandler,
    updateCode: updateCodeHandler,
    removeCode: removeCodeHandler,
  };
};
