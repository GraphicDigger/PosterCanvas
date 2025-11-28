// shared/lib/api/BaseRepository.ts
import type { DataSource } from './types';
import { IAdapter, adapterRegistry } from './adapters';
// Автоматическая регистрация адаптеров при импорте
import './registry/AdapterRegister';

// Base repository with a typed adapter
// Базовый репозиторий с типизированным адаптером

export abstract class BaseRepository<T extends { id: string }> {
  protected adapter: IAdapter<T>;

  constructor(protected dataSource: DataSource, protected entityName: string) {
    this.adapter = this.createAdapter();
  }

  // Delegate all CRUD operations to the adapter
  // Делегируем все CRUD операции адаптеру
  async getAll(): Promise<T[]> {
    return this.adapter.getAll();
  }

  async getById(id: string): Promise<T | null> {
    return this.adapter.getById(id);
  }

  async create(entity: Partial<T>): Promise<T> {
    return this.adapter.create(entity);
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    return this.adapter.update(id, updates);
  }

  async delete(id: string): Promise<void> {
    return this.adapter.delete(id);
  }

  // Factory for adapters through the registry - supports the Open/Closed principle. New adapters can be added without changing this code
  // Фабрика адаптеров через реестр - поддерживает принцип Open/Closed. Новые адаптеры можно добавлять без изменения этого кода

  private createAdapter(): IAdapter<T> {
    try {
      return adapterRegistry.createAdapter<T>(this.dataSource, this.entityName);
    } catch (error) {
      // Дополнительная информация для отладки
      const availableTypes = adapterRegistry.getRegisteredTypes();
      const adapterCount = adapterRegistry.getAdapterCount();

      console.error('❌ Failed to create adapter:', {
        requestedType: this.dataSource.type,
        entityName: this.entityName,
        availableTypes,
        adapterCount,
        error: error instanceof Error ? error.message : error,
      });

      throw error;
    }
  }

  // Helpers remain in the base class
  // Хелперы остаются в базовом классе
  protected handleError(error: unknown, operation: string): never {
    console.error(`[${this.constructor.name}] Error in ${operation}:`, error);
    throw error;
  }

  protected log(operation: string, data?: any): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${this.constructor.name}] ${operation}`, data);
    }
  }
}

// Re-export types
export type { DataSource, DataSourceType } from './types';
