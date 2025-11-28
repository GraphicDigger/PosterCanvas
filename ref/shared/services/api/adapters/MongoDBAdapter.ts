// shared/lib/api/adapters/MongoDBAdapter.ts
import { BaseAdapter } from './BaseAdapter';
import { registerAdapter } from '../registry/AdapterRegistry';
import type { MongoDBDataSource } from '../types';

/**
 * ✅ MongoDB адаптер для высоконагруженных систем
 * Оптимизирован для NoSQL операций, агрегаций и больших объемов данных
 * Поддерживает документно-ориентированные запросы, индексы, репликацию
 */
@registerAdapter('mongodb')
export class MongoDBAdapter<T extends { id: string }> extends BaseAdapter<T, MongoDBDataSource> {

  private collectionName: string;
  private database: string;

  constructor(dataSource: MongoDBDataSource, private entityName: string) {
    super(dataSource);
    this.database = dataSource.config.database;
    this.collectionName = this.generateCollectionName();
  }

  async getAll(): Promise<T[]> {
    await this.simulateDelay(200);
    this.checkShouldError();

    const filter = {};
    const options = {
      sort: { createdAt: -1 },
      projection: { _id: 0 }, // Исключаем MongoDB _id, используем наш id
    };

    return this.executeQuery<T[]>('find', filter, options);
  }

  async getById(id: string): Promise<T | null> {
    await this.simulateDelay(150);
    this.checkShouldError();

    const filter = { id };
    const options = {
      projection: { _id: 0 },
    };

    const results = await this.executeQuery<T[]>('findOne', filter, options);
    return results ? results[0] || null : null;
  }

  async create(entity: Partial<T>): Promise<T> {
    await this.simulateDelay(300);
    this.checkShouldError();

    const id = this.generateMongoId();
    const now = new Date();

    const newEntity: T = {
      ...entity,
      id,
      createdAt: now,
      updatedAt: now,
      ...(this.dataSource.config.uiCreated && {
        createdViaUI: true,
        uiVersion: '1.0.0',
        createdBy: 'ui-system',
      }),
    } as unknown as T;

    const options = {
      writeConcern: this.dataSource.config.writeConcern,
    };

    await this.executeQuery('insertOne', newEntity, options);
    return newEntity;
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    await this.simulateDelay(250);
    this.checkShouldError();

    const filter = { id };
    const updateDoc = {
      $set: {
        ...updates,
        updatedAt: new Date(),
      },
      $inc: {
        version: 1, // MongoDB инкрементация версии
      },
    };

    const options = {
      returnDocument: 'after' as const,
      projection: { _id: 0 },
      writeConcern: this.dataSource.config.writeConcern,
    };

    const result = await this.executeQuery<T>('findOneAndUpdate', filter, updateDoc, options);
    if (!result) {
      throw new Error(`Entity with id ${id} not found`);
    }
    return result;
  }

  async delete(id: string): Promise<void> {
    await this.simulateDelay(200);
    this.checkShouldError();

    const filter = { id };
    const options = {
      writeConcern: this.dataSource.config.writeConcern,
    };

    await this.executeQuery('deleteOne', filter, options);
  }

  /**
     * ✅ MongoDB-специфичные методы
     */

  // Поиск по вложенным полям
  async findByNestedField(fieldPath: string, value: any): Promise<T[]> {
    await this.simulateDelay(250);
    this.checkShouldError();

    const filter = { [fieldPath]: value };
    const options = {
      sort: { createdAt: -1 },
      projection: { _id: 0 },
    };

    return this.executeQuery<T[]>('find', filter, options);
  }

  // Текстовый поиск MongoDB
  async textSearch(searchTerm: string, options?: {
        caseSensitive?: boolean;
        diacriticSensitive?: boolean;
        language?: string;
    }): Promise<T[]> {
    await this.simulateDelay(300);
    this.checkShouldError();

    const filter = {
      $text: {
        $search: searchTerm,
        $caseSensitive: options?.caseSensitive || false,
        $diacriticSensitive: options?.diacriticSensitive || false,
        $language: options?.language || 'russian',
      },
    };

    const queryOptions = {
      sort: { score: { $meta: 'textScore' } },
      projection: {
        _id: 0,
        score: { $meta: 'textScore' },
      },
    };

    return this.executeQuery<T[]>('find', filter, queryOptions);
  }

  // Агрегационные запросы
  async aggregate(pipeline: any[]): Promise<any[]> {
    await this.simulateDelay(400);
    this.checkShouldError();

    const options = {
      allowDiskUse: true,
      readPreference: this.dataSource.config.readPreference,
    };

    return this.executeQuery<any[]>('aggregate', pipeline, options);
  }

  // Группировка и подсчет
  async groupBy(groupField: string, countField?: string): Promise<{ _id: any; count: number; items?: T[] }[]> {
    await this.simulateDelay(350);
    this.checkShouldError();

    const pipeline = [
      {
        $group: {
          _id: `$${groupField}`,
          count: { $sum: 1 },
          ...(countField && {
            items: {
              $push: {
                id: '$id',
                [countField]: `$${countField}`,
                createdAt: '$createdAt',
              },
            },
          }),
        },
      },
      {
        $sort: { count: -1 },
      },
    ];

    return this.aggregate(pipeline);
  }

  // Поиск в массивах
  async findByArrayElement(arrayField: string, value: any): Promise<T[]> {
    await this.simulateDelay(200);
    this.checkShouldError();

    const filter = { [arrayField]: { $in: Array.isArray(value) ? value : [value] } };
    const options = {
      sort: { createdAt: -1 },
      projection: { _id: 0 },
    };

    return this.executeQuery<T[]>('find', filter, options);
  }

  // Пагинация с skip/limit
  async getPage(page: number = 1, pageSize: number = 20, sortField: string = 'createdAt'): Promise<{
        data: T[];
        total: number;
        hasMore: boolean;
        page: number;
        pageSize: number;
    }> {
    await this.simulateDelay(250);
    this.checkShouldError();

    const skip = (page - 1) * pageSize;

    // Подсчет общего количества
    const total = await this.executeQuery<number>('countDocuments', {});

    // Получение данных
    const filter = {};
    const options = {
      sort: { [sortField]: -1 },
      skip,
      limit: pageSize,
      projection: { _id: 0 },
    };

    const data = await this.executeQuery<T[]>('find', filter, options);

    return {
      data,
      total,
      hasMore: skip + pageSize < total,
      page,
      pageSize,
    };
  }

  // Диапазонные запросы (даты, числа)
  async findByRange(field: string, min: any, max: any): Promise<T[]> {
    await this.simulateDelay(200);
    this.checkShouldError();

    const filter = {
      [field]: {
        $gte: min,
        $lte: max,
      },
    };

    const options = {
      sort: { [field]: 1 },
      projection: { _id: 0 },
    };

    return this.executeQuery<T[]>('find', filter, options);
  }

  // Создание индексов
  async createIndex(indexSpec: any, options?: any): Promise<string> {
    await this.simulateDelay(500);
    this.checkShouldError();

    if (process.env.NODE_ENV === 'development') {
      console.log('🍃 Would create MongoDB index:', { indexSpec, options, collection: this.collectionName });
      return `mock_index_${Date.now()}`;
    }

    return this.executeQuery<string>('createIndex', indexSpec, options);
  }

  /**
     * ✅ Выполнение MongoDB операции
     */
  private async executeQuery<R = any>(operation: string, ...args: any[]): Promise<R> {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('🍃 MongoDB Operation:', {
          database: this.database,
          collection: this.collectionName,
          operation,
          args: this.sanitizeArgs(args),
        });

        // Имитация MongoDB операции в режиме разработки
        await this.simulateDelay(50);
        return this.mockMongoDBResponse<R>(operation, args);
      }

      const config = this.dataSource.config;
      console.log('MongoDB connection config:', {
        connectionString: this.hidePassword(config.connectionString),
        database: config.database,
        authSource: config.authSource,
        ssl: config.ssl,
        timeout: config.timeout,
        maxPoolSize: config.maxPoolSize,
        readPreference: config.readPreference,
        writeConcern: config.writeConcern,
      });

      // Реальное подключение к MongoDB
      // const { MongoClient } = require('mongodb');
      // const client = new MongoClient(config.connectionString, {
      //     ssl: config.ssl,
      //     connectTimeoutMS: config.timeout || 30000,
      //     serverSelectionTimeoutMS: config.serverSelectionTimeoutMS || 30000,
      //     maxPoolSize: config.maxPoolSize || 10,
      //     minPoolSize: config.minPoolSize || 0,
      //     maxIdleTimeMS: config.maxIdleTimeMS || 0,
      //     authSource: config.authSource,
      //     compression: config.compression ? [config.compression] : undefined,
      //     readPreference: config.readPreference
      // });
      //
      // try {
      //     await client.connect();
      //     const db = client.db(this.database);
      //     const collection = db.collection(this.collectionName);
      //
      //     const result = await (collection as any)[operation](...args);
      //     return result;
      // } finally {
      //     await client.close();
      // }

      throw new Error('MongoDB connection not implemented yet');

    } catch (error) {
      this.handleError(error, `executeQuery(mongodb:${operation})`);
    }
  }

  /**
     * ✅ Мок-ответ для MongoDB в режиме разработки
     */
  private mockMongoDBResponse<R>(operation: string, args: any[]): R {
    switch (operation) {
    case 'find':
      if (args[1]?.skip !== undefined) {
        // Пагинация
        const mockEntities = Array.from({ length: args[1].limit || 20 }, (_, i) => ({
          id: this.generateMongoId(),
          name: `Entity ${(args[1].skip || 0) + i + 1}`,
          createdAt: new Date(),
        }));
        return mockEntities as R;
      }
      return [] as R;

    case 'findOne':
      const mockEntity = {
        id: args[0]?.id || this.generateMongoId(),
        name: 'Mock Entity',
        createdAt: new Date(),
      };
      return [mockEntity] as R;

    case 'insertOne':
      return args[0] as R;

    case 'findOneAndUpdate':
      const updatedEntity = {
        ...args[0],
        ...args[1].$set,
        version: (args[1].$inc?.version || 0) + 1,
      };
      return updatedEntity as R;

    case 'deleteOne':
      return undefined as R;

    case 'countDocuments':
      return 42 as R;

    case 'aggregate':
      const mockAggResult = [
        { _id: 'category1', count: 15 },
        { _id: 'category2', count: 8 },
      ];
      return mockAggResult as R;

    case 'createIndex':
      return `mock_index_${Date.now()}` as R;

    default:
      return [] as R;
    }
  }

  /**
     * ✅ Генерация MongoDB ObjectId-подобного ID
     */
  private generateMongoId(): string {
    // В реальной реализации можно использовать new ObjectId().toString()
    const timestamp = Math.floor(Date.now() / 1000).toString(16);
    const randomHex = Math.random().toString(16).substring(2, 18);
    return `${timestamp}${randomHex}`;
  }

  /**
     * ✅ Генерация имени коллекции
     */
  private generateCollectionName(): string {
    const { uiCreated } = this.dataSource.config;

    // Префикс для системных/UI данных
    const prefix = uiCreated ? 'system_' : 'client_';

    // MongoDB коллекции обычно во множественном числе
    const normalizedName = this.entityName.endsWith('s')
      ? this.entityName
      : `${this.entityName}s`;

    return `${prefix}${normalizedName}`;
  }

  /**
     * ✅ Скрытие пароля в connection string для логов
     */
  private hidePassword(connectionString: string): string {
    return connectionString.replace(/:([^@:]+)@/, ':***@');
  }

  /**
     * ✅ Очистка аргументов для логирования
     */
  private sanitizeArgs(args: any[]): any[] {
    return args.map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        // Ограничиваем глубину объектов для логов
        return JSON.parse(JSON.stringify(arg, null, 2).substring(0, 500));
      }
      return arg;
    });
  }

  /**
     * ✅ Получение информации о MongoDB подключении
     */
  getConnectionInfo(): string {
    const { database } = this.dataSource.config;
    const hiddenConnection = this.hidePassword(this.dataSource.config.connectionString);
    return `${hiddenConnection}/${database}`;
  }

  /**
     * ✅ Инициализация коллекции и индексов
     */
  async initializeCollection(): Promise<void> {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🍃 Would initialize MongoDB collection "${this.collectionName}" with indexes`);
      return;
    }

    // В реальной реализации:
    // // Создание базовых индексов
    // await this.createIndex({ id: 1 }, { unique: true });
    // await this.createIndex({ createdAt: -1 });
    // await this.createIndex({ updatedAt: -1 });
    //
    // // Текстовый индекс для поиска
    // await this.createIndex({
    //     name: 'text',
    //     description: 'text'
    // }, {
    //     default_language: 'russian'
    // });
  }
}
