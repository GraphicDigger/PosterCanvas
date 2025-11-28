// shared/lib/api/adapters/BaseAdapter.ts
import type { DataSource } from '../types';
import { wrapAdapterMethods } from './helpers/withLogging';

export interface IAdapter<T> {
    getAll(): Promise<T[]>;
    getById(id: string): Promise<T | null>;
    create(entity: Partial<T>): Promise<T>;
    update(id: string, updates: Partial<T>): Promise<T>;
    delete(id: string): Promise<void>;
}

// Base adapter with common logic for all data sources. Provides a uniform interface and automatic utilities
// Базовый адаптер с общей логикой для всех источников данных. Предоставляет единообразный интерфейс и автоматические утилиты

export abstract class BaseAdapter<T, TDataSource extends DataSource = DataSource>
implements IAdapter<T> {

  constructor(protected dataSource: TDataSource) {
    this.setupLogging();
  }

  // Setup automatic logging for all CRUD methods
  // Настройка автоматического логирования для всех CRUD методов

  private setupLogging(): void {
    // Используем setTimeout чтобы методы были определены к моменту вызова
    setTimeout(() => {
      wrapAdapterMethods(this, this.constructor.name);
    }, 0);
  }


  // Abstract CRUD methods - must be implemented in subclasses
  // Абстрактные методы CRUD - должны быть реализованы в наследниках

    abstract getAll(): Promise<T[]>;
    abstract getById(id: string): Promise<T | null>;
    abstract create(entity: Partial<T>): Promise<T>;
    abstract update(id: string, updates: Partial<T>): Promise<T>;
    abstract delete(id: string): Promise<void>;

    // Simulation delay for network requests
    // Симуляция задержки для имитации сетевых запросов

    protected async simulateDelay(customDelay?: number): Promise<void> {
      const delay = customDelay ?? (this.dataSource.config as any)?.delay ?? 100;
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    // Force error for testing
    // Проверка принудительных ошибок для тестирования

    protected checkShouldError(): void {
      const shouldError = (this.dataSource.config as any)?.shouldError ?? false;
      if (shouldError) {
        throw new Error(`${this.constructor.name} configured to throw error`);
      }
    }

    // Error handling (used automatically in withLogging decorator)
    // Обработка ошибок (используется автоматически в withLogging декораторе)

    protected handleError(error: unknown, operation: string): never {
      console.error(`[${this.constructor.name}] Error in ${operation}:`, error);
      throw error;
    }

    // Logging operations (used automatically in withLogging decorator)
    // Логирование операций (используется автоматически в withLogging декораторе)

    protected log(operation: string, data?: any): void {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[${this.constructor.name}] ${operation}`, data);
      }
    }

    // Generate unique ID for new entities
    // Генерация уникальных ID для новых сущностей

    protected generateId(): string {
      return `${this.constructor.name.toLowerCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
}
