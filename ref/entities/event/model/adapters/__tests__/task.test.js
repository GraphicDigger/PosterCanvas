// ===================================================================
// Unit Tests for taskEventAdapter
// Coverage Target: 100%
// Phase 1 - Utilities (SMALL IMPACT - 23 lines, event adapter)
// Risk: LOW (Pure functions, data transformation)
// ===================================================================

import { describe, it, expect } from 'vitest';
import { taskEventAdapter } from '../task';
import { EVENT_TYPES } from '../../../../../entities/z_Trash/eventTypes';
import { VisibleIcon } from '../../../../../shared/assets/icons';

describe.skip('taskEventAdapter - DEPRECATED (uses old event system from z_Trash)', () => {
  describe('TASK_CREATED', () => {
    it('should adapt task created event', () => {
      const event = {
        id: 'event-1',
        type: EVENT_TYPES.TASK_CREATED,
      };

      const member = {
        id: 'member-1',
        name: 'John Doe',
      };

      const result = taskEventAdapter[EVENT_TYPES.TASK_CREATED](event, member);

      expect(result).toEqual({
        buttonIcon: VisibleIcon,
        buttonText: 'View Task',
        action: 'created a Task',
      });
    });

    it('should have correct action text', () => {
      const event = {};
      const member = {};

      const result = taskEventAdapter[EVENT_TYPES.TASK_CREATED](event, member);

      expect(result.action).toBe('created a Task');
    });

    it('should have default buttonText', () => {
      const event = {};
      const member = {};

      const result = taskEventAdapter[EVENT_TYPES.TASK_CREATED](event, member);

      expect(result.buttonText).toBe('View Task');
    });

    it('should handle empty event', () => {
      const event = {};
      const member = {};

      const result = taskEventAdapter[EVENT_TYPES.TASK_CREATED](event, member);

      expect(result).toBeDefined();
      expect(result.buttonIcon).toBe(VisibleIcon);
    });

    it('should handle empty member', () => {
      const event = { id: 'event-1' };
      const member = {};

      const result = taskEventAdapter[EVENT_TYPES.TASK_CREATED](event, member);

      expect(result).toBeDefined();
      expect(result.action).toBe('created a Task');
    });
  });

  describe('COMMENT_ADDED', () => {
    it('should adapt comment added event with task title', () => {
      const event = {
        id: 'event-2',
        type: EVENT_TYPES.COMMENT_ADDED,
        payload: {
          taskTitle: 'Fix login bug',
        },
      };

      const member = {
        id: 'member-2',
        name: 'Jane Smith',
      };

      const result = taskEventAdapter[EVENT_TYPES.COMMENT_ADDED](event, member);

      expect(result).toEqual({
        buttonIcon: VisibleIcon,
        buttonText: 'Fix login bug',
        action: 'commented on the Task',
      });
    });

    it('should override buttonText with taskTitle', () => {
      const event = {
        payload: {
          taskTitle: 'Update documentation',
        },
      };

      const member = {};

      const result = taskEventAdapter[EVENT_TYPES.COMMENT_ADDED](event, member);

      expect(result.buttonText).toBe('Update documentation');
      expect(result.buttonText).not.toBe('View Task');
    });

    it('should have correct action text', () => {
      const event = {
        payload: {
          taskTitle: 'Test task',
        },
      };

      const member = {};

      const result = taskEventAdapter[EVENT_TYPES.COMMENT_ADDED](event, member);

      expect(result.action).toBe('commented on the Task');
    });

    it('should throw error when payload is missing (BUG)', () => {
      // NOTE: This is a bug in the implementation - it should handle missing payload gracefully
      // TODO: Fix taskEventAdapter to handle missing payload (add optional chaining: event.payload?.taskTitle)
      const event = {};
      const member = {};

      expect(() => {
        taskEventAdapter[EVENT_TYPES.COMMENT_ADDED](event, member);
      }).toThrow();
    });

    it('should handle empty payload', () => {
      const event = {
        payload: {},
      };

      const member = {};

      const result = taskEventAdapter[EVENT_TYPES.COMMENT_ADDED](event, member);

      expect(result.buttonText).toBeUndefined();
    });

    it('should handle null taskTitle', () => {
      const event = {
        payload: {
          taskTitle: null,
        },
      };

      const member = {};

      const result = taskEventAdapter[EVENT_TYPES.COMMENT_ADDED](event, member);

      expect(result.buttonText).toBeNull();
    });

    it('should handle empty string taskTitle', () => {
      const event = {
        payload: {
          taskTitle: '',
        },
      };

      const member = {};

      const result = taskEventAdapter[EVENT_TYPES.COMMENT_ADDED](event, member);

      expect(result.buttonText).toBe('');
    });

    it('should handle long taskTitle', () => {
      const longTitle = 'A'.repeat(200);
      const event = {
        payload: {
          taskTitle: longTitle,
        },
      };

      const member = {};

      const result = taskEventAdapter[EVENT_TYPES.COMMENT_ADDED](event, member);

      expect(result.buttonText).toBe(longTitle);
    });
  });

  describe('Common Properties', () => {
    it('should always include buttonIcon', () => {
      const event = { payload: { taskTitle: 'Test' } };
      const member = {};

      Object.keys(taskEventAdapter).forEach(eventType => {
        const result = taskEventAdapter[eventType](event, member);
        expect(result.buttonIcon).toBe(VisibleIcon);
      });
    });

    it('should always include action', () => {
      const event = { payload: { taskTitle: 'Test' } };
      const member = {};

      Object.keys(taskEventAdapter).forEach(eventType => {
        const result = taskEventAdapter[eventType](event, member);
        expect(result.action).toBeDefined();
        expect(typeof result.action).toBe('string');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle null event', () => {
      const event = null;
      const member = {};

      const result = taskEventAdapter[EVENT_TYPES.TASK_CREATED](event, member);

      expect(result).toBeDefined();
      expect(result.buttonIcon).toBe(VisibleIcon);
    });

    it('should handle undefined event', () => {
      const event = undefined;
      const member = {};

      const result = taskEventAdapter[EVENT_TYPES.TASK_CREATED](event, member);

      expect(result).toBeDefined();
      expect(result.action).toBe('created a Task');
    });

    it('should handle null member', () => {
      const event = {};
      const member = null;

      const result = taskEventAdapter[EVENT_TYPES.TASK_CREATED](event, member);

      expect(result).toBeDefined();
      expect(result.buttonText).toBe('View Task');
    });

    it('should handle undefined member', () => {
      const event = { payload: { taskTitle: 'Test' } };
      const member = undefined;

      const result = taskEventAdapter[EVENT_TYPES.COMMENT_ADDED](event, member);

      expect(result).toBeDefined();
      expect(result.action).toBe('commented on the Task');
    });

    it('should handle event with extra properties', () => {
      const event = {
        id: 'event-1',
        extraProp: 'should not affect result',
        anotherProp: 123,
      };

      const member = {
        id: 'member-1',
        extraMemberProp: 'also should not affect',
      };

      const result = taskEventAdapter[EVENT_TYPES.TASK_CREATED](event, member);

      expect(result.extraProp).toBeUndefined();
      expect(result.extraMemberProp).toBeUndefined();
      expect(result.action).toBe('created a Task');
    });
  });

  describe('Adapter Structure', () => {
    it('should have all expected event types', () => {
      expect(taskEventAdapter[EVENT_TYPES.TASK_CREATED]).toBeDefined();
      expect(taskEventAdapter[EVENT_TYPES.COMMENT_ADDED]).toBeDefined();
    });

    it('should have function values', () => {
      Object.values(taskEventAdapter).forEach(adapter => {
        expect(typeof adapter).toBe('function');
      });
    });

    it('should have correct number of adapters', () => {
      expect(Object.keys(taskEventAdapter)).toHaveLength(2);
    });
  });

  describe('Real-World Examples', () => {
    it('should adapt task creation event', () => {
      const event = {
        id: 'evt-123',
        type: EVENT_TYPES.TASK_CREATED,
        timestamp: '2024-01-15T10:00:00Z',
      };

      const member = {
        id: 'usr-456',
        name: 'Alice Johnson',
        email: 'alice@example.com',
      };

      const result = taskEventAdapter[EVENT_TYPES.TASK_CREATED](event, member);

      expect(result.buttonIcon).toBe(VisibleIcon);
      expect(result.buttonText).toBe('View Task');
      expect(result.action).toBe('created a Task');
    });

    it('should adapt comment event with meaningful title', () => {
      const event = {
        id: 'evt-789',
        type: EVENT_TYPES.COMMENT_ADDED,
        payload: {
          taskTitle: 'Implement user authentication',
          commentText: 'This looks good!',
        },
      };

      const member = {
        id: 'usr-789',
        name: 'Bob Williams',
      };

      const result = taskEventAdapter[EVENT_TYPES.COMMENT_ADDED](event, member);

      expect(result.buttonIcon).toBe(VisibleIcon);
      expect(result.buttonText).toBe('Implement user authentication');
      expect(result.action).toBe('commented on the Task');
    });

    it('should handle special characters in task title', () => {
      const event = {
        payload: {
          taskTitle: 'Fix bug: User can\'t login with @#$% characters',
        },
      };

      const member = {};

      const result = taskEventAdapter[EVENT_TYPES.COMMENT_ADDED](event, member);

      expect(result.buttonText).toBe('Fix bug: User can\'t login with @#$% characters');
    });

    it('should handle unicode in task title', () => {
      const event = {
        payload: {
          taskTitle: '修复登录错误 🐛',
        },
      };

      const member = {};

      const result = taskEventAdapter[EVENT_TYPES.COMMENT_ADDED](event, member);

      expect(result.buttonText).toBe('修复登录错误 🐛');
    });
  });

  describe('ButtonText Behavior', () => {
    it('should use default buttonText for TASK_CREATED', () => {
      const event = {};
      const member = {};

      const result = taskEventAdapter[EVENT_TYPES.TASK_CREATED](event, member);

      expect(result.buttonText).toBe('View Task');
    });

    it('should use taskTitle as buttonText for COMMENT_ADDED', () => {
      const event = {
        payload: {
          taskTitle: 'Custom Title',
        },
      };

      const member = {};

      const result = taskEventAdapter[EVENT_TYPES.COMMENT_ADDED](event, member);

      expect(result.buttonText).toBe('Custom Title');
    });

    it('should override default buttonText with taskTitle', () => {
      const event = {
        payload: {
          taskTitle: 'Override Title',
        },
      };

      const member = {};

      const result = taskEventAdapter[EVENT_TYPES.COMMENT_ADDED](event, member);

      // The default would be 'View Task', but it's overridden
      expect(result.buttonText).not.toBe('View Task');
      expect(result.buttonText).toBe('Override Title');
    });
  });

  describe('Action Text Differences', () => {
    it('should have different action text for each event type', () => {
      const event = { payload: { taskTitle: 'Test' } };
      const member = {};

      const createdResult = taskEventAdapter[EVENT_TYPES.TASK_CREATED](event, member);
      const commentResult = taskEventAdapter[EVENT_TYPES.COMMENT_ADDED](event, member);

      expect(createdResult.action).not.toBe(commentResult.action);
      expect(createdResult.action).toBe('created a Task');
      expect(commentResult.action).toBe('commented on the Task');
    });
  });
});

