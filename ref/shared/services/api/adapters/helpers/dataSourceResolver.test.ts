// ===================================================================
// Unit Tests for validateDataSourceConfig
// CRITICAL BUSINESS LOGIC - Data Source Validation
// Week 2, Day 4 - Part 2 (20 tests)
// ===================================================================

import { describe, it, expect } from 'vitest';
import { validateDataSourceConfig } from './dataSourceResolver';
import type { DataSource } from '../../types';

describe('validateDataSourceConfig - Data Source Validation', () => {
  // ===================================================================
  // PART 1: Basic Validation (4 tests)
  // ===================================================================

  describe('Basic Validation', () => {
    it('should validate complete data source', () => {
      const dataSource: DataSource = {
        type: 'mock',
        config: {},
      };

      const result = validateDataSourceConfig(dataSource);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject data source without type', () => {
      const dataSource = {
        config: {},
      } as DataSource;

      const result = validateDataSourceConfig(dataSource);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Data source type is required');
    });

    it('should reject data source without config', () => {
      const dataSource = {
        type: 'mock',
      } as DataSource;

      const result = validateDataSourceConfig(dataSource);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Data source config is required');
    });

    it('should reject data source without both type and config', () => {
      const dataSource = {} as DataSource;

      const result = validateDataSourceConfig(dataSource);

      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(2);
      expect(result.errors).toContain('Data source type is required');
      expect(result.errors).toContain('Data source config is required');
    });
  });

  // ===================================================================
  // PART 2: REST Data Source Validation (4 tests)
  // ===================================================================

  describe('REST Data Source Validation', () => {
    it('should validate REST data source with baseUrl', () => {
      const dataSource: DataSource = {
        type: 'rest',
        config: {
          baseUrl: 'https://api.example.com',
        },
      };

      const result = validateDataSourceConfig(dataSource);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject REST data source without baseUrl', () => {
      const dataSource: DataSource = {
        type: 'rest',
        config: {},
      };

      const result = validateDataSourceConfig(dataSource);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('REST data source requires baseUrl');
    });

    it('should validate REST data source with optional headers', () => {
      const dataSource: DataSource = {
        type: 'rest',
        config: {
          baseUrl: 'https://api.example.com',
          headers: { Authorization: 'Bearer token' },
        },
      };

      const result = validateDataSourceConfig(dataSource);

      expect(result.isValid).toBe(true);
    });

    it('should validate REST data source with timeout', () => {
      const dataSource: DataSource = {
        type: 'rest',
        config: {
          baseUrl: 'https://api.example.com',
          timeout: 5000,
        },
      };

      const result = validateDataSourceConfig(dataSource);

      expect(result.isValid).toBe(true);
    });
  });

  // ===================================================================
  // PART 3: Supabase Data Source Validation (4 tests)
  // ===================================================================

  describe('Supabase Data Source Validation', () => {
    it('should validate Supabase data source with url and key', () => {
      const dataSource: DataSource = {
        type: 'supabase',
        config: {
          url: 'https://project.supabase.co',
          key: 'public-anon-key',
        },
      };

      const result = validateDataSourceConfig(dataSource);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject Supabase data source without url', () => {
      const dataSource: DataSource = {
        type: 'supabase',
        config: {
          key: 'public-anon-key',
        },
      };

      const result = validateDataSourceConfig(dataSource);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Supabase requires url');
    });

    it('should reject Supabase data source without key', () => {
      const dataSource: DataSource = {
        type: 'supabase',
        config: {
          url: 'https://project.supabase.co',
        },
      };

      const result = validateDataSourceConfig(dataSource);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Supabase requires key');
    });

    it('should reject Supabase data source without url and key', () => {
      const dataSource: DataSource = {
        type: 'supabase',
        config: {},
      };

      const result = validateDataSourceConfig(dataSource);

      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(2);
      expect(result.errors).toContain('Supabase requires url');
      expect(result.errors).toContain('Supabase requires key');
    });
  });

  // ===================================================================
  // PART 4: GraphQL Data Source Validation (4 tests)
  // ===================================================================

  describe('GraphQL Data Source Validation', () => {
    it('should validate GraphQL data source with endpoint', () => {
      const dataSource: DataSource = {
        type: 'graphql',
        config: {
          endpoint: 'https://api.example.com/graphql',
        },
      };

      const result = validateDataSourceConfig(dataSource);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject GraphQL data source without endpoint', () => {
      const dataSource: DataSource = {
        type: 'graphql',
        config: {},
      };

      const result = validateDataSourceConfig(dataSource);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('GraphQL requires endpoint');
    });

    it('should validate GraphQL data source with headers', () => {
      const dataSource: DataSource = {
        type: 'graphql',
        config: {
          endpoint: 'https://api.example.com/graphql',
          headers: { Authorization: 'Bearer token' },
        },
      };

      const result = validateDataSourceConfig(dataSource);

      expect(result.isValid).toBe(true);
    });

    it('should validate GraphQL data source with authentication', () => {
      const dataSource: DataSource = {
        type: 'graphql',
        config: {
          endpoint: 'https://api.example.com/graphql',
          auth: { type: 'bearer', token: 'xyz' },
        },
      };

      const result = validateDataSourceConfig(dataSource);

      expect(result.isValid).toBe(true);
    });
  });

  // ===================================================================
  // PART 5: Other Data Source Types (4 tests)
  // ===================================================================

  describe('Other Data Source Types', () => {
    it('should validate mock data source', () => {
      const dataSource: DataSource = {
        type: 'mock',
        config: {},
      };

      const result = validateDataSourceConfig(dataSource);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate sql data source', () => {
      const dataSource: DataSource = {
        type: 'sql',
        config: { backend: 'postgresql' },
      };

      const result = validateDataSourceConfig(dataSource);

      expect(result.isValid).toBe(true);
    });

    it('should validate postgresql data source', () => {
      const dataSource: DataSource = {
        type: 'postgresql',
        config: {},
      };

      const result = validateDataSourceConfig(dataSource);

      expect(result.isValid).toBe(true);
    });

    it('should validate mongodb data source', () => {
      const dataSource: DataSource = {
        type: 'mongodb',
        config: {},
      };

      const result = validateDataSourceConfig(dataSource);

      expect(result.isValid).toBe(true);
    });
  });
});

