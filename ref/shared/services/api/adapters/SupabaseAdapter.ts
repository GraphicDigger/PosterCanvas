// shared/lib/api/adapters/SupabaseAdapter.ts
import { BaseAdapter } from './BaseAdapter';
import { registerAdapter } from '../registry/AdapterRegistry';
import type { SupabaseDataSource } from '../types';

// Supabase adapter with automatic registration and simplified error handling
// Supabase адаптер с автоматической регистрацией и упрощенной обработкой ошибок

@registerAdapter('supabase')
export class SupabaseAdapter<T extends { id: string }> extends BaseAdapter<T, SupabaseDataSource> {

  constructor(dataSource: SupabaseDataSource, private _tableName: string) {
    super(dataSource);
  }

  async getAll(): Promise<T[]> {
    // withLogging декоратор автоматически добавит try/catch и логирование
    await this.simulateDelay(200); // Имитация сетевой задержки
    this.checkShouldError();

    // Здесь будет реальная реализация с Supabase клиентом
    // const { data, error } = await this.supabaseClient
    //     .from(this._tableName)
    //     .select('*')

    throw new Error('Supabase adapter not implemented yet');
  }

  async getById(_id: string): Promise<T | null> {
    await this.simulateDelay(150);
    this.checkShouldError();

    // const { data, error } = await this.supabaseClient
    //     .from(this._tableName)
    //     .select('*')
    //     .eq('id', _id)
    //     .single()

    throw new Error('Supabase adapter not implemented yet');
  }

  async create(_entity: Partial<T>): Promise<T> {
    await this.simulateDelay(300);
    this.checkShouldError();

    // const { data, error } = await this.supabaseClient
    //     .from(this._tableName)
    //     .insert(_entity)
    //     .select()
    //     .single()

    throw new Error('Supabase adapter not implemented yet');
  }

  async update(_id: string, _updates: Partial<T>): Promise<T> {
    await this.simulateDelay(250);
    this.checkShouldError();

    // const { data, error } = await this.supabaseClient
    //     .from(this._tableName)
    //     .update(_updates)
    //     .eq('id', _id)
    //     .select()
    //     .single()

    throw new Error('Supabase adapter not implemented yet');
  }

  async delete(_id: string): Promise<void> {
    await this.simulateDelay(200);
    this.checkShouldError();

    // const { error } = await this.supabaseClient
    //     .from(this._tableName)
    //     .delete()
    //     .eq('id', _id)

    throw new Error('Supabase adapter not implemented yet');
  }

  // Private method for initializing the Supabase client
  // Приватный метод для инициализации Supabase клиента

  private get _supabaseClient() {
    // const { url, key } = this.dataSource.config;
    // return createClient(url, key);
    throw new Error('Supabase client initialization not implemented');
  }
}
