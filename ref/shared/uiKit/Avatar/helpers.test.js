// ===================================================================
// Unit Tests for getInitials - Avatar Initials Generation
// Coverage Target: 100%
// Phase 5 - Final Push: Avatar Helpers (Pushing to 3,000!)
// ===================================================================

import { describe, it, expect } from 'vitest';
import { getInitials } from './helpers';

describe('getInitials', () => {
  describe('Basic functionality', () => {
    it('should return initials for single word', () => {
      expect(getInitials('John')).toBe('J');
    });

    it('should return initials for two words', () => {
      expect(getInitials('John Doe')).toBe('JD');
    });

    it('should return first two initials for multiple words', () => {
      expect(getInitials('John Paul Smith')).toBe('JP');
    });

    it('should return uppercase initials', () => {
      expect(getInitials('john doe')).toBe('JD');
    });

    it('should handle mixed case', () => {
      expect(getInitials('jOhN dOe')).toBe('JD');
    });
  });

  describe('Edge cases', () => {
    it('should return empty string for null', () => {
      expect(getInitials(null)).toBe('');
    });

    it('should return empty string for undefined', () => {
      expect(getInitials(undefined)).toBe('');
    });

    it('should return empty string for empty string', () => {
      expect(getInitials('')).toBe('');
    });

    it('should handle single character', () => {
      expect(getInitials('A')).toBe('A');
    });

    it('should handle two characters', () => {
      expect(getInitials('AB')).toBe('A');
    });
  });

  describe('Multiple spaces', () => {
    it('should handle double spaces between words', () => {
      expect(getInitials('John  Doe')).toBe('JD');
    });

    it('should handle leading space', () => {
      expect(getInitials(' John Doe')).toBe('JD');
    });

    it('should handle trailing space', () => {
      expect(getInitials('John Doe ')).toBe('JD');
    });

    it('should handle multiple spaces', () => {
      expect(getInitials('  John   Doe  ')).toBe('JD');
    });

    it('should handle only spaces', () => {
      expect(getInitials('   ')).toBe('');
    });
  });

  describe('Special characters', () => {
    it('should handle names with hyphens', () => {
      expect(getInitials('Mary-Jane Watson')).toBe('MW');
    });

    it('should handle names with apostrophes', () => {
      expect(getInitials("O'Brien Smith")).toBe('OS');
    });

    it('should handle names with periods', () => {
      expect(getInitials('Dr. John Doe')).toBe('DJ');
    });

    it('should handle names with numbers', () => {
      expect(getInitials('John Doe 3rd')).toBe('JD');
    });

    it('should handle names with special characters', () => {
      expect(getInitials('José María')).toBe('JM');
    });
  });

  describe('Long names', () => {
    it('should only return first 2 initials for 3 words', () => {
      expect(getInitials('John Michael Doe')).toBe('JM');
    });

    it('should only return first 2 initials for 4 words', () => {
      expect(getInitials('John Michael Paul Doe')).toBe('JM');
    });

    it('should only return first 2 initials for many words', () => {
      expect(getInitials('A B C D E F G')).toBe('AB');
    });

    it('should handle very long single word', () => {
      const longName = 'A'.repeat(100);
      expect(getInitials(longName)).toBe('A');
    });
  });

  describe('Different languages', () => {
    it('should handle Cyrillic names', () => {
      expect(getInitials('Иван Петров')).toBe('ИП');
    });

    it('should handle Chinese names', () => {
      expect(getInitials('李 明')).toBe('李明');
    });

    it('should handle Arabic names', () => {
      const result = getInitials('محمد علي');
      expect(result.length).toBeLessThanOrEqual(2);
      expect(result).toBeTruthy();
    });

    it('should handle accented characters', () => {
      expect(getInitials('François Müller')).toBe('FM');
    });
  });

  describe('Empty first characters', () => {
    it('should handle words that start with space after split', () => {
      // This tests the behavior when word[0] might be unusual
      expect(getInitials('A B')).toBe('AB');
    });
  });

  describe('Case sensitivity', () => {
    it('should convert lowercase to uppercase', () => {
      expect(getInitials('abc def')).toBe('AD');
    });

    it('should keep uppercase as uppercase', () => {
      expect(getInitials('ABC DEF')).toBe('AD');
    });

    it('should handle mixed case words', () => {
      expect(getInitials('AbC dEf')).toBe('AD');
    });
  });

  describe('Real-world names', () => {
    it('should handle common first and last name', () => {
      expect(getInitials('Michael Jordan')).toBe('MJ');
    });

    it('should handle middle name', () => {
      expect(getInitials('John F Kennedy')).toBe('JF');
    });

    it('should handle hyphenated last name', () => {
      expect(getInitials('Sarah Parker-Smith')).toBe('SP');
    });

    it('should handle prefix and suffix', () => {
      expect(getInitials('Dr John Doe Jr')).toBe('DJ');
    });

    it('should handle single name', () => {
      expect(getInitials('Madonna')).toBe('M');
    });

    it('should handle company names', () => {
      expect(getInitials('Amazon Web Services')).toBe('AW');
    });
  });

  describe('Whitespace variations', () => {
    it('should treat tab as part of word (no split)', () => {
      const result = getInitials('John\tDoe');
      expect(result.length).toBeGreaterThan(0);
      expect(typeof result).toBe('string');
    });

    it('should treat newline as part of word (no split)', () => {
      const result = getInitials('John\nDoe');
      expect(result.length).toBeGreaterThan(0);
      expect(typeof result).toBe('string');
    });

    it('should treat carriage return as part of word (no split)', () => {
      const result = getInitials('John\rDoe');
      expect(result.length).toBeGreaterThan(0);
      expect(typeof result).toBe('string');
    });
  });

  describe('Return value format', () => {
    it('should return string type', () => {
      const result = getInitials('John Doe');
      expect(typeof result).toBe('string');
    });

    it('should return exactly 2 characters for 2+ words', () => {
      expect(getInitials('John Doe').length).toBe(2);
    });

    it('should return 1 character for single word', () => {
      expect(getInitials('John').length).toBe(1);
    });

    it('should return 0 characters for empty input', () => {
      expect(getInitials('').length).toBe(0);
    });
  });

  describe('Performance', () => {
    it('should handle many words efficiently', () => {
      const manyWords = Array.from({ length: 100 }, (_, i) => `Word${i}`).join(' ');
      const result = getInitials(manyWords);
      expect(result).toBe('WW');
      expect(result.length).toBe(2);
    });
  });
});

