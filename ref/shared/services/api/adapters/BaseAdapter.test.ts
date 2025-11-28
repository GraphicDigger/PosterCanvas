// ===================================================================
// API SYSTEM TESTS: Base Adapter
// 🔴 CRITICAL-FIRST STRATEGY - Phase 5 Part 2 🔴
// Error Simulation, Delays, Retry Logic, Logging
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BaseAdapter, IAdapter } from './BaseAdapter';
import type { DataSource } from '../types';

// Concrete test adapter implementation
class TestAdapter extends BaseAdapter<{ id: string; name: string }> {
  private storage: Map<string, { id: string; name: string }> = new Map();

  async getAll(): Promise<{ id: string; name: string }[]> {
    this.checkShouldError();
    await this.simulateDelay();
    return Array.from(this.storage.values());
  }

  async getById(id: string): Promise<{ id: string; name: string } | null> {
    this.checkShouldError();
    await this.simulateDelay();
    return this.storage.get(id) || null;
  }

  async create(entity: Partial<{ id: string; name: string }>): Promise<{ id: string; name: string }> {
    this.checkShouldError();
    await this.simulateDelay();
    const id = entity.id || this.generateId();
    const newEntity = { id, name: entity.name || 'default' };
    this.storage.set(id, newEntity);
    return newEntity;
  }

  async update(id: string, updates: Partial<{ id: string; name: string }>): Promise<{ id: string; name: string }> {
    this.checkShouldError();
    await this.simulateDelay();
    const existing = this.storage.get(id);
    if (!existing) {
      throw new Error('Entity not found');
    }
    const updated = { ...existing, ...updates, id }; // Preserve ID
    this.storage.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    this.checkShouldError();
    await this.simulateDelay();
    this.storage.delete(id);
  }

  // Expose protected methods for testing
  public testGenerateId(): string {
    return this.generateId();
  }

  public testLog(operation: string, data?: any): void {
    this.log(operation, data);
  }

  public testHandleError(error: unknown, operation: string): never {
    return this.handleError(error, operation);
  }
}

describe('BaseAdapter - CRITICAL BUSINESS LOGIC', () => {

  // ===================================================================
  // Section 1: CRUD Operations (5 tests)
  // ===================================================================

  describe('CRUD Operations', () => {
    it('should get all entities', async () => {
      const dataSource: DataSource = {
        type: 'mock',
        config: { delay: 0 },
      };
      const adapter = new TestAdapter(dataSource);

      await adapter.create({ name: 'Entity 1' });
      await adapter.create({ name: 'Entity 2' });

      const result = await adapter.getAll();

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Entity 1');
      expect(result[1].name).toBe('Entity 2');
    });

    it('should get entity by id', async () => {
      const dataSource: DataSource = {
        type: 'mock',
        config: { delay: 0 },
      };
      const adapter = new TestAdapter(dataSource);

      const created = await adapter.create({ name: 'Test Entity' });
      const result = await adapter.getById(created.id);

      expect(result).toBeDefined();
      expect(result?.id).toBe(created.id);
      expect(result?.name).toBe('Test Entity');
    });

    it('should create entity', async () => {
      const dataSource: DataSource = {
        type: 'mock',
        config: { delay: 0 },
      };
      const adapter = new TestAdapter(dataSource);

      const result = await adapter.create({ name: 'New Entity' });

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.name).toBe('New Entity');
    });

    it('should update entity', async () => {
      const dataSource: DataSource = {
        type: 'mock',
        config: { delay: 0 },
      };
      const adapter = new TestAdapter(dataSource);

      const created = await adapter.create({ name: 'Original' });
      const updated = await adapter.update(created.id, { name: 'Updated' });

      expect(updated.id).toBe(created.id);
      expect(updated.name).toBe('Updated');
    });

    it('should delete entity', async () => {
      const dataSource: DataSource = {
        type: 'mock',
        config: { delay: 0 },
      };
      const adapter = new TestAdapter(dataSource);

      const created = await adapter.create({ name: 'To Delete' });
      await adapter.delete(created.id);
      const result = await adapter.getById(created.id);

      expect(result).toBeNull();
    });
  });

  // ===================================================================
  // Section 2: Delay Simulation (5 tests)
  // ===================================================================

  describe('Delay Simulation', () => {
    it('should apply default delay (100ms)', async () => {
      const dataSource: DataSource = {
        type: 'mock',
        config: {},
      };
      const adapter = new TestAdapter(dataSource);

      const startTime = performance.now();
      await adapter.getAll();
      const endTime = performance.now();

      // Should take at least 100ms (with some tolerance)
      expect(endTime - startTime).toBeGreaterThanOrEqual(90);
    });

    it('should apply custom delay from config', async () => {
      const dataSource: DataSource = {
        type: 'mock',
        config: { delay: 200 },
      };
      const adapter = new TestAdapter(dataSource);

      const startTime = performance.now();
      await adapter.getAll();
      const endTime = performance.now();

      // Should take at least 200ms (with some tolerance)
      expect(endTime - startTime).toBeGreaterThanOrEqual(190);
    });

    it('should skip delay when set to 0', async () => {
      const dataSource: DataSource = {
        type: 'mock',
        config: { delay: 0 },
      };
      const adapter = new TestAdapter(dataSource);

      const startTime = performance.now();
      await adapter.getAll();
      const endTime = performance.now();

      // Should complete quickly (under 10ms)
      expect(endTime - startTime).toBeLessThan(10);
    });

    it('should handle negative delay as 0', async () => {
      const dataSource: DataSource = {
        type: 'mock',
        config: { delay: -100 },
      };
      const adapter = new TestAdapter(dataSource);

      const startTime = performance.now();
      await adapter.getAll();
      const endTime = performance.now();

      // Should complete quickly (under 10ms)
      expect(endTime - startTime).toBeLessThan(10);
    });

    it('should delay all CRUD operations', async () => {
      const dataSource: DataSource = {
        type: 'mock',
        config: { delay: 50 },
      };
      const adapter = new TestAdapter(dataSource);

      const createStart = performance.now();
      const entity = await adapter.create({ name: 'Test' });
      const createEnd = performance.now();

      const getStart = performance.now();
      await adapter.getById(entity.id);
      const getEnd = performance.now();

      const updateStart = performance.now();
      await adapter.update(entity.id, { name: 'Updated' });
      const updateEnd = performance.now();

      const deleteStart = performance.now();
      await adapter.delete(entity.id);
      const deleteEnd = performance.now();

      // All operations should take at least 50ms
      expect(createEnd - createStart).toBeGreaterThanOrEqual(45);
      expect(getEnd - getStart).toBeGreaterThanOrEqual(45);
      expect(updateEnd - updateStart).toBeGreaterThanOrEqual(45);
      expect(deleteEnd - deleteStart).toBeGreaterThanOrEqual(45);
    });
  });

  // ===================================================================
  // Section 3: Error Simulation (5 tests)
  // ===================================================================

  describe('Error Simulation', () => {
    it('should throw error when shouldError is true', async () => {
      const dataSource: DataSource = {
        type: 'mock',
        config: { shouldError: true, delay: 0 },
      };
      const adapter = new TestAdapter(dataSource);

      await expect(adapter.getAll()).rejects.toThrow('TestAdapter configured to throw error');
    });

    it('should throw error on all CRUD operations when shouldError is true', async () => {
      const dataSource: DataSource = {
        type: 'mock',
        config: { shouldError: true, delay: 0 },
      };
      const adapter = new TestAdapter(dataSource);

      await expect(adapter.getAll()).rejects.toThrow();
      await expect(adapter.getById('test-id')).rejects.toThrow();
      await expect(adapter.create({ name: 'Test' })).rejects.toThrow();
      await expect(adapter.update('test-id', { name: 'Updated' })).rejects.toThrow();
      await expect(adapter.delete('test-id')).rejects.toThrow();
    });

    it('should not throw error when shouldError is false', async () => {
      const dataSource: DataSource = {
        type: 'mock',
        config: { shouldError: false, delay: 0 },
      };
      const adapter = new TestAdapter(dataSource);

      await expect(adapter.getAll()).resolves.not.toThrow();
      await expect(adapter.create({ name: 'Test' })).resolves.not.toThrow();
    });

    it('should not throw error when shouldError is not set', async () => {
      const dataSource: DataSource = {
        type: 'mock',
        config: { delay: 0 },
      };
      const adapter = new TestAdapter(dataSource);

      await expect(adapter.getAll()).resolves.not.toThrow();
    });

    it('should handle error in handleError method', () => {
      const dataSource: DataSource = {
        type: 'mock',
        config: {},
      };
      const adapter = new TestAdapter(dataSource);

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        adapter.testHandleError(new Error('Test error'), 'testOperation');
      }).toThrow('Test error');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('[TestAdapter] Error in testOperation'),
        expect.any(Error),
      );

      consoleErrorSpy.mockRestore();
    });
  });
});
