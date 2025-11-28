import { useEntityContextManagerContext, EntityContextManagerProvider } from '../context/HooksContext';
import { useEntityManagePanel } from '@/features/multiEntityManagePanel';
import { useEntityContextConnector } from '@/features/entityContextConnector';
import { useScreens } from '@/entities/uiScreen';

type Hooks =
    ReturnType<typeof useEntityManagePanel> &
    ReturnType<typeof useEntityContextConnector> &
    ReturnType<typeof useScreens>

// Тип плагина
type Plugin<T = {}> = (context: ReturnType<typeof useEntityContextManagerContext>) => T;

// syntax: if hook itself is a plugin
const useEntityManagePanelPlugin: Plugin = () =>  useEntityManagePanel();
const useEntityContextConnectorPlugin: Plugin = () =>  useEntityContextConnector();

export const useEntityContextManager = (plugins: Plugin[] = [
  //external
  useEntityManagePanelPlugin,
  useEntityContextConnectorPlugin,
  useScreens,

]): Hooks => {

  const context = useEntityContextManagerContext();

  return plugins.reduce(
    (acc, plugin) => ({ ...acc, ...plugin(context) }),
    { ...context },
  ) as Hooks;
};

export {
  EntityContextManagerProvider,
};
