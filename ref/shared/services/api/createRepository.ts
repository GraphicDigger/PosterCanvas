// shared/lib/api/createRepository.ts
import { BaseRepository } from './baseRepository';
import { validateDataSourceConfig } from './adapters/helpers/dataSourceResolver';
import type { DataSource } from './types';

// repository factory with validation of the data source

// RepositoryClass - Класс репозитория
// entityName - Имя сущности
// dataSource - Источник данных (обязательный параметр)

export function createRepository<T extends { id: string }>(
  RepositoryClass: new (dataSource: DataSource, entityName: string) => BaseRepository<T>,
  entityName: string,
  dataSource: DataSource,
): BaseRepository<T> {
  try {
    // console.log(`Creating repository for ${entityName} with data source:`, dataSource.type);

    // Validate the received data source
    const validation = validateDataSourceConfig(dataSource);
    if (!validation.isValid) {
      console.warn(`Invalid data source config for ${entityName}:`, validation.errors);
    }

    return new RepositoryClass(dataSource, entityName);

  } catch (error) {
    console.error(' Failed to create repository:', error);

    const fallbackDataSource: DataSource = {
      type: 'mock',
      config: {},
    };

    return new RepositoryClass(fallbackDataSource, entityName);
  }
}
