import { ENTITY_KINDS } from '@/shared/constants/entityKinds';
import { taskAdapter } from '@/entities/task/model/store/adapter';
import { documentAdapter } from '@/entities/document/model/store/adapter';
import { codeAdapter } from '@/entities/code/model/store/adapter';
import { componentAdapter } from '@/entities/uiComponent/model/store/adapter';
import { chatAdapter } from '@/entities/chat/model/store/adapter';

export const entityAdapters = {
  [ENTITY_KINDS.TASK]: taskAdapter,
  [ENTITY_KINDS.DOCUMENT]: documentAdapter,
  [ENTITY_KINDS.CHAT]: chatAdapter,
  [ENTITY_KINDS.CODE]: codeAdapter,
  [ENTITY_KINDS.COMPONENT]: componentAdapter,
};
