import { useEntityManagePanelContext, EntityManagePanelProvider } from '../context/HooksContext';
import { useViewer } from '@/shared/uiKit/Viewer';


type Hooks =
    ReturnType<typeof useViewer>

type Plugin<T = {}> = (context: ReturnType<typeof useEntityManagePanelContext>) => T

// syntax: if hook itself is a plugin
// const useDocumentPlugin: Plugin = () =>  useDocument()

export const useEntityManagePanel = (plugins: Plugin[] = [

  //external
  useViewer,

]): Hooks => {

  const context = useEntityManagePanelContext();

  return plugins.reduce(
    (acc, plugin) => ({ ...acc, ...plugin(context) }),
    { ...context },
  ) as Hooks;
};

export {
  EntityManagePanelProvider,
};
