// Test for API TypeScript migration
import { apiApi } from './api.api';
import type { ApiResponse } from '../types';

describe('API TypeScript Migration', () => {
  it('should return properly typed API response', async () => {
    const response: ApiResponse = await apiApi.getApis();

    // Test that response has correct structure
    expect(response).toHaveProperty('apis');
    expect(response).toHaveProperty('categories');
    expect(Array.isArray(response.apis)).toBe(true);
    expect(Array.isArray(response.categories)).toBe(true);

    // Test that each API has required properties
    if (response.apis.length > 0) {
      const firstApi = response.apis[0];
      expect(firstApi).toHaveProperty('id');
      expect(firstApi).toHaveProperty('name');
      expect(firstApi).toHaveProperty('categoryId');
      expect(firstApi).toHaveProperty('connector');

      // Test connector structure
      expect(firstApi.connector).toHaveProperty('id');
      expect(firstApi.connector).toHaveProperty('name');
      expect(firstApi.connector).toHaveProperty('authentication');
      expect(firstApi.connector).toHaveProperty('headers');
      expect(firstApi.connector).toHaveProperty('parameters');
      expect(firstApi.connector).toHaveProperty('calls');

      // Test that arrays are properly typed
      expect(Array.isArray(firstApi.connector.headers)).toBe(true);
      expect(Array.isArray(firstApi.connector.parameters)).toBe(true);
      expect(Array.isArray(firstApi.connector.calls)).toBe(true);
    }
  });

  it('should handle missing connector gracefully', async () => {
    const response: ApiResponse = await apiApi.getApis();

    // Find an API with missing connector (if any)
    const apiWithMissingConnector = response.apis.find(api =>
      api.connector.id === '' || !api.connector.id,
    );

    if (apiWithMissingConnector) {
      expect(apiWithMissingConnector.connector.headers).toEqual([]);
      expect(apiWithMissingConnector.connector.parameters).toEqual([]);
      expect(apiWithMissingConnector.connector.calls).toEqual([]);
    }
  });
});
