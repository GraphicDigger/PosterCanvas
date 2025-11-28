// shared/lib/api/dataSourceResolver.ts
import type { DataSource } from '../../types';


export function validateDataSourceConfig(dataSource: DataSource): {
    isValid: boolean;
    errors: string[]
} {
  const errors: string[] = [];

  if (!dataSource.type) {
    errors.push('Data source type is required');
  }

  if (!dataSource.config) {
    errors.push('Data source config is required');
  }

  // Специфичная валидация по типам
  switch (dataSource.type) {
  case 'rest':
    if (!dataSource.config.baseUrl) {
      errors.push('REST data source requires baseUrl');
    }
    break;

  case 'supabase':
    if (!dataSource.config.url) {errors.push('Supabase requires url');}
    if (!dataSource.config.key) {errors.push('Supabase requires key');}
    break;

  case 'graphql':
    if (!dataSource.config.endpoint) {errors.push('GraphQL requires endpoint');}
    break;
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}


// /**
//  * 🎯 Разрешение источника данных с приоритетами:
//  * 1. Настройки текущего проекта
//  * 2. Настройки пользователя по умолчанию
//  * 3. Fallback на mock данные
//  */

// /**
//  * Получает источник данных для проекта (пока заглушка)
//  */
// function getProjectDataSource(entityName: string): DataSource | null {
//     // TODO: Реализовать получение настроек проекта
//     // const projectDataSource = useProjectStore.getState().getProjectDataSource();
//     // if (projectDataSource) {
//     //     return mapUserDataSourceToInternal(projectDataSource);
//     // }
//     return null;
// }

// // Gets user default data source (placeholder)
// // Получает пользовательские настройки по умолчанию (пока заглушка)

// function getUserDefaultDataSource(entityName: string): DataSource | null {
//     // TODO: Реализовать получение пользовательских настроек
//     // const user = useUserStore.getState().currentUser;
//     // if (user?.preferences.defaultDataSource) {
//     //     return mapUserDataSourceToInternal(user.preferences.defaultDataSource);
//     // }
//     return null;
// }

// // Mapping user types to system types DataSource
// // Маппинг пользовательских типов в системные типы DataSource

// function mapUserDataSourceToInternal(userDataSource: any): DataSource {
//     const typeMapping: Record<string, DataSource['type']> = {
//         'local': 'mock',
//         'firebase': 'firebase',
//         'supabase': 'supabase',
//         'customApi': 'rest',
//         'graphql': 'graphql'
//     };

//     return {
//         type: typeMapping[userDataSource.type] || 'mock',
//         config: userDataSource.config || {}
//     };
// }

// // Main function for resolving the data source
// // Основная функция разрешения источника данных

// export function resolveDataSource(entityName: string): DataSource {
//     // 1. Пытаемся получить настройки проекта
//     const projectSource = getProjectDataSource(entityName);
//     if (projectSource) {
//         console.log(`📁 Using project data source for ${entityName}:`, projectSource.type);
//         return projectSource;
//     }

//     // 2. Пытаемся получить пользовательские настройки по умолчанию
//     const userDefaultSource = getUserDefaultDataSource(entityName);
//     if (userDefaultSource) {
//         console.log(`👤 Using user default data source for ${entityName}:`, userDefaultSource.type);
//         return userDefaultSource;
//     }

//     // 3. Fallback на mock данные
//     const fallbackSource: DataSource = {
//         type: 'mock',
//         config: {}
//     };

//     console.log(`🔄 Using fallback data source for ${entityName}:`, fallbackSource.type);
//     return fallbackSource;
// }

// // Function for forced selection of a data source (for testing)
// // Функция для принудительного выбора источника данных (для тестирования)

// export function createTestDataSource(
//     type: DataSource['type'],
//     config: Record<string, any> = {}
// ): DataSource {
//     return { type, config };
// }

// // Checking the availability of a data source
// // Проверка доступности источника данных

// export function isDataSourceAvailable(dataSource: DataSource): boolean {
//     switch (dataSource.type) {
//         case 'mock':
//             return true; // Mock всегда доступен

//         case 'rest':
//             return !!(dataSource.config.baseUrl);

//         case 'supabase':
//             return !!(dataSource.config.url && dataSource.config.key);

//         case 'firebase':
//             return !!(dataSource.config.projectId && dataSource.config.apiKey);

//         case 'graphql':
//             return !!(dataSource.config.endpoint);

//         default:
//             return false;
//     }
// }

// // Validation of the data source configuration
// // Валидация конфигурации источника данных
