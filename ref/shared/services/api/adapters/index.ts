// Экспорт базового адаптера
export { BaseAdapter, type IAdapter } from './BaseAdapter';

// Экспорт реестра и утилит
export { adapterRegistry, registerAdapter, type AdapterConstructor } from '../registry/AdapterRegistry';
export { registerDefaultAdapters } from '../registry/AdapterRegister';

// Временно отключаем адаптеры для Storybook
// TODO: Включить когда адаптеры будут готовы к использованию
/*
export { RestAdapter } from './RestAdapter';
export { MockAdapter } from './MockAdapter';
export { SupabaseAdapter } from './SupabaseAdapter';
export { GraphQLAdapter } from './GraphQLAdapter';
export { SQLAdapter } from './SQLAdapter';
export { PostgreSQLAdapter } from './PostgreSQLAdapter';
export { MongoDBAdapter } from './MongoDBAdapter';
*/
