// shared/lib/api/adapters/MockAdapter.ts
import { BaseAdapter } from './BaseAdapter';
import { registerAdapter } from '../registry/AdapterRegistry';
import { mockDataRegistry } from '../registry/mockDataRegistry';
import type { MockDataSource } from '../types';

/**
 * ✅ Mock адаптер для разработки и тестирования
 * Загружает данные из mockDataRegistry без персистентного хранения
 * Простой in-memory адаптер для быстрой разработки
 */
@registerAdapter('mock')
export class MockAdapter<T extends { id: string }>
  extends BaseAdapter<T, MockDataSource> {

  private storage: Map<string, T> = new Map();

  constructor(
    dataSource: MockDataSource,
        private entityName: string,
  ) {
    super(dataSource);
    this.initializeStorage();
  }

  async getAll(): Promise<T[]> {
    await this.simulateDelay();
    this.checkShouldError();

    return Array.from(this.storage.values());
  }

  async getById(id: string): Promise<T | null> {
    await this.simulateDelay();
    this.checkShouldError();

    return this.storage.get(id) || null;
  }

  async create(entity: Partial<T>): Promise<T> {
    await this.simulateDelay();
    this.checkShouldError();

    const newEntity: T = {
      ...entity,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as unknown as T;

    this.storage.set(newEntity.id, newEntity);

    return newEntity;
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    await this.simulateDelay();
    this.checkShouldError();

    const existing = this.storage.get(id);
    if (!existing) {
      throw new Error(`Entity with id ${id} not found`);
    }

    const updated: T = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    } as T;

    this.storage.set(id, updated);

    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.simulateDelay();
    this.checkShouldError();

    if (!this.storage.has(id)) {
      throw new Error(`Entity with id ${id} not found`);
    }

    this.storage.delete(id);
  }

  // Инициализация хранилища из реестра mock данных
  private initializeStorage(): void {
    this.loadFromRegistry();
  }

  // Загрузка данных из mockDataRegistry
  private loadFromRegistry(): void {
    const mockData = mockDataRegistry.getData<T>(this.entityName);

    if (!mockData || mockData.length === 0) {return;}

    // Очищаем текущее хранилище
    this.storage.clear();

    // Загружаем данные из реестра
    mockData.forEach(item => this.storage.set(item.id, item));

    this.log(`📊 Loaded ${mockData.length} mock items for ${this.entityName} from registry`);

    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 MockAdapter[${this.entityName}] initialized:`, {
        entityName: this.entityName,
        itemsLoaded: mockData.length,
        items: mockData.map(item => ({ id: item.id, ...('name' in item ? { name: item.name } : {}) })),
      });
    }
  }
}
