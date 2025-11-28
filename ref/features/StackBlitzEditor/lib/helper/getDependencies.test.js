// ===================================================================
// Unit Tests for getDependencies
// CRITICAL BUSINESS LOGIC - StackBlitz Editor System
// Week 2, Day 1 - Part 1 (20 tests)
// ===================================================================

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getDependencies } from './getDependencies';

describe('getDependencies - StackBlitz Dependencies Parser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Spy on console.error to verify error handling
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  // ===================================================================
  // PART 1: Valid package.json Parsing (8 tests)
  // ===================================================================

  describe('Valid package.json Parsing', () => {
    it('should parse dependencies from package.json by name', () => {
      const codes = [
        {
          name: 'package.json',
          content: JSON.stringify({
            dependencies: {
              react: '^18.0.0',
              'react-dom': '^18.0.0',
            },
          }),
        },
      ];

      const result = getDependencies(codes);

      expect(result).toEqual({
        react: '^18.0.0',
        'react-dom': '^18.0.0',
      });
    });

    it('should parse dependencies from package-json pattern', () => {
      const codes = [
        {
          name: 'src/configs/package-json',
          content: JSON.stringify({
            dependencies: {
              redux: '^4.2.0',
            },
          }),
        },
      ];

      const result = getDependencies(codes);

      expect(result).toEqual({
        redux: '^4.2.0',
      });
    });

    it('should handle empty dependencies object', () => {
      const codes = [
        {
          name: 'package.json',
          content: JSON.stringify({
            dependencies: {},
          }),
        },
      ];

      const result = getDependencies(codes);

      expect(result).toEqual({});
    });

    it('should handle multiple dependencies', () => {
      const codes = [
        {
          name: 'package.json',
          content: JSON.stringify({
            dependencies: {
              react: '^18.0.0',
              'react-dom': '^18.0.0',
              'react-redux': '^8.0.0',
              '@reduxjs/toolkit': '^1.9.0',
              axios: '^1.0.0',
            },
          }),
        },
      ];

      const result = getDependencies(codes);

      expect(result).toHaveProperty('react');
      expect(result).toHaveProperty('react-dom');
      expect(result).toHaveProperty('react-redux');
      expect(result).toHaveProperty('@reduxjs/toolkit');
      expect(result).toHaveProperty('axios');
      expect(Object.keys(result)).toHaveLength(5);
    });

    it('should handle scoped packages', () => {
      const codes = [
        {
          name: 'package.json',
          content: JSON.stringify({
            dependencies: {
              '@babel/core': '^7.0.0',
              '@testing-library/react': '^13.0.0',
              '@types/node': '^18.0.0',
            },
          }),
        },
      ];

      const result = getDependencies(codes);

      expect(result['@babel/core']).toBe('^7.0.0');
      expect(result['@testing-library/react']).toBe('^13.0.0');
      expect(result['@types/node']).toBe('^18.0.0');
    });

    it('should handle various version formats', () => {
      const codes = [
        {
          name: 'package.json',
          content: JSON.stringify({
            dependencies: {
              'exact-version': '1.0.0',
              'caret-version': '^1.0.0',
              'tilde-version': '~1.0.0',
              'range-version': '>=1.0.0 <2.0.0',
              'latest-version': 'latest',
            },
          }),
        },
      ];

      const result = getDependencies(codes);

      expect(result['exact-version']).toBe('1.0.0');
      expect(result['caret-version']).toBe('^1.0.0');
      expect(result['tilde-version']).toBe('~1.0.0');
      expect(result['range-version']).toBe('>=1.0.0 <2.0.0');
      expect(result['latest-version']).toBe('latest');
    });

    it('should find package.json among multiple files', () => {
      const codes = [
        { name: 'index.js', content: 'console.log("hello")' },
        { name: 'App.jsx', content: '<div>App</div>' },
        {
          name: 'package.json',
          content: JSON.stringify({
            dependencies: { lodash: '^4.17.21' },
          }),
        },
        { name: 'README.md', content: '# Project' },
      ];

      const result = getDependencies(codes);

      expect(result).toEqual({ lodash: '^4.17.21' });
    });

    it('should handle package.json with other properties', () => {
      const codes = [
        {
          name: 'package.json',
          content: JSON.stringify({
            name: 'my-app',
            version: '1.0.0',
            description: 'My awesome app',
            dependencies: {
              vue: '^3.0.0',
            },
            devDependencies: {
              vite: '^4.0.0',
            },
          }),
        },
      ];

      const result = getDependencies(codes);

      expect(result).toEqual({ vue: '^3.0.0' });
      expect(result).not.toHaveProperty('vite'); // Should not include devDependencies
    });
  });

  // ===================================================================
  // PART 2: Missing Dependencies Handling (4 tests)
  // ===================================================================

  describe('Missing Dependencies Handling', () => {
    it('should return empty object if no dependencies field', () => {
      const codes = [
        {
          name: 'package.json',
          content: JSON.stringify({
            name: 'my-app',
            version: '1.0.0',
          }),
        },
      ];

      const result = getDependencies(codes);

      expect(result).toEqual({});
    });

    it('should return empty object if dependencies is null', () => {
      const codes = [
        {
          name: 'package.json',
          content: JSON.stringify({
            dependencies: null,
          }),
        },
      ];

      const result = getDependencies(codes);

      expect(result).toEqual({});
    });

    it('should return empty object if dependencies is undefined', () => {
      const codes = [
        {
          name: 'package.json',
          content: JSON.stringify({
            name: 'app',
          }),
        },
      ];

      const result = getDependencies(codes);

      expect(result).toEqual({});
    });

    it('should return empty object if package.json not found', () => {
      const codes = [
        { name: 'index.js', content: 'console.log("hello")' },
        { name: 'App.jsx', content: '<div>App</div>' },
      ];

      const result = getDependencies(codes);

      expect(result).toEqual({});
    });
  });

  // ===================================================================
  // PART 3: Error Handling (5 tests)
  // ===================================================================

  describe('Error Handling', () => {
    it('should handle invalid JSON', () => {
      const codes = [
        {
          name: 'package.json',
          content: '{ invalid json }',
        },
      ];

      const result = getDependencies(codes);

      expect(result).toEqual({});
      expect(console.error).toHaveBeenCalledWith(
        'Error parsing package.json:',
        expect.any(Error),
      );
    });

    it('should handle empty string content', () => {
      const codes = [
        {
          name: 'package.json',
          content: '',
        },
      ];

      const result = getDependencies(codes);

      expect(result).toEqual({});
      expect(console.error).toHaveBeenCalled();
    });

    it('should handle null content', () => {
      const codes = [
        {
          name: 'package.json',
          content: null,
        },
      ];

      const result = getDependencies(codes);

      expect(result).toEqual({});
    });

    it('should handle malformed package.json with extra commas', () => {
      const codes = [
        {
          name: 'package.json',
          content: '{"dependencies":{"react":"^18.0.0",},}',
        },
      ];

      const result = getDependencies(codes);

      expect(result).toEqual({});
      expect(console.error).toHaveBeenCalled();
    });

    it('should handle package.json with comments (invalid JSON)', () => {
      const codes = [
        {
          name: 'package.json',
          content: `{
            // This is a comment
            "dependencies": {
              "react": "^18.0.0"
            }
          }`,
        },
      ];

      const result = getDependencies(codes);

      expect(result).toEqual({});
      expect(console.error).toHaveBeenCalled();
    });
  });

  // ===================================================================
  // PART 4: Edge Cases (3 tests)
  // ===================================================================

  describe('Edge Cases', () => {
    it('should handle empty codes array', () => {
      const codes = [];

      const result = getDependencies(codes);

      expect(result).toEqual({});
    });

    it('should throw error for undefined codes', () => {
      // Function doesn't handle undefined - will throw TypeError
      expect(() => getDependencies(undefined)).toThrow();
    });

    it('should handle codes with only name, no content', () => {
      const codes = [
        {
          name: 'package.json',
        },
      ];

      const result = getDependencies(codes);

      expect(result).toEqual({});
    });
  });
});

