// shared/lib/api/adapters/RestAdapter.ts
import { BaseAdapter } from './BaseAdapter';
import { registerAdapter } from '../registry/AdapterRegistry';
import type { RestDataSource } from '../types';

// REST API adapter with automatic registration
// REST API адаптер с автоматической регистрацией

@registerAdapter('rest')
export class RestAdapter<T> extends BaseAdapter<T, RestDataSource> {

  constructor(dataSource: RestDataSource, private entityName: string) {
    super(dataSource);
  }

  async getAll(): Promise<T[]> {
    return this.fetchFromRest(`/${this.entityName}`);
  }

  async getById(id: string): Promise<T | null> {
    return this.fetchFromRest(`/${this.entityName}/${id}`);
  }

  async create(entity: Partial<T>): Promise<T> {
    return this.fetchFromRest(`/${this.entityName}`, {
      method: 'POST',
      body: JSON.stringify(entity),
    });
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    return this.fetchFromRest(`/${this.entityName}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async delete(id: string): Promise<void> {
    await this.fetchFromRest(`/${this.entityName}/${id}`, { method: 'DELETE' });
  }

  private async fetchFromRest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const { baseUrl, timeout = 5000, headers = {}, apiKey } = this.dataSource.config;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (apiKey) {
      requestHeaders['Authorization'] = `Bearer ${apiKey}`;
    }

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers: requestHeaders,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
