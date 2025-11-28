// shared/lib/api/registry/AdapterRegister.ts
import { adapterRegistry } from './AdapterRegistry';

// Временно отключаем импорты адаптеров для Storybook
// TODO: Включить когда адаптеры будут готовы к использованию
/*
import '../adapters/MockAdapter';
import '../adapters/RestAdapter';
import '../adapters/SupabaseAdapter';
import '../adapters/GraphQLAdapter';
import '../adapters/SQLAdapter';
import '../adapters/PostgreSQLAdapter';
import '../adapters/MongoDBAdapter';
*/

// Проверяем что все адаптеры зарегистрированы, Адаптеры регистрируются автоматически через декораторы @registerAdapter

export function registerDefaultAdapters(): void {
  if (process.env.NODE_ENV === 'development') {
    // console.log('🎯 Auto-registered adapters via decorators:', {
    //     adapters: adapterRegistry.getAdapterInfo(),
    //     count: adapterRegistry.getAdapterCount()
    // });

    // Проверяем что основные адаптеры зарегистрированы
    const expectedAdapters = [
      'mock',
      'rest',
      'supabase',
      'graphql',
      'sql',
      'postgresql',
      'mongodb',
    ];
    const missing = expectedAdapters.filter(type => !adapterRegistry.isRegistered(type as any));

    if (missing.length > 0) {
      console.debug('🔧 Some expected adapters are not registered (expected in development):', missing);
    } else {
      console.debug('✅ All expected adapters are registered');
    }
  }
}

// Автоматическая проверка регистрации при импорте модуля
registerDefaultAdapters();
