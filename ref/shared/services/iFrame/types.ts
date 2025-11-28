import { IFrameMessageType } from './constants';

export interface IFrameMessage {
  type: IFrameMessageType;
  payload: any;
  timestamp: number;
  requestId?: string;
}

export interface SerializedElement {
  id: string;
  tag: string;
  properties?: {
    style?: Record<string, any>;
    content?: {
      text?: string;
    };
    attributes?: Record<string, any>;
  };
  parentId?: string;
  children?: string[];
}
