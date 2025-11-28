// ===================================================================
// Unit Tests for toCamelCase Utility
// Coverage Target: 95%+
// Week 3 - Day 3
// ===================================================================

import { describe, it, expect } from 'vitest';
import { toCamelCase } from './toCamelCase';

describe('toCamelCase Utility', () => {
  describe('Basic Conversions', () => {
    it('should convert space-separated words to camelCase', () => {
      expect(toCamelCase('Multistyle Text')).toBe('multistyleText');
      expect(toCamelCase('hello world')).toBe('helloWorld');
      expect(toCamelCase('my variable name')).toBe('myVariableName');
    });

    it('should convert PascalCase to camelCase', () => {
      expect(toCamelCase('MultistyleText')).toBe('multistyleText');
      expect(toCamelCase('HelloWorld')).toBe('helloWorld');
      expect(toCamelCase('UserProfile')).toBe('userProfile');
    });

    it('should convert kebab-case to camelCase', () => {
      expect(toCamelCase('multistyle-text')).toBe('multistyleText');
      expect(toCamelCase('hello-world')).toBe('helloWorld');
      expect(toCamelCase('user-profile-name')).toBe('userProfileName');
    });

    it('should convert snake_case to camelCase', () => {
      expect(toCamelCase('multistyle_text')).toBe('multistyleText');
      expect(toCamelCase('hello_world')).toBe('helloWorld');
      expect(toCamelCase('user_profile_name')).toBe('userProfileName');
    });
  });

  describe('Special Cases', () => {
    it('should handle single word', () => {
      expect(toCamelCase('Text')).toBe('text');
      expect(toCamelCase('hello')).toBe('hello');
      expect(toCamelCase('BUTTON')).toBe('button');
    });

    it('should handle acronyms', () => {
      expect(toCamelCase('JSON')).toBe('json');
      expect(toCamelCase('HTML')).toBe('html');
      expect(toCamelCase('XMLParser')).toBe('xmlParser');
    });

    it('should handle mixed formats', () => {
      expect(toCamelCase('user-Profile_Name')).toBe('userProfileName');
      expect(toCamelCase('get_User-Id')).toBe('getUserId');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string', () => {
      expect(toCamelCase('')).toBe('');
    });

    it('should handle null/undefined', () => {
      expect(toCamelCase(null)).toBe('');
      expect(toCamelCase(undefined)).toBe('');
    });

    it('should handle multiple consecutive separators', () => {
      expect(toCamelCase('hello---world')).toBe('helloWorld');
      expect(toCamelCase('user___name')).toBe('userName');
      expect(toCamelCase('my   text')).toBe('myText');
    });

    it('should handle leading/trailing spaces', () => {
      expect(toCamelCase('  hello world  ')).toBe('helloWorld');
      expect(toCamelCase('   Text   ')).toBe('text');
    });
  });
});

