// shared/lib/api/adapters/GraphQLAdapter.ts
import { BaseAdapter } from './BaseAdapter';
import { registerAdapter } from '../registry/AdapterRegistry';
import type { GraphQLDataSource } from '../types';


@registerAdapter('graphql')
export class GraphQLAdapter<T extends { id: string }> extends BaseAdapter<T, GraphQLDataSource> {

  constructor(dataSource: GraphQLDataSource, private entityName: string) {
    super(dataSource);
  }

  async getAll(): Promise<T[]> {
    const query = this.buildQuery('getAll');
    return this.executeQuery(query);
  }

  async getById(id: string): Promise<T | null> {
    const query = this.buildQuery('getById', { id });
    const result = await this.executeQuery(query);
    return result[0] || null;
  }

  async create(entity: Partial<T>): Promise<T> {
    const mutation = this.buildMutation('create', entity);
    const result = await this.executeQuery(mutation);
    return result;
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    const mutation = this.buildMutation('update', { id, ...updates });
    return this.executeQuery(mutation);
  }

  async delete(id: string): Promise<void> {
    const mutation = this.buildMutation('delete', { id });
    await this.executeQuery(mutation);
  }

  // Building GraphQL queries
  // Построение GraphQL запросов

  private buildQuery(operation: string, _variables?: Record<string, any>): string {
    const entityType = this.entityName.slice(0, -1); // screens -> screen

    switch (operation) {
    case 'getAll':
      return `
                    query GetAll${this.capitalize(this.entityName)} {
                        ${this.entityName} {
                            id
                            name
                            # Добавьте нужные поля
                        }
                    }
                `;

    case 'getById':
      return `
                    query Get${this.capitalize(entityType)}($id: ID!) {
                        ${entityType}(id: $id) {
                            id
                            name
                            # Добавьте нужные поля
                        }
                    }
                `;

    default:
      throw new Error(`Unknown query operation: ${operation}`);
    }
  }

  // Building GraphQL mutations
  // Построение GraphQL мутаций

  private buildMutation(operation: string, _variables: Record<string, any>): string {
    const entityType = this.entityName.slice(0, -1);

    switch (operation) {
    case 'create':
      return `
                    mutation Create${this.capitalize(entityType)}($input: ${this.capitalize(entityType)}Input!) {
                        create${this.capitalize(entityType)}(input: $input) {
                            id
                            name
                            # Добавьте нужные поля
                        }
                    }
                `;

    case 'update':
      return `
                    mutation Update${this.capitalize(entityType)}($id: ID!, $input: ${this.capitalize(entityType)}Input!) {
                        update${this.capitalize(entityType)}(id: $id, input: $input) {
                            id
                            name
                            # Добавьте нужные поля
                        }
                    }
                `;

    case 'delete':
      return `
                    mutation Delete${this.capitalize(entityType)}($id: ID!) {
                        delete${this.capitalize(entityType)}(id: $id)
                    }
                `;

    default:
      throw new Error(`Unknown mutation operation: ${operation}`);
    }
  }

  // Executing GraphQL query
  // Выполнение GraphQL запроса

  private async executeQuery(query: string, variables?: Record<string, any>): Promise<any> {
    const { endpoint, headers = {} } = this.dataSource.config;

    if (!endpoint) {
      throw new Error('GraphQL endpoint is required');
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      if (!response.ok) {
        throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
      }

      return result.data;

    } catch (error) {
      console.error('GraphQL execution error:', error);
      throw error;
    }
  }

  // Utility for capitalizing strings
  // Утилита для капитализации строк

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

// Alternative way to register without a decorator
// Альтернативный способ регистрации без декоратора

// adapterRegistry.register('graphql', GraphQLAdapter);
