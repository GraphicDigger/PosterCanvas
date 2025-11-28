// shared/lib/api/adapters/SQLAdapter.ts
import { BaseAdapter } from './BaseAdapter';
import { registerAdapter } from '../registry/AdapterRegistry';
import type { SQLDataSource } from '../types';

/**
 * ✅ SQL адаптер для системных данных через UI
 * Универсальный адаптер для PostgreSQL и MySQL
 * Используется как для системных, так и для клиентских данных
 */
@registerAdapter('sql')
export class SQLAdapter<T extends { id: string }> extends BaseAdapter<T, SQLDataSource> {

  private tableName: string;

  constructor(dataSource: SQLDataSource, private entityName: string) {
    super(dataSource);
    this.tableName = this.generateTableName();
  }

  async getAll(): Promise<T[]> {
    await this.simulateDelay(200);
    this.checkShouldError();

    const query = `SELECT * FROM ${this.tableName} ORDER BY created_at DESC`;
    return this.executeSQL<T[]>(query);
  }

  async getById(id: string): Promise<T | null> {
    await this.simulateDelay(150);
    this.checkShouldError();

    const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
    const results = await this.executeSQL<T[]>(query, [id]);
    return results.length > 0 ? results[0] : null;
  }

  async create(entity: Partial<T>): Promise<T> {
    await this.simulateDelay(300);
    this.checkShouldError();

    const id = this.generateId();
    const now = new Date().toISOString();

    const newEntity: T = {
      ...entity,
      id,
      created_at: now,
      updated_at: now,
      ...(this.dataSource.config.uiCreated && { created_via_ui: true }),
    } as unknown as T;

    const columns = Object.keys(newEntity);
    const placeholders = columns.map((_, index) => `$${index + 1}`);
    const values = Object.values(newEntity);

    const query = `
            INSERT INTO ${this.tableName} (${columns.join(', ')}) 
            VALUES (${placeholders.join(', ')}) 
            RETURNING *
        `;

    const results = await this.executeSQL<T[]>(query, values);
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
    const values = [...Object.values(updatedEntity), id];

    const query = `
            UPDATE ${this.tableName} 
            SET ${setClause.join(', ')} 
            WHERE id = $${values.length} 
            RETURNING *
        `;

    const results = await this.executeSQL<T[]>(query, values);
    if (results.length === 0) {
      throw new Error(`Entity with id ${id} not found`);
    }
    return results[0];
  }

  async delete(id: string): Promise<void> {
    await this.simulateDelay(200);
    this.checkShouldError();

    const query = `DELETE FROM ${this.tableName} WHERE id = $1`;
    await this.executeSQL(query, [id]);
  }

  /**
     * ✅ Выполнение SQL запроса в зависимости от backend
     */
  private async executeSQL<R = any>(query: string, params: any[] = []): Promise<R> {
    const { backend } = this.dataSource.config;

    try {
      switch (backend) {
      case 'postgresql':
        return await this.executePostgreSQL<R>(query, params);

      case 'mysql':
        return await this.executeMySQL<R>(query, params);

      default:
        throw new Error(`Unsupported SQL backend: ${backend}`);
      }
    } catch (error) {
      this.handleError(error, `executeSQL(${backend})`);
    }
  }

  /**
     * ✅ PostgreSQL выполнение запроса
     */
  private async executePostgreSQL<R>(query: string, params: any[] = []): Promise<R> {
    // В реальной реализации здесь будет подключение к PostgreSQL
    // Например, с использованием pg или другой библиотеки

    if (process.env.NODE_ENV === 'development') {
      console.log('🐘 PostgreSQL Query:', { query, params, table: this.tableName });

      // Имитация PostgreSQL запроса
      await this.simulateDelay(100);
      return this.mockSQLResponse<R>(query, params);
    }

    const { connection, ssl, timeout } = this.dataSource.config;

    // Избегаем предупреждения о неиспользуемых переменных в режиме разработки
    console.log('Connection info:', { connection, ssl, timeout });

    // Реальное подключение к PostgreSQL
    // const { Client } = require('pg');
    // const client = new Client({
    //     host: connection.host,
    //     port: connection.port,
    //     database: connection.database,
    //     user: connection.username,
    //     password: connection.password,
    //     ssl: ssl,
    //     statement_timeout: timeout || 30000
    // });
    //
    // try {
    //     await client.connect();
    //     const result = await client.query(query, params);
    //     return result.rows as R;
    // } finally {
    //     await client.end();
    // }

    throw new Error('PostgreSQL connection not implemented yet');
  }

  /**
     * ✅ MySQL выполнение запроса
     */
  private async executeMySQL<R>(query: string, params: any[] = []): Promise<R> {
    // В реальной реализации здесь будет подключение к MySQL

    if (process.env.NODE_ENV === 'development') {
      console.log('🐬 MySQL Query:', { query, params, table: this.tableName });

      // Имитация MySQL запроса
      await this.simulateDelay(100);
      return this.mockSQLResponse<R>(query, params);
    }

    const { connection, timeout } = this.dataSource.config;

    // Избегаем предупреждения о неиспользуемых переменных в режиме разработки
    console.log('MySQL connection info:', { connection, timeout });

    // Реальное подключение к MySQL
    // const mysql = require('mysql2/promise');
    // const connection = await mysql.createConnection({
    //     host: connection.host,
    //     port: connection.port,
    //     database: connection.database,
    //     user: connection.username,
    //     password: connection.password,
    //     acquireTimeout: timeout || 30000
    // });
    //
    // try {
    //     const [rows] = await connection.execute(query, params);
    //     return rows as R;
    // } finally {
    //     await connection.end();
    // }

    throw new Error('MySQL connection not implemented yet');
  }

  /**
     * ✅ Мок-ответ для разработки
     */
  private mockSQLResponse<R>(query: string, params: any[]): R {
    const queryLower = query.toLowerCase().trim();

    if (queryLower.startsWith('select')) {
      // Имитация SELECT запроса
      return [] as R;
    } else if (queryLower.startsWith('insert')) {
      // Имитация INSERT запроса
      const mockEntity = {
        id: this.generateId(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return [mockEntity] as R;
    } else if (queryLower.startsWith('update')) {
      // Имитация UPDATE запроса
      const mockEntity = {
        id: params[params.length - 1], // последний параметр - это ID
        updated_at: new Date().toISOString(),
      };
      return [mockEntity] as R;
    } else if (queryLower.startsWith('delete')) {
      // Имитация DELETE запроса
      return undefined as R;
    }

    return [] as R;
  }

  /**
     * ✅ Генерация имени таблицы
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
     * ✅ Получение информации о подключении
     */
  getConnectionInfo(): string {
    const { backend, connection } = this.dataSource.config;
    return `${backend}://${connection.username}@${connection.host}:${connection.port}/${connection.database}`;
  }
}
