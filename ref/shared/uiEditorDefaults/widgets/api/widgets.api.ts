import { widgets } from './widgets.data';
import type { DefaultWidget } from '../types';

interface DefaultWidgetsApi {
    getDefaultWidgets: () => Promise<DefaultWidget[]>;
}

export const defaultWidgetsApi: DefaultWidgetsApi = {
  getDefaultWidgets: async () => {
    await new Promise(res => setTimeout(res, 100));
    return widgets;
  },
};
