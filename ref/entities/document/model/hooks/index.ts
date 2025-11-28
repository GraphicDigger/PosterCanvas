import { useDocumentContext, DocumentProvider } from '../context/DocumentContext';
import { useDocumentSelectors } from './useDocumentSelectors';
import { useDocumentQueries } from './useQueries';
import { useUIStates } from './useUIStates';
import { useDocumentMutation } from './useDocumentMutation';

type Document = ReturnType<typeof useDocumentSelectors> &
    ReturnType<typeof useDocumentQueries> &
    ReturnType<typeof useUIStates> &
    ReturnType<typeof useDocumentMutation>

type Plugin<T = {}> = (context: ReturnType<typeof useDocumentContext>) => T;

export const useDocument = (plugins: Plugin[] = [
  useDocumentSelectors,
  useDocumentQueries,
  useUIStates,
  useDocumentMutation,
  //external

]): Document => {

  const context = useDocumentContext();

  return plugins.reduce(
    (acc, plugin) => ({ ...acc, ...plugin(context) }),
    { ...context },
  ) as Document;
};

export {
  DocumentProvider,
  useDocumentQueries,
  useDocumentSelectors,
};
