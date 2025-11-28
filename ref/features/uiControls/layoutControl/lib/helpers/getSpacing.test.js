// ===================================================================
// Unit Tests for getSpacing Helper
// Coverage Target: 100%
// Week 2 - Day 3 (Utils Testing)
// ===================================================================

import { describe, it, expect } from 'vitest';
import { parseSpacing } from './getSpacing';

describe('parseSpacing', () => {
  describe('Single Value', () => {
    it('should parse single value to all sides', () => {
      const result = parseSpacing('12px');

      expect(result).toEqual({
        top: '12px',
        right: '12px',
        bottom: '12px',
        left: '12px',
      });
    });

    it('should handle rem units', () => {
      const result = parseSpacing('1.5rem');

      expect(result).toEqual({
        top: '1.5rem',
        right: '1.5rem',
        bottom: '1.5rem',
        left: '1.5rem',
      });
    });

    it('should handle percentage', () => {
      const result = parseSpacing('10%');

      expect(result).toEqual({
        top: '10%',
        right: '10%',
        bottom: '10%',
        left: '10%',
      });
    });

    it('should handle zero', () => {
      const result = parseSpacing('0');

      expect(result).toEqual({
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
      });
    });
  });

  describe('Two Values', () => {
    it('should parse two values (vertical horizontal)', () => {
      const result = parseSpacing('12px 8px');

      expect(result).toEqual({
        top: '12px',
        right: '8px',
        bottom: '12px',
        left: '8px',
      });
    });

    it('should handle different units', () => {
      const result = parseSpacing('1rem 10px');

      expect(result).toEqual({
        top: '1rem',
        right: '10px',
        bottom: '1rem',
        left: '10px',
      });
    });

    it('should handle extra whitespace', () => {
      const result = parseSpacing('12px    8px');

      expect(result).toEqual({
        top: '12px',
        right: '8px',
        bottom: '12px',
        left: '8px',
      });
    });
  });

  describe('Three Values', () => {
    it('should parse three values (top horizontal bottom)', () => {
      const result = parseSpacing('12px 8px 4px');

      expect(result).toEqual({
        top: '12px',
        right: '8px',
        bottom: '4px',
        left: '8px',
      });
    });

    it('should handle mixed units', () => {
      const result = parseSpacing('1rem 0.5rem 2rem');

      expect(result).toEqual({
        top: '1rem',
        right: '0.5rem',
        bottom: '2rem',
        left: '0.5rem',
      });
    });
  });

  describe('Four Values', () => {
    it('should parse four values (clockwise from top)', () => {
      const result = parseSpacing('12px 8px 4px 2px');

      expect(result).toEqual({
        top: '12px',
        right: '8px',
        bottom: '4px',
        left: '2px',
      });
    });

    it('should handle all different units', () => {
      const result = parseSpacing('12px 1rem 8px 0.5rem');

      expect(result).toEqual({
        top: '12px',
        right: '1rem',
        bottom: '8px',
        left: '0.5rem',
      });
    });

    it('should handle negative values', () => {
      const result = parseSpacing('-12px -8px -4px -2px');

      expect(result).toEqual({
        top: '-12px',
        right: '-8px',
        bottom: '-4px',
        left: '-2px',
      });
    });
  });

  describe('Edge Cases', () => {
    it('should return null for all sides when value is null', () => {
      const result = parseSpacing(null);

      expect(result).toEqual({
        top: null,
        right: null,
        bottom: null,
        left: null,
      });
    });

    it('should return null for all sides when value is undefined', () => {
      const result = parseSpacing(undefined);

      expect(result).toEqual({
        top: null,
        right: null,
        bottom: null,
        left: null,
      });
    });

    it('should return null for all sides when value is empty string', () => {
      const result = parseSpacing('');

      expect(result).toEqual({
        top: null,
        right: null,
        bottom: null,
        left: null,
      });
    });

    it('should return null for all sides when value is not a string', () => {
      const result = parseSpacing(123);

      expect(result).toEqual({
        top: null,
        right: null,
        bottom: null,
        left: null,
      });
    });

    it('should return null for all sides when value is an object', () => {
      const result = parseSpacing({});

      expect(result).toEqual({
        top: null,
        right: null,
        bottom: null,
        left: null,
      });
    });

    it('should return null for all sides when value is an array', () => {
      const result = parseSpacing([]);

      expect(result).toEqual({
        top: null,
        right: null,
        bottom: null,
        left: null,
      });
    });

    it('should return null for all sides when more than 4 values', () => {
      const result = parseSpacing('12px 8px 4px 2px 1px');

      expect(result).toEqual({
        top: null,
        right: null,
        bottom: null,
        left: null,
      });
    });

    it('should handle leading/trailing whitespace', () => {
      const result = parseSpacing('  12px  ');

      expect(result).toEqual({
        top: '12px',
        right: '12px',
        bottom: '12px',
        left: '12px',
      });
    });

    it('should handle tabs as whitespace', () => {
      const result = parseSpacing('12px\t8px');

      expect(result).toEqual({
        top: '12px',
        right: '8px',
        bottom: '12px',
        left: '8px',
      });
    });

    it('should handle newlines as whitespace', () => {
      const result = parseSpacing('12px\n8px\n4px');

      expect(result).toEqual({
        top: '12px',
        right: '8px',
        bottom: '4px',
        left: '8px',
      });
    });
  });

  describe('Real World CSS Values', () => {
    it('should handle auto', () => {
      const result = parseSpacing('auto');

      expect(result).toEqual({
        top: 'auto',
        right: 'auto',
        bottom: 'auto',
        left: 'auto',
      });
    });

    it('should handle inherit', () => {
      const result = parseSpacing('inherit');

      expect(result).toEqual({
        top: 'inherit',
        right: 'inherit',
        bottom: 'inherit',
        left: 'inherit',
      });
    });

    it('should handle initial', () => {
      const result = parseSpacing('initial');

      expect(result).toEqual({
        top: 'initial',
        right: 'initial',
        bottom: 'initial',
        left: 'initial',
      });
    });

    it('should handle calc()', () => {
      const result = parseSpacing('calc(100%-10px)');

      expect(result).toEqual({
        top: 'calc(100%-10px)',
        right: 'calc(100%-10px)',
        bottom: 'calc(100%-10px)',
        left: 'calc(100%-10px)',
      });
    });

    it('should handle em units', () => {
      const result = parseSpacing('1em 2em');

      expect(result).toEqual({
        top: '1em',
        right: '2em',
        bottom: '1em',
        left: '2em',
      });
    });

    it('should handle ch units', () => {
      const result = parseSpacing('10ch');

      expect(result).toEqual({
        top: '10ch',
        right: '10ch',
        bottom: '10ch',
        left: '10ch',
      });
    });

    it('should handle vw/vh units', () => {
      const result = parseSpacing('10vw 5vh');

      expect(result).toEqual({
        top: '10vw',
        right: '5vh',
        bottom: '10vw',
        left: '5vh',
      });
    });
  });
});

