import { useWireframeMode } from '@/entities/mode/editorMode';
import { useWireframeBlockMutations, useWireframeBlockStates, useWireframeBlocks } from '@/entities/wireframeBlock';
import { useScreenStates, useScreens } from '@/entities/uiScreen';
import { useDocument } from '@/entities/document';
import { useTask } from '@/entities/task';
import { useChat } from '@/entities/chat';
import { useWireframeContext } from '../context/WireframeContext';

type Wireframe =
    ReturnType<typeof useWireframeMode> &
    ReturnType<typeof useWireframeBlockMutations> &
    ReturnType<typeof useWireframeBlocks> &
    ReturnType<typeof useScreenStates> &
    ReturnType<typeof useWireframeBlockStates> &
    ReturnType<typeof useScreens> &
    ReturnType<typeof useDocument> &
    ReturnType<typeof useTask> &
    ReturnType<typeof useChat>

// Тип плагина
type Plugin<T = {}> = (context: ReturnType<typeof useWireframeContext>) => T;

const useDocumentPlugin: Plugin = () => useDocument();
const useTaskPlugin: Plugin = () => useTask();
const useChatPlugin: Plugin = () => useChat();

export const useWireframe = (plugins: Plugin[] = [
  //external
  useWireframeMode,
  useWireframeBlockMutations,
  useWireframeBlockStates,
  useWireframeBlocks,
  useScreenStates,
  useScreens,
  useDocumentPlugin,
  useTaskPlugin,
  useChatPlugin,
]): Wireframe => {

  const context = useWireframeContext();

  return plugins.reduce(
    (acc, plugin) => ({ ...acc, ...plugin(context) }),
    { ...context },
  ) as Wireframe;
};
