// ===================================================================
// Unit Tests for enrichComment Helper
// Coverage Target: 100%
// Phase 1 - Business Logic Helpers
// Risk: LOW (pure function, recursive logic)
// ===================================================================

import { describe, it, expect } from 'vitest';
import { enrichComment } from '../enrichComment';

describe('enrichComment Helper', () => {
  describe('Basic Functionality', () => {
    it('should enrich comment with member data', () => {
      const comment = {
        id: 'comment-1',
        memberId: 'member-1',
        text: 'Great work!',
        createdAt: '2024-01-01',
      };

      const members = [
        { id: 'member-1', name: 'John Doe', avatar: 'avatar1.jpg' },
        { id: 'member-2', name: 'Jane Smith', avatar: 'avatar2.jpg' },
      ];

      const allComments = [comment];

      const result = enrichComment(comment, members, allComments);

      expect(result).toEqual({
        id: 'comment-1',
        memberId: 'member-1',
        text: 'Great work!',
        createdAt: '2024-01-01',
        member: { id: 'member-1', name: 'John Doe', avatar: 'avatar1.jpg' },
        replies: [],
      });
    });

    it('should enrich comment with replies', () => {
      const parentComment = {
        id: 'comment-1',
        memberId: 'member-1',
        text: 'Great work!',
      };

      const replyComment = {
        id: 'comment-2',
        memberId: 'member-2',
        parentId: 'comment-1',
        text: 'Thank you!',
      };

      const members = [
        { id: 'member-1', name: 'John Doe' },
        { id: 'member-2', name: 'Jane Smith' },
      ];

      const allComments = [parentComment, replyComment];

      const result = enrichComment(parentComment, members, allComments);

      expect(result.replies).toHaveLength(1);
      expect(result.replies[0]).toEqual({
        id: 'comment-2',
        memberId: 'member-2',
        parentId: 'comment-1',
        text: 'Thank you!',
        member: { id: 'member-2', name: 'Jane Smith' },
        replies: [],
      });
    });

    it('should handle nested replies (recursive)', () => {
      const comment1 = {
        id: 'comment-1',
        memberId: 'member-1',
        text: 'Level 1',
      };

      const comment2 = {
        id: 'comment-2',
        memberId: 'member-2',
        parentId: 'comment-1',
        text: 'Level 2',
      };

      const comment3 = {
        id: 'comment-3',
        memberId: 'member-3',
        parentId: 'comment-2',
        text: 'Level 3',
      };

      const members = [
        { id: 'member-1', name: 'User 1' },
        { id: 'member-2', name: 'User 2' },
        { id: 'member-3', name: 'User 3' },
      ];

      const allComments = [comment1, comment2, comment3];

      const result = enrichComment(comment1, members, allComments);

      expect(result.replies).toHaveLength(1);
      expect(result.replies[0].text).toBe('Level 2');
      expect(result.replies[0].replies).toHaveLength(1);
      expect(result.replies[0].replies[0].text).toBe('Level 3');
      expect(result.replies[0].replies[0].member.name).toBe('User 3');
    });
  });

  describe('Edge Cases - Null/Undefined', () => {
    it('should return null when comment is null', () => {
      const members = [{ id: 'member-1', name: 'John Doe' }];
      const allComments = [];

      const result = enrichComment(null, members, allComments);

      expect(result).toBeNull();
    });

    it('should return null when comment is undefined', () => {
      const members = [{ id: 'member-1', name: 'John Doe' }];
      const allComments = [];

      const result = enrichComment(undefined, members, allComments);

      expect(result).toBeNull();
    });

    it('should return null when comment has no memberId', () => {
      const comment = {
        id: 'comment-1',
        text: 'Great work!',
      };

      const members = [{ id: 'member-1', name: 'John Doe' }];
      const allComments = [comment];

      const result = enrichComment(comment, members, allComments);

      expect(result).toBeNull();
    });

    it('should return null when members is null', () => {
      const comment = {
        id: 'comment-1',
        memberId: 'member-1',
        text: 'Great work!',
      };

      const result = enrichComment(comment, null, []);

      expect(result).toBeNull();
    });

    it('should return null when members is undefined', () => {
      const comment = {
        id: 'comment-1',
        memberId: 'member-1',
        text: 'Great work!',
      };

      const result = enrichComment(comment, undefined, []);

      expect(result).toBeNull();
    });

    it('should return null when member not found', () => {
      const comment = {
        id: 'comment-1',
        memberId: 'member-999',
        text: 'Great work!',
      };

      const members = [
        { id: 'member-1', name: 'John Doe' },
        { id: 'member-2', name: 'Jane Smith' },
      ];

      const allComments = [comment];

      const result = enrichComment(comment, members, allComments);

      expect(result).toBeNull();
    });
  });

  describe('Multiple Replies', () => {
    it('should handle multiple replies to same comment', () => {
      const parentComment = {
        id: 'comment-1',
        memberId: 'member-1',
        text: 'Question?',
      };

      const reply1 = {
        id: 'comment-2',
        memberId: 'member-2',
        parentId: 'comment-1',
        text: 'Answer 1',
      };

      const reply2 = {
        id: 'comment-3',
        memberId: 'member-3',
        parentId: 'comment-1',
        text: 'Answer 2',
      };

      const reply3 = {
        id: 'comment-4',
        memberId: 'member-2',
        parentId: 'comment-1',
        text: 'Answer 3',
      };

      const members = [
        { id: 'member-1', name: 'User 1' },
        { id: 'member-2', name: 'User 2' },
        { id: 'member-3', name: 'User 3' },
      ];

      const allComments = [parentComment, reply1, reply2, reply3];

      const result = enrichComment(parentComment, members, allComments);

      expect(result.replies).toHaveLength(3);
      expect(result.replies[0].text).toBe('Answer 1');
      expect(result.replies[1].text).toBe('Answer 2');
      expect(result.replies[2].text).toBe('Answer 3');
    });

    it('should filter out replies with invalid members', () => {
      const parentComment = {
        id: 'comment-1',
        memberId: 'member-1',
        text: 'Question?',
      };

      const validReply = {
        id: 'comment-2',
        memberId: 'member-2',
        parentId: 'comment-1',
        text: 'Valid reply',
      };

      const invalidReply = {
        id: 'comment-3',
        memberId: 'member-999',
        parentId: 'comment-1',
        text: 'Invalid reply',
      };

      const members = [
        { id: 'member-1', name: 'User 1' },
        { id: 'member-2', name: 'User 2' },
      ];

      const allComments = [parentComment, validReply, invalidReply];

      const result = enrichComment(parentComment, members, allComments);

      expect(result.replies).toHaveLength(1);
      expect(result.replies[0].text).toBe('Valid reply');
    });
  });

  describe('Immutability', () => {
    it('should not mutate original comment', () => {
      const comment = {
        id: 'comment-1',
        memberId: 'member-1',
        text: 'Great work!',
      };

      const originalComment = { ...comment };

      const members = [{ id: 'member-1', name: 'John Doe' }];
      const allComments = [comment];

      enrichComment(comment, members, allComments);

      expect(comment).toEqual(originalComment);
      expect(comment.member).toBeUndefined();
      expect(comment.replies).toBeUndefined();
    });

    it('should not mutate members array', () => {
      const comment = {
        id: 'comment-1',
        memberId: 'member-1',
        text: 'Great work!',
      };

      const members = [
        { id: 'member-1', name: 'John Doe' },
        { id: 'member-2', name: 'Jane Smith' },
      ];

      const originalMembers = JSON.parse(JSON.stringify(members));
      const allComments = [comment];

      enrichComment(comment, members, allComments);

      expect(members).toEqual(originalMembers);
    });

    it('should not mutate allComments array', () => {
      const comment = {
        id: 'comment-1',
        memberId: 'member-1',
        text: 'Great work!',
      };

      const members = [{ id: 'member-1', name: 'John Doe' }];
      const allComments = [comment];
      const originalComments = JSON.parse(JSON.stringify(allComments));

      enrichComment(comment, members, allComments);

      expect(allComments).toEqual(originalComments);
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle deeply nested comment threads', () => {
      const comments = [];
      const members = [];

      // Create 5 levels of nesting
      for (let i = 1; i <= 5; i++) {
        comments.push({
          id: `comment-${i}`,
          memberId: `member-${i}`,
          parentId: i > 1 ? `comment-${i - 1}` : undefined,
          text: `Level ${i}`,
        });

        members.push({
          id: `member-${i}`,
          name: `User ${i}`,
        });
      }

      const result = enrichComment(comments[0], members, comments);

      // Traverse to level 5
      let current = result;
      for (let i = 1; i <= 4; i++) {
        expect(current.text).toBe(`Level ${i}`);
        expect(current.replies).toHaveLength(1);
        current = current.replies[0];
      }
      expect(current.text).toBe('Level 5');
      expect(current.replies).toHaveLength(0);
    });

    it('should preserve all comment properties', () => {
      const comment = {
        id: 'comment-1',
        memberId: 'member-1',
        text: 'Great work!',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-02',
        likes: 5,
        metadata: { edited: true },
      };

      const members = [{ id: 'member-1', name: 'John Doe' }];
      const allComments = [comment];

      const result = enrichComment(comment, members, allComments);

      expect(result.id).toBe('comment-1');
      expect(result.text).toBe('Great work!');
      expect(result.createdAt).toBe('2024-01-01');
      expect(result.updatedAt).toBe('2024-01-02');
      expect(result.likes).toBe(5);
      expect(result.metadata).toEqual({ edited: true });
    });
  });
});

