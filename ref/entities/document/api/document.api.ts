import { documents } from './document.data';
import type { Document } from '../types';

interface DocumentApi {
    getDocuments: () => Promise<Document[]>;
}

export const documentApi: DocumentApi = {
  getDocuments: async () => {
    await new Promise(res => setTimeout(res, 100));
    return documents;
  },
};
