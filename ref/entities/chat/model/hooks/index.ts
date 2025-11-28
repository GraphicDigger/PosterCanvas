import { useChatContext, ChatProvider } from '../context/ChatContext';
import { useChatSelectors } from './useChatSelectors';
import { useChatQueries } from './useQueries';
import { useUIStates } from './useUIStates';
import { useChatMutation } from './useChatMutation';

type Chat =     ReturnType<typeof useChatSelectors> &
                ReturnType<typeof useChatQueries> &
                ReturnType<typeof useUIStates> &
                ReturnType<typeof useChatMutation>


type Plugin<T = {}> = (context: ReturnType<typeof useChatContext>) => T;

export const useChat = (plugins: Plugin[] = [
  useChatSelectors,
  useChatQueries,
  useUIStates,
  useChatMutation,
  //external

]): Chat => {

  const context = useChatContext();

  return plugins.reduce(
    (acc, plugin) => ({ ...acc, ...plugin(context) }),
    { ...context },
  ) as Chat;
};

export { useChatQueries, ChatProvider };
