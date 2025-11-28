// ===================================================================
// Unit Tests for getStore Utility
// Coverage Target: 100%
// Phase 1 - Utilities (SMALL IMPACT - 17 lines, store accessor)
// Risk: LOW (Pure function, simple lookup logic)
// ===================================================================

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getStore } from '../getStore';

describe('getStore Utility', () => {
  let consoleWarnSpy;

  beforeEach(() => {
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  describe('Successful Retrieval', () => {
    it('should return function when entityKind and key exist', () => {
      const mockFn = vi.fn();
      const storeMap = {
        user: {
          getUser: mockFn,
        },
      };

      const result = getStore(storeMap, 'user', 'getUser');

      expect(result).toBe(mockFn);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('should return selector function', () => {
      const mockSelector = vi.fn((state) => state.users);
      const storeMap = {
        user: {
          selector: mockSelector,
        },
      };

      const result = getStore(storeMap, 'user', 'selector');

      expect(result).toBe(mockSelector);
    });

    it('should return action function', () => {
      const mockAction = vi.fn();
      const storeMap = {
        task: {
          createTask: mockAction,
        },
      };

      const result = getStore(storeMap, 'task', 'createTask');

      expect(result).toBe(mockAction);
    });

    it('should handle multiple entity kinds', () => {
      const userFn = vi.fn();
      const taskFn = vi.fn();
      const storeMap = {
        user: { getUser: userFn },
        task: { getTask: taskFn },
      };

      const userResult = getStore(storeMap, 'user', 'getUser');
      const taskResult = getStore(storeMap, 'task', 'getTask');

      expect(userResult).toBe(userFn);
      expect(taskResult).toBe(taskFn);
    });

    it('should handle multiple keys for same entity', () => {
      const getFn = vi.fn();
      const setFn = vi.fn();
      const storeMap = {
        user: {
          getUser: getFn,
          setUser: setFn,
        },
      };

      const getResult = getStore(storeMap, 'user', 'getUser');
      const setResult = getStore(storeMap, 'user', 'setUser');

      expect(getResult).toBe(getFn);
      expect(setResult).toBe(setFn);
    });
  });

  describe('Missing EntityKind', () => {
    it('should return null when entityKind is undefined', () => {
      const storeMap = {
        user: { getUser: vi.fn() },
      };

      const result = getStore(storeMap, undefined, 'getUser');

      expect(result).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith('No store map found for entity type: undefined');
    });

    it('should return null when entityKind is null', () => {
      const storeMap = {
        user: { getUser: vi.fn() },
      };

      const result = getStore(storeMap, null, 'getUser');

      expect(result).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith('No store map found for entity type: null');
    });

    it('should return null when entityKind is empty string', () => {
      const storeMap = {
        user: { getUser: vi.fn() },
      };

      const result = getStore(storeMap, '', 'getUser');

      expect(result).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith('No store map found for entity type: ');
    });

    it('should return null when entityKind does not exist in storeMap', () => {
      const storeMap = {
        user: { getUser: vi.fn() },
      };

      const result = getStore(storeMap, 'task', 'getTask');

      expect(result).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith('No store map found for entity type: task');
    });
  });

  describe('Missing Key', () => {
    it('should return null when key does not exist', () => {
      const storeMap = {
        user: { getUser: vi.fn() },
      };

      const result = getStore(storeMap, 'user', 'deleteUser');

      expect(result).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith('No deleteUser method found for entity type: user');
    });

    it('should return null when key is undefined', () => {
      const storeMap = {
        user: { getUser: vi.fn() },
      };

      const result = getStore(storeMap, 'user', undefined);

      expect(result).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith('No undefined method found for entity type: user');
    });

    it('should return null when key is null', () => {
      const storeMap = {
        user: { getUser: vi.fn() },
      };

      const result = getStore(storeMap, 'user', null);

      expect(result).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith('No null method found for entity type: user');
    });

    it('should return null when key is empty string', () => {
      const storeMap = {
        user: { getUser: vi.fn() },
      };

      const result = getStore(storeMap, 'user', '');

      expect(result).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith('No  method found for entity type: user');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty storeMap', () => {
      const storeMap = {};

      const result = getStore(storeMap, 'user', 'getUser');

      expect(result).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith('No store map found for entity type: user');
    });

    it('should handle storeMap with empty entity', () => {
      const storeMap = {
        user: {},
      };

      const result = getStore(storeMap, 'user', 'getUser');

      expect(result).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith('No getUser method found for entity type: user');
    });

    it('should handle function value that is null', () => {
      const storeMap = {
        user: {
          getUser: null,
        },
      };

      const result = getStore(storeMap, 'user', 'getUser');

      expect(result).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith('No getUser method found for entity type: user');
    });

    it('should handle function value that is undefined', () => {
      const storeMap = {
        user: {
          getUser: undefined,
        },
      };

      const result = getStore(storeMap, 'user', 'getUser');

      expect(result).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith('No getUser method found for entity type: user');
    });

    it('should return non-function values if they exist', () => {
      const storeMap = {
        user: {
          data: 'some string value',
        },
      };

      const result = getStore(storeMap, 'user', 'data');

      expect(result).toBe('some string value');
    });

    it('should return object values if they exist', () => {
      const mockObj = { nested: 'value' };
      const storeMap = {
        user: {
          config: mockObj,
        },
      };

      const result = getStore(storeMap, 'user', 'config');

      expect(result).toBe(mockObj);
    });
  });

  describe('Console Warnings', () => {
    it('should warn once for missing entityKind', () => {
      const storeMap = {
        user: { getUser: vi.fn() },
      };

      getStore(storeMap, 'task', 'getTask');

      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
      expect(consoleWarnSpy).toHaveBeenCalledWith('No store map found for entity type: task');
    });

    it('should warn once for missing key', () => {
      const storeMap = {
        user: { getUser: vi.fn() },
      };

      getStore(storeMap, 'user', 'deleteUser');

      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
      expect(consoleWarnSpy).toHaveBeenCalledWith('No deleteUser method found for entity type: user');
    });

    it('should not warn on successful retrieval', () => {
      const storeMap = {
        user: { getUser: vi.fn() },
      };

      getStore(storeMap, 'user', 'getUser');

      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
  });

  describe('Real-World Examples', () => {
    it('should retrieve user selector', () => {
      const selectUser = (state) => state.user;
      const storeMap = {
        user: {
          selectUser,
          selectUsers: (state) => state.users,
        },
      };

      const result = getStore(storeMap, 'user', 'selectUser');

      expect(result).toBe(selectUser);
    });

    it('should retrieve task action', () => {
      const createTask = (task) => ({ type: 'CREATE_TASK', payload: task });
      const storeMap = {
        task: {
          createTask,
          updateTask: (task) => ({ type: 'UPDATE_TASK', payload: task }),
        },
      };

      const result = getStore(storeMap, 'task', 'createTask');

      expect(result).toBe(createTask);
    });

    it('should handle complex storeMap structure', () => {
      const storeMap = {
        user: {
          selectUser: vi.fn(),
          selectUsers: vi.fn(),
          createUser: vi.fn(),
          updateUser: vi.fn(),
          deleteUser: vi.fn(),
        },
        task: {
          selectTask: vi.fn(),
          selectTasks: vi.fn(),
          createTask: vi.fn(),
        },
        project: {
          selectProject: vi.fn(),
        },
      };

      const userSelector = getStore(storeMap, 'user', 'selectUser');
      const taskAction = getStore(storeMap, 'task', 'createTask');
      const projectSelector = getStore(storeMap, 'project', 'selectProject');

      expect(userSelector).toBe(storeMap.user.selectUser);
      expect(taskAction).toBe(storeMap.task.createTask);
      expect(projectSelector).toBe(storeMap.project.selectProject);
    });
  });

  describe('Multiple Calls', () => {
    it('should return same function on multiple calls', () => {
      const mockFn = vi.fn();
      const storeMap = {
        user: { getUser: mockFn },
      };

      const result1 = getStore(storeMap, 'user', 'getUser');
      const result2 = getStore(storeMap, 'user', 'getUser');

      expect(result1).toBe(result2);
      expect(result1).toBe(mockFn);
    });

    it('should handle alternating successful and failed calls', () => {
      const mockFn = vi.fn();
      const storeMap = {
        user: { getUser: mockFn },
      };

      const result1 = getStore(storeMap, 'user', 'getUser');
      const result2 = getStore(storeMap, 'task', 'getTask');
      const result3 = getStore(storeMap, 'user', 'getUser');

      expect(result1).toBe(mockFn);
      expect(result2).toBeNull();
      expect(result3).toBe(mockFn);
    });
  });
});

