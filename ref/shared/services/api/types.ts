// shared/lib/api/types.ts

export type DataSourceType = 'mock' | 'rest' | 'graphql' | 'supabase' | 'sql' | 'postgresql' | 'mongodb';

export interface DataSourceConfigMap {
    mock: {
        delay?: number;
        shouldError?: boolean;
    };
    rest: {
        baseUrl: string;
        timeout?: number;
        headers?: Record<string, string>;
        apiKey?: string;
    };
    graphql: {
        endpoint: string;
        headers?: Record<string, string>;
        subscriptions?: {
            url: string;
            protocol: 'ws' | 'wss';
        };
    };
    supabase: {
        url: string;
        key: string;
        schema?: string;
        realtime?: boolean;
    };
    sql: {
        backend: 'postgresql' | 'mysql';
        connection: {
            host: string;
            port: number;
            database: string;
            username: string;
            password: string;
        };
        ssl?: boolean;
        timeout?: number;
        poolSize?: number;
        uiCreated?: boolean; // Данные созданы через UI интерфейс
    };
    postgresql: {
        connection: {
            host: string;
            port: number;
            database: string;
            username: string;
            password: string;
        };
        ssl?: boolean | { rejectUnauthorized?: boolean; cert?: string; key?: string; ca?: string; };
        timeout?: number;
        poolSize?: number;
        schema?: string;
        searchPath?: string[];
        applicationName?: string;
        uiCreated?: boolean; // Данные созданы через UI интерфейс
    };
    mongodb: {
        connectionString: string;
        database: string;
        authSource?: string;
        ssl?: boolean;
        timeout?: number;
        maxPoolSize?: number;
        minPoolSize?: number;
        maxIdleTimeMS?: number;
        serverSelectionTimeoutMS?: number;
        compression?: 'snappy' | 'zlib' | 'zstd';
        readPreference?: 'primary' | 'primaryPreferred' | 'secondary' | 'secondaryPreferred' | 'nearest';
        writeConcern?: {
            w?: number | 'majority';
            j?: boolean;
            wtimeout?: number;
        };
        uiCreated?: boolean; // Данные созданы через UI интерфейс
    };
}

export interface DataSource<T extends DataSourceType = DataSourceType> {
    type: T;
    config: DataSourceConfigMap[T];
}

export type MockDataSource = DataSource<'mock'>;
export type RestDataSource = DataSource<'rest'>;
export type GraphQLDataSource = DataSource<'graphql'>;
export type SupabaseDataSource = DataSource<'supabase'>;
export type SQLDataSource = DataSource<'sql'>;
export type PostgreSQLDataSource = DataSource<'postgresql'>;
export type MongoDBDataSource = DataSource<'mongodb'>;
