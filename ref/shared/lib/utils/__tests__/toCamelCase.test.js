// ===================================================================
// Unit Tests for toCamelCase Utility
// Coverage Target: 100%
// Phase 1 - Utilities (MEDIUM IMPACT - 52 lines, string transformation)
// Risk: LOW (Pure function, no side effects)
// ===================================================================

import { describe, it, expect } from 'vitest';
import { toCamelCase } from '../toCamelCase';

describe('toCamelCase Utility', () => {
  describe('Basic Transformations', () => {
    it('should convert space-separated string to camelCase', () => {
      expect(toCamelCase('Multistyle Text')).toBe('multistyleText');
    });

    it('should convert PascalCase to camelCase', () => {
      expect(toCamelCase('MultistyleText')).toBe('multistyleText');
    });

    it('should convert hyphen-separated string to camelCase', () => {
      expect(toCamelCase('Multistyle-Text')).toBe('multistyleText');
    });

    it('should convert lowercase hyphen-separated string to camelCase', () => {
      expect(toCamelCase('multistyle-text')).toBe('multistyleText');
    });

    it('should convert snake_case to camelCase', () => {
      expect(toCamelCase('multistyle_text')).toBe('multistyleText');
    });

    it('should convert single word to lowercase', () => {
      expect(toCamelCase('Text')).toBe('text');
    });

    it('should convert acronym to lowercase', () => {
      expect(toCamelCase('JSON')).toBe('json');
    });
  });

  describe('Empty and Null Inputs', () => {
    it('should return empty string for null', () => {
      expect(toCamelCase(null)).toBe('');
    });

    it('should return empty string for undefined', () => {
      expect(toCamelCase(undefined)).toBe('');
    });

    it('should return empty string for empty string', () => {
      expect(toCamelCase('')).toBe('');
    });

    it('should return empty string for whitespace only', () => {
      expect(toCamelCase('   ')).toBe('');
    });
  });

  describe('Multiple Word Conversions', () => {
    it('should handle three words with spaces', () => {
      expect(toCamelCase('First Second Third')).toBe('firstSecondThird');
    });

    it('should handle three words with hyphens', () => {
      expect(toCamelCase('first-second-third')).toBe('firstSecondThird');
    });

    it('should handle three words with underscores', () => {
      expect(toCamelCase('first_second_third')).toBe('firstSecondThird');
    });

    it('should handle mixed separators', () => {
      expect(toCamelCase('first-second_third')).toBe('firstSecondThird');
    });

    it('should handle many words', () => {
      expect(toCamelCase('one two three four five')).toBe('oneTwoThreeFourFive');
    });
  });

  describe('PascalCase to camelCase', () => {
    it('should convert simple PascalCase', () => {
      expect(toCamelCase('UserProfile')).toBe('userProfile');
    });

    it('should convert multiple capital letters', () => {
      expect(toCamelCase('XMLParser')).toBe('xmlParser');
    });

    it('should convert consecutive capitals', () => {
      expect(toCamelCase('HTTPSConnection')).toBe('httpsConnection');
    });

    it('should handle single capital letter', () => {
      expect(toCamelCase('A')).toBe('a');
    });

    it('should handle all capitals', () => {
      expect(toCamelCase('HTML')).toBe('html');
    });
  });

  describe('Special Characters', () => {
    it('should remove punctuation', () => {
      expect(toCamelCase('Hello, World!')).toBe('helloWorld');
    });

    it('should remove special characters', () => {
      expect(toCamelCase('User@Profile#Name')).toBe('userProfileName');
    });

    it('should handle parentheses', () => {
      expect(toCamelCase('User (Profile)')).toBe('userProfile');
    });

    it('should handle brackets', () => {
      expect(toCamelCase('User [Profile]')).toBe('userProfile');
    });

    it('should handle dots', () => {
      expect(toCamelCase('User.Profile.Name')).toBe('userProfileName');
    });

    it('should handle commas', () => {
      expect(toCamelCase('First, Second, Third')).toBe('firstSecondThird');
    });
  });

  describe('Mixed Case Inputs', () => {
    it('should handle mixed case with spaces', () => {
      // Note: Function doesn't split on internal capitals when no separator present
      expect(toCamelCase('MiXeD CaSe StRiNg')).toBe('miXeDCaSeStRiNg');
    });

    it('should handle camelCase input', () => {
      expect(toCamelCase('alreadyCamelCase')).toBe('alreadyCamelCase');
    });

    it('should handle mixed separators and cases', () => {
      expect(toCamelCase('User_Profile-Name Text')).toBe('userProfileNameText');
    });
  });

  describe('Numbers in String', () => {
    it('should handle numbers at end', () => {
      expect(toCamelCase('User Profile 123')).toBe('userProfile123');
    });

    it('should handle numbers in middle', () => {
      expect(toCamelCase('User 123 Profile')).toBe('user123Profile');
    });

    it('should handle numbers at start', () => {
      expect(toCamelCase('123 User Profile')).toBe('123UserProfile');
    });

    it('should handle only numbers', () => {
      expect(toCamelCase('123')).toBe('123');
    });

    it('should handle mixed numbers and letters', () => {
      // Note: Numbers don't trigger word boundaries, so it stays lowercase
      expect(toCamelCase('User1Profile2Name3')).toBe('user1profile2name3');
    });
  });

  describe('Multiple Separators', () => {
    it('should handle multiple spaces', () => {
      expect(toCamelCase('User    Profile')).toBe('userProfile');
    });

    it('should handle multiple hyphens', () => {
      expect(toCamelCase('User---Profile')).toBe('userProfile');
    });

    it('should handle multiple underscores', () => {
      expect(toCamelCase('User___Profile')).toBe('userProfile');
    });

    it('should handle mixed multiple separators', () => {
      expect(toCamelCase('User--__  Profile')).toBe('userProfile');
    });
  });

  describe('Leading and Trailing Separators', () => {
    it('should handle leading spaces', () => {
      expect(toCamelCase('   User Profile')).toBe('userProfile');
    });

    it('should handle trailing spaces', () => {
      expect(toCamelCase('User Profile   ')).toBe('userProfile');
    });

    it('should handle leading hyphens', () => {
      expect(toCamelCase('---User Profile')).toBe('userProfile');
    });

    it('should handle trailing hyphens', () => {
      expect(toCamelCase('User Profile---')).toBe('userProfile');
    });

    it('should handle leading underscores', () => {
      expect(toCamelCase('___User Profile')).toBe('userProfile');
    });

    it('should handle trailing underscores', () => {
      expect(toCamelCase('User Profile___')).toBe('userProfile');
    });
  });

  describe('Real-World Examples', () => {
    it('should convert component name', () => {
      expect(toCamelCase('User Profile Component')).toBe('userProfileComponent');
    });

    it('should convert API endpoint', () => {
      expect(toCamelCase('get-user-profile')).toBe('getUserProfile');
    });

    it('should convert database field', () => {
      expect(toCamelCase('user_profile_id')).toBe('userProfileId');
    });

    it('should convert CSS class', () => {
      expect(toCamelCase('btn-primary-large')).toBe('btnPrimaryLarge');
    });

    it('should convert file name', () => {
      expect(toCamelCase('UserProfileComponent.js')).toBe('userProfileComponentJs');
    });

    it('should convert constant name', () => {
      expect(toCamelCase('MAX_USER_COUNT')).toBe('maxUserCount');
    });
  });

  describe('Edge Cases', () => {
    it('should handle single character', () => {
      expect(toCamelCase('a')).toBe('a');
    });

    it('should handle single capital character', () => {
      expect(toCamelCase('A')).toBe('a');
    });

    it('should handle two characters', () => {
      expect(toCamelCase('AB')).toBe('ab');
    });

    it('should handle only separators', () => {
      expect(toCamelCase('---___   ')).toBe('');
    });

    it('should handle only special characters', () => {
      expect(toCamelCase('@#$%^&*()')).toBe('');
    });

    it('should handle very long string', () => {
      const longString = 'word '.repeat(100).trim();
      const result = toCamelCase(longString);
      expect(result).toMatch(/^word(Word)*$/);
      expect(result.startsWith('word')).toBe(true);
    });

    it('should handle unicode characters', () => {
      // Note: \w regex doesn't match Cyrillic, so they're removed
      expect(toCamelCase('User Профиль')).toBe('user');
    });

    it('should handle emoji (removed as special chars)', () => {
      expect(toCamelCase('User 😀 Profile')).toBe('userProfile');
    });
  });

  describe('Consistency Tests', () => {
    it('should be idempotent for already camelCase strings', () => {
      const input = 'alreadyCamelCase';
      expect(toCamelCase(input)).toBe(input);
      expect(toCamelCase(toCamelCase(input))).toBe(input);
    });

    it('should produce same result for equivalent inputs', () => {
      const inputs = [
        'User Profile',
        'user-profile',
        'user_profile',
        'UserProfile',
        'USER_PROFILE',
        'user profile',
      ];

      const results = inputs.map(toCamelCase);
      const firstResult = results[0];

      results.forEach(result => {
        expect(result).toBe(firstResult);
      });
    });

    it('should handle repeated transformations', () => {
      let result = 'User Profile';
      for (let i = 0; i < 10; i++) {
        result = toCamelCase(result);
      }
      expect(result).toBe('userProfile');
    });
  });
});

