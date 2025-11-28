export const IFrameMessageType = {
  // Host -> IFrame
  SYNC_ELEMENTS: 'SYNC_ELEMENTS',
  FOCUS_ELEMENT: 'FOCUS_ELEMENT',
  CLEAR_FOCUS: 'CLEAR_FOCUS',
  PING: 'PING',

  // IFrame -> Host
  SANDBOX_READY: 'SANDBOX_READY',
  CANVAS_CLICKED: 'CANVAS_CLICKED',
  ELEMENT_BOUNDS_UPDATE: 'ELEMENT_BOUNDS_UPDATE',
  PONG: 'PONG',
  RESPONSE: 'RESPONSE',
  ERROR: 'ERROR',
} as const;

export type IFrameMessageType =
  typeof IFrameMessageType[keyof typeof IFrameMessageType];

