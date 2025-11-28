import { useDocument } from '@/entities/document';
import { useTask } from '@/entities/task';
import { useChat } from '@/entities/chat';
import { useScreens } from '@/entities/uiScreen';

import { useEntityContextConnectorContext, EntityContextConnectorProvider } from '../context/HooksContext';
import { useContextLink } from '@/entities/entityContextLink';
import { useViewer } from '@/shared/uiKit/Viewer';

type Hooks =
    ReturnType<typeof useDocument> &
    ReturnType<typeof useTask> &
    ReturnType<typeof useChat> &
    ReturnType<typeof useScreens> &
    ReturnType<typeof useContextLink> &
    ReturnType<typeof useViewer>


// Тип плагина
type Plugin<T = {}> = (context: ReturnType<typeof useEntityContextConnectorContext>) => T;

// syntax: if hook itself is a plugin
const useDocumentPlugin: Plugin = () =>  useDocument();
const useTaskPlugin: Plugin = () =>  useTask();
const useChatPlugin: Plugin = () =>  useChat();
const useContextLinkPlugin: Plugin = () =>  useContextLink();

export const useEntityContextConnector = (plugins: Plugin[] = [
  //external
  useDocumentPlugin,
  useTaskPlugin,
  useChatPlugin,
  useScreens,
  useContextLinkPlugin,
  useViewer,
]): Hooks => {

  const context = useEntityContextConnectorContext();

  return plugins.reduce(
    (acc, plugin) => ({ ...acc, ...plugin(context) }),
    { ...context },
  ) as Hooks;
};

export {
  EntityContextConnectorProvider,
};
