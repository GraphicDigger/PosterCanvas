// shared/lib/api/adapters/PostgreSQLAdapter.ts
import { BaseAdapter } from './BaseAdapter';
import { registerAdapter } from '../registry/AdapterRegistry';
import type { PostgreSQLDataSource } from '../types';

/**
 * ✅ Специализированный PostgreSQL адаптер для системных данных
 * Оптимизирован для работы с PostgreSQL-специфичными функциями
 * Поддерживает расширенные типы данных, JSON, массивы, UUID
 */
@registerAdapter('postgresql')
export class PostgreSQLAdapter<T extends { id: string }> extends BaseAdapter<T, PostgreSQLDataSource> {

  private tableName: string;
  private schema: string;

  constructor(dataSource: PostgreSQLDataSource, private entityName: string) {
    super(dataSource);
    this.schema = dataSource.config.schema || 'public';
    this.tableName = this.generateTableName();
  }

  async getAll(): Promise<T[]> {
    await this.simulateDelay(200);
    this.checkShouldError();

    const query = `
            SELECT * FROM ${this.schema}.${this.tableName} 
            ORDER BY created_at DESC
        `;

    return this.executeQuery<T[]>(query);
  }

  async getById(id: string): Promise<T | null> {
    await this.simulateDelay(150);
    this.checkShouldError();

    const query = `
            SELECT * FROM ${this.schema}.${this.tableName} 
            WHERE id = $1
        `;

    const results = await this.executeQuery<T[]>(query, [id]);
    return results.length > 0 ? results[0] : null;
  }

  async create(entity: Partial<T>): Promise<T> {
    await this.simulateDelay(300);
    this.checkShouldError();

    const id = this.generatePostgreSQLId();
    const now = new Date().toISOString();

    const newEntity: T = {
      ...entity,
      id,
      created_at: now,
      updated_at: now,
      ...(this.dataSource.config.uiCreated && {
        created_via_ui: true,
        ui_version: '1.0.0',
      }),
    } as unknown as T;

    const columns = Object.keys(newEntity);
    const placeholders = columns.map((_, index) => `$${index + 1}`);
    const values = Object.values(newEntity);

    const query = `
            INSERT INTO ${this.schema}.${this.tableName} (${columns.join(', ')}) 
            VALUES (${placeholders.join(', ')}) 
            RETURNING *
        `;

    const results = await this.executeQuery<T[]>(query, values);
    return results[0];
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    await this.simulateDelay(250);
    this.checkShouldError();

    const updatedEntity = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const columns = Object.keys(updatedEntity);
    const setClause = columns.map((col, index) => `${col} = $${index + 1}`);

    // Добавляем PostgreSQL-специфичную инкрементацию версии
    setClause.push('version = COALESCE(version, 0) + 1');

    const values = Object.values(updatedEntity);
    values.push(id);

    const query = `
            UPDATE ${this.schema}.${this.tableName} 
            SET ${setClause.join(', ')} 
            WHERE id = $${values.length} 
            RETURNING *
        `;

    const results = await this.executeQuery<T[]>(query, values);
    if (results.length === 0) {
      throw new Error(`Entity with id ${id} not found`);
    }
    return results[0];
  }

  async delete(id: string): Promise<void> {
    await this.simulateDelay(200);
    this.checkShouldError();

    const query = `
            DELETE FROM ${this.schema}.${this.tableName} 
            WHERE id = $1
        `;

    await this.executeQuery(query, [id]);
  }

  /**
     * ✅ PostgreSQL-специфичные методы
     */

  // Поиск с JSON запросами
  async findByJsonField(jsonField: string, path: string, value: any): Promise<T[]> {
    await this.simulateDelay(250);
    this.checkShouldError();

    const query = `
            SELECT * FROM ${this.schema}.${this.tableName} 
            WHERE ${jsonField}->>'${path}' = $1
            ORDER BY created_at DESC
        `;

    return this.executeQuery<T[]>(query, [value]);
  }

  // Полнотекстовый поиск
  async fullTextSearch(searchTerm: string, columns: string[] = ['name', 'description']): Promise<T[]> {
    await this.simulateDelay(300);
    this.checkShouldError();

    const searchQuery = columns.map(col => `${col}`).join(' || \' \' || ');

    const query = `
            SELECT *, ts_rank(to_tsvector('russian', ${searchQuery}), plainto_tsquery('russian', $1)) as rank
            FROM ${this.schema}.${this.tableName} 
            WHERE to_tsvector('russian', ${searchQuery}) @@ plainto_tsquery('russian', $1)
            ORDER BY rank DESC, created_at DESC
        `;

    return this.executeQuery<T[]>(query, [searchTerm]);
  }

  // Работа с массивами
  async findByArrayContains(arrayField: string, value: string): Promise<T[]> {
    await this.simulateDelay(200);
    this.checkShouldError();

    const query = `
            SELECT * FROM ${this.schema}.${this.tableName} 
            WHERE $1 = ANY(${arrayField})
            ORDER BY created_at DESC
        `;

    return this.executeQuery<T[]>(query, [value]);
  }

  // Пагинация с OFFSET/LIMIT
  async getPage(page: number = 1, pageSize: number = 20): Promise<{ data: T[]; total: number; hasMore: boolean }> {
    await this.simulateDelay(250);
    this.checkShouldError();

    const offset = (page - 1) * pageSize;

    // Подсчет общего количества
    const countQuery = `SELECT COUNT(*) as total FROM ${this.schema}.${this.tableName}`;
    const countResult = await this.executeQuery<{ total: number }[]>(countQuery);
    const total = parseInt(countResult[0].total.toString());

    // Получение данных
    const dataQuery = `
            SELECT * FROM ${this.schema}.${this.tableName} 
            ORDER BY created_at DESC 
            LIMIT $1 OFFSET $2
        `;

    const data = await this.executeQuery<T[]>(dataQuery, [pageSize, offset]);

    return {
      data,
      total,
      hasMore: offset + pageSize < total,
    };
  }

  /**
     * ✅ Выполнение PostgreSQL запроса
     */
  private async executeQuery<R = any>(query: string, params: any[] = []): Promise<R> {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('🐘 PostgreSQL Query:', {
          schema: this.schema,
          table: this.tableName,
          query: query.replace(/\s+/g, ' ').trim(),
          params,
        });

        // Имитация PostgreSQL запроса в режиме разработки
        await this.simulateDelay(50);
        return this.mockPostgreSQLResponse<R>(query, params);
      }

      const config = this.dataSource.config;
      console.log('PostgreSQL connection config:', {
        connection: config.connection,
        ssl: config.ssl,
        timeout: config.timeout,
        poolSize: config.poolSize,
        schema: config.schema,
        searchPath: config.searchPath,
        applicationName: config.applicationName,
      });

      // Реальное подключение к PostgreSQL
      // const { Pool } = require('pg');
      // const pool = new Pool({
      //     host: config.connection.host,
      //     port: config.connection.port,
      //     database: config.connection.database,
      //     user: config.connection.username,
      //     password: config.connection.password,
      //     ssl: config.ssl,
      //     max: config.poolSize || 10,
      //     idleTimeoutMillis: config.timeout || 30000,
      //     application_name: config.applicationName || 'UDE-Platform'
      // });
      //
      // if (config.searchPath) {
      //     await pool.query(`SET search_path TO ${config.searchPath.join(',')}`);
      // }
      //
      // const result = await pool.query(query, params);
      // return result.rows as R;

      throw new Error('PostgreSQL connection not implemented yet');

    } catch (error) {
      this.handleError(error, 'executeQuery(postgresql)');
    }
  }

  /**
     * ✅ Мок-ответ для PostgreSQL в режиме разработки
     */
  private mockPostgreSQLResponse<R>(query: string, params: any[]): R {
    const queryLower = query.toLowerCase().trim();

    if (queryLower.includes('select') && queryLower.includes('count(*)')) {
      // Имитация COUNT запроса
      return [{ total: 42 }] as R;
    } else if (queryLower.includes('ts_rank') || queryLower.includes('plainto_tsquery')) {
      // Имитация полнотекстового поиска
      const mockEntity = {
        id: this.generatePostgreSQLId(),
        name: `Search result for: ${params[0]}`,
        rank: 0.8,
        created_at: new Date().toISOString(),
      };
      return [mockEntity] as R;
    } else if (queryLower.startsWith('select')) {
      // Имитация SELECT запроса
      if (queryLower.includes('limit') && queryLower.includes('offset')) {
        // Пагинация
        const mockEntities = Array.from({ length: 20 }, (_, i) => ({
          id: this.generatePostgreSQLId(),
          name: `Entity ${i + 1}`,
          created_at: new Date().toISOString(),
        }));
        return mockEntities as R;
      }
      return [] as R;
    } else if (queryLower.startsWith('insert')) {
      // Имитация INSERT запроса
      const mockEntity = {
        id: this.generatePostgreSQLId(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        version: 1,
      };
      return [mockEntity] as R;
    } else if (queryLower.startsWith('update')) {
      // Имитация UPDATE запроса
      const mockEntity = {
        id: params[params.length - 1], // последний параметр - это ID
        updated_at: new Date().toISOString(),
        version: 2,
      };
      return [mockEntity] as R;
    } else if (queryLower.startsWith('delete')) {
      // Имитация DELETE запроса
      return undefined as R;
    }

    return [] as R;
  }

  /**
     * ✅ Генерация PostgreSQL UUID
     */
  private generatePostgreSQLId(): string {
    // В реальной реализации можно использовать gen_random_uuid() функцию PostgreSQL
    return `${this.generateId()}-pg`;
  }

  /**
     * ✅ Генерация имени таблицы с PostgreSQL соглашениями
     */
  private generateTableName(): string {
    const { uiCreated } = this.dataSource.config;

    // Префикс для системных/UI данных
    const prefix = uiCreated ? 'system_' : 'client_';

    // Нормализация имени entity (screens -> screen)
    const normalizedName = this.entityName.endsWith('s')
      ? this.entityName.slice(0, -1)
      : this.entityName;

    return `${prefix}${normalizedName}s`;
  }

  /**
     * ✅ Получение информации о PostgreSQL подключении
     */
  getConnectionInfo(): string {
    const { connection, schema } = this.dataSource.config;
    return `postgresql://${connection.username}@${connection.host}:${connection.port}/${connection.database}?schema=${schema || 'public'}`;
  }

  /**
     * ✅ Создание схемы и таблицы если не существует
     */
  async ensureSchemaAndTable(): Promise<void> {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🐘 Would create schema "${this.schema}" and table "${this.tableName}" if not exists`);
      return;
    }

    // В реальной реализации:
    // const createSchemaQuery = `CREATE SCHEMA IF NOT EXISTS ${this.schema}`;
    // const createTableQuery = `
    //     CREATE TABLE IF NOT EXISTS ${this.schema}.${this.tableName} (
    //         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    //         created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    //         updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    //         version INTEGER DEFAULT 1,
    //         data JSONB,
    //         tags TEXT[],
    //         metadata JSONB
    //     )
    // `;
    // await this.executeQuery(createSchemaQuery);
    // await this.executeQuery(createTableQuery);
  }
}
