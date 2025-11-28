import { mockDataRegistry } from '@/shared/services/api';
import { screens } from '@/entities/uiScreen/api/mock.data';

export function registerAllMockData(): void {
  console.log('🎯 Registering all mock data...');
  mockDataRegistry.register('screens', () => screens);

}
