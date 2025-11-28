// ===================================================================
// Unit Tests for attachContextToScreen Helper
// Coverage Target: 100%
// Phase 1 - Business Logic Helpers
// Risk: LOW (pure function, no side effects)
// ===================================================================

import { describe, it, expect } from 'vitest';
import { attachContextToScreen } from '../attachContextToScreen';

describe('attachContextToScreen Helper', () => {
  describe('Basic Functionality', () => {
    it('should attach context to screen when context exists', () => {
      const screen = {
        id: 'screen-1',
        name: 'Home Screen',
        elements: [],
      };

      const contextObjectsMap = {
        'screen-1': [
          { id: 'context-1', type: 'chat' },
          { id: 'context-2', type: 'document' },
        ],
      };

      const result = attachContextToScreen(screen, contextObjectsMap);

      expect(result).toEqual({
        id: 'screen-1',
        name: 'Home Screen',
        elements: [],
        context: [
          { id: 'context-1', type: 'chat' },
          { id: 'context-2', type: 'document' },
        ],
      });
    });

    it('should attach empty context array when no context exists for screen', () => {
      const screen = {
        id: 'screen-1',
        name: 'Home Screen',
      };

      const contextObjectsMap = {
        'screen-2': [{ id: 'context-1', type: 'chat' }],
      };

      const result = attachContextToScreen(screen, contextObjectsMap);

      expect(result).toEqual({
        id: 'screen-1',
        name: 'Home Screen',
        context: [],
      });
    });

    it('should preserve all original screen properties', () => {
      const screen = {
        id: 'screen-1',
        name: 'Home Screen',
        elements: ['el-1', 'el-2'],
        metadata: { created: '2024-01-01' },
        settings: { theme: 'dark' },
      };

      const contextObjectsMap = {
        'screen-1': [{ id: 'context-1', type: 'task' }],
      };

      const result = attachContextToScreen(screen, contextObjectsMap);

      expect(result).toEqual({
        id: 'screen-1',
        name: 'Home Screen',
        elements: ['el-1', 'el-2'],
        metadata: { created: '2024-01-01' },
        settings: { theme: 'dark' },
        context: [{ id: 'context-1', type: 'task' }],
      });
    });
  });

  describe('Edge Cases', () => {
    it('should return null when screen is null', () => {
      const contextObjectsMap = {
        'screen-1': [{ id: 'context-1', type: 'chat' }],
      };

      const result = attachContextToScreen(null, contextObjectsMap);

      expect(result).toBeNull();
    });

    it('should return null when screen is undefined', () => {
      const contextObjectsMap = {
        'screen-1': [{ id: 'context-1', type: 'chat' }],
      };

      const result = attachContextToScreen(undefined, contextObjectsMap);

      expect(result).toBeNull();
    });

    it('should handle empty contextObjectsMap', () => {
      const screen = {
        id: 'screen-1',
        name: 'Home Screen',
      };

      const result = attachContextToScreen(screen, {});

      expect(result).toEqual({
        id: 'screen-1',
        name: 'Home Screen',
        context: [],
      });
    });

    it('should throw error when contextObjectsMap is null (BUG)', () => {
      // NOTE: This is a bug in the implementation - it should handle null gracefully
      // TODO: Fix attachContextToScreen to handle null contextObjectsMap
      const screen = {
        id: 'screen-1',
        name: 'Home Screen',
      };

      expect(() => attachContextToScreen(screen, null)).toThrow();
    });

    it('should throw error when contextObjectsMap is undefined (BUG)', () => {
      // NOTE: This is a bug in the implementation - it should handle undefined gracefully
      // TODO: Fix attachContextToScreen to handle undefined contextObjectsMap
      const screen = {
        id: 'screen-1',
        name: 'Home Screen',
      };

      expect(() => attachContextToScreen(screen, undefined)).toThrow();
    });
  });

  describe('Multiple Contexts', () => {
    it('should attach multiple context objects', () => {
      const screen = {
        id: 'screen-1',
        name: 'Dashboard',
      };

      const contextObjectsMap = {
        'screen-1': [
          { id: 'context-1', type: 'chat', title: 'Team Chat' },
          { id: 'context-2', type: 'document', title: 'Project Docs' },
          { id: 'context-3', type: 'task', title: 'Sprint Tasks' },
        ],
      };

      const result = attachContextToScreen(screen, contextObjectsMap);

      expect(result.context).toHaveLength(3);
      expect(result.context[0]).toEqual({ id: 'context-1', type: 'chat', title: 'Team Chat' });
      expect(result.context[1]).toEqual({ id: 'context-2', type: 'document', title: 'Project Docs' });
      expect(result.context[2]).toEqual({ id: 'context-3', type: 'task', title: 'Sprint Tasks' });
    });
  });

  describe('Immutability', () => {
    it('should not mutate original screen object', () => {
      const screen = {
        id: 'screen-1',
        name: 'Home Screen',
        elements: [],
      };

      const originalScreen = { ...screen };

      const contextObjectsMap = {
        'screen-1': [{ id: 'context-1', type: 'chat' }],
      };

      attachContextToScreen(screen, contextObjectsMap);

      expect(screen).toEqual(originalScreen);
      expect(screen.context).toBeUndefined();
    });

    it('should not mutate contextObjectsMap', () => {
      const screen = {
        id: 'screen-1',
        name: 'Home Screen',
      };

      const contextObjectsMap = {
        'screen-1': [{ id: 'context-1', type: 'chat' }],
      };

      const originalMap = JSON.parse(JSON.stringify(contextObjectsMap));

      attachContextToScreen(screen, contextObjectsMap);

      expect(contextObjectsMap).toEqual(originalMap);
    });
  });
});

