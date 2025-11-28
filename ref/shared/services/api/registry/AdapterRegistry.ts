// shared/lib/api/adapters/AdapterRegistry.ts
import type { DataSource, DataSourceType } from '../types';
import type { IAdapter } from '../adapters/BaseAdapter';

export type AdapterConstructor<T = any> = new (
    dataSource: any, // Позволяет принимать специфичные типы DataSource
    entityName: string
) => IAdapter<T>;

//Позволяет регистрировать новые адаптеры без изменения BaseRepository

class AdapterRegistry {
  private adapters = new Map<DataSourceType, AdapterConstructor>();

  // Регистрирует адаптер для определенного типа источника данных

  register<T>(type: DataSourceType, AdapterClass: AdapterConstructor<T>): void {
    if (this.adapters.has(type)) {
      console.warn(`⚠️ Adapter for type '${type}' is already registered. Overriding...`);
    }

    this.adapters.set(type, AdapterClass);

    if (process.env.NODE_ENV === 'development') {
      // console.log(`📝 Registered adapter: ${type} -> ${AdapterClass.name}`);
    }
  }

  // Создает экземпляр адаптера для указанного типа источника данных

  createAdapter<T>(dataSource: DataSource, entityName: string): IAdapter<T> {
    const AdapterClass = this.adapters.get(dataSource.type);

    if (!AdapterClass) {
      throw new Error(
        `Unsupported data source type: ${dataSource.type}. ` +
                `Available types: [${Array.from(this.adapters.keys()).join(', ')}]`,
      );
    }

    try {
      return new AdapterClass(dataSource, entityName) as IAdapter<T>;
    } catch (error) {
      throw new Error(
        `Failed to create adapter for type '${dataSource.type}': ${error instanceof Error ? error.message : error}`,
      );
    }
  }

  // Проверяет, зарегистрирован ли адаптер для указанного типа

  isRegistered(type: DataSourceType): boolean {
    return this.adapters.has(type);
  }

  // Получает все зарегистрированные типы адаптеров

  getRegisteredTypes(): DataSourceType[] {
    return Array.from(this.adapters.keys());
  }

  // Получает количество зарегистрированных адаптеров

  getAdapterCount(): number {
    return this.adapters.size;
  }

  // Отменяет регистрацию адаптера

  unregister(type: DataSourceType): boolean {
    const wasDeleted = this.adapters.delete(type);

    if (wasDeleted && process.env.NODE_ENV === 'development') {
      console.log(`🗑️ Unregistered adapter: ${type}`);
    }

    return wasDeleted;
  }

  // Очищает все зарегистрированные адаптеры

  clear(): void {
    this.adapters.clear();

    if (process.env.NODE_ENV === 'development') {
      console.log('🧹 Cleared all registered adapters');
    }
  }

  // Получает информацию о всех зарегистрированных адаптерах

  getAdapterInfo(): Array<{ type: DataSourceType; className: string }> {
    return Array.from(this.adapters.entries()).map(([type, AdapterClass]) => ({
      type,
      className: AdapterClass.name,
    }));
  }
}

// Глобальный экземпляр реестра адаптеров

export const adapterRegistry = new AdapterRegistry();

// Хелпер для массовой регистрации адаптеров

export function registerAdapters(
  adapters: Array<{ type: DataSourceType; adapter: AdapterConstructor }>,
): void {
  adapters.forEach(({ type, adapter }) => {
    adapterRegistry.register(type, adapter);
  });
}

// Декоратор для автоматической регистрации адаптера

export function registerAdapter(type: DataSourceType) {
  return function<T extends AdapterConstructor>(AdapterClass: T): T {
    // Преобразуем в общий тип для реестра
    adapterRegistry.register(type, AdapterClass as AdapterConstructor);
    return AdapterClass;
  };
}
