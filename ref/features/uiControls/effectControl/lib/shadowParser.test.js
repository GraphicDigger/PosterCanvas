// ===================================================================
// Unit Tests for Shadow Parser
// CRITICAL BUSINESS LOGIC - Effect Control System
// Week 2, Day 2 - Part 3 (20 tests)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';

// Mock color functions
vi.mock('../../../../shared/lib', () => ({
  formatColorForUI: (color) => {
    if (!color) {return { color: null, opacity: 100 };}
    // Simple mock - extract rgba opacity if present
    const rgbaMatch = color.match(/rgba?\(.*,\s*([\d.]+)\)/);
    if (rgbaMatch) {
      const opacity = parseFloat(rgbaMatch[1]) * 100;
      return { color: color.replace(/,\s*[\d.]+\)/, ')'), opacity };
    }
    return { color, opacity: 100 };
  },
  parseColorFromUI: (color, opacity) => {
    if (!color) {return '';}
    if (opacity !== undefined && opacity !== 100) {
      return `rgba(${color}, ${opacity / 100})`;
    }
    return color;
  },
}));

import { parseShadow, formatShadow, parseMultipleShadows, formatMultipleShadows } from './shadowParser';

describe('Shadow Parser - Effect System', () => {
  // ===================================================================
  // PART 1: parseShadow - Basic Values (5 tests)
  // ===================================================================

  describe('parseShadow - Basic Values', () => {
    it('should parse complete box-shadow', () => {
      const result = parseShadow('2px 2px 5px 1px #000000');

      expect(result).toEqual({
        offsetX: '2px',
        offsetY: '2px',
        blurRadius: '5px',
        spreadRadius: '1px',
        color: '#000000',
        opacity: 100,
        inset: false,
      });
    });

    it('should parse box-shadow without spread', () => {
      const result = parseShadow('2px 2px 5px #000000');

      expect(result).toEqual({
        offsetX: '2px',
        offsetY: '2px',
        blurRadius: '5px',
        spreadRadius: null,
        color: '#000000',
        opacity: 100,
        inset: false,
      });
    });

    it('should parse box-shadow with only offsets and color', () => {
      const result = parseShadow('2px 2px #red');

      expect(result).toEqual({
        offsetX: '2px',
        offsetY: '2px',
        blurRadius: null,
        spreadRadius: null,
        color: '#red',
        opacity: 100,
        inset: false,
      });
    });

    it('should parse box-shadow with zero values', () => {
      const result = parseShadow('0 0 10px #000');

      expect(result).toEqual({
        offsetX: '0',
        offsetY: '0',
        blurRadius: '10px',
        spreadRadius: null,
        color: '#000',
        opacity: 100,
        inset: false,
      });
    });

    it('should parse inset box-shadow', () => {
      const result = parseShadow('inset 0 0 10px #000');

      expect(result).toEqual({
        offsetX: '0',
        offsetY: '0',
        blurRadius: '10px',
        spreadRadius: null,
        color: '#000',
        opacity: 100,
        inset: true,
      });
    });
  });

  // ===================================================================
  // PART 2: parseShadow - Edge Cases (5 tests)
  // ===================================================================

  describe('parseShadow - Edge Cases', () => {
    it('should handle null value', () => {
      const result = parseShadow(null);

      expect(result).toEqual({
        offsetX: null,
        offsetY: null,
        blurRadius: null,
        spreadRadius: null,
        color: null,
        opacity: 100,
        inset: false,
      });
    });

    it('should handle empty string', () => {
      const result = parseShadow('');

      expect(result).toEqual({
        offsetX: null,
        offsetY: null,
        blurRadius: null,
        spreadRadius: null,
        color: null,
        opacity: 100,
        inset: false,
      });
    });

    it('should handle undefined', () => {
      const result = parseShadow(undefined);

      expect(result).toEqual({
        offsetX: null,
        offsetY: null,
        blurRadius: null,
        spreadRadius: null,
        color: null,
        opacity: 100,
        inset: false,
      });
    });

    it('should handle non-string value', () => {
      const result = parseShadow(123);

      expect(result).toEqual({
        offsetX: null,
        offsetY: null,
        blurRadius: null,
        spreadRadius: null,
        color: null,
        opacity: 100,
        inset: false,
      });
    });

    it('should handle whitespace-only string', () => {
      const result = parseShadow('   ');

      expect(result).toEqual({
        offsetX: null,
        offsetY: null,
        blurRadius: null,
        spreadRadius: null,
        color: null,
        opacity: 100,
        inset: false,
      });
    });
  });

  // ===================================================================
  // PART 3: formatShadow (5 tests)
  // ===================================================================

  describe('formatShadow', () => {
    it('should format complete shadow object', () => {
      const shadow = {
        offsetX: '2px',
        offsetY: '2px',
        blurRadius: '5px',
        spreadRadius: '1px',
        color: '#000000',
        opacity: 100,
        inset: false,
      };

      const result = formatShadow(shadow);

      expect(result).toBe('2px 2px 5px 1px #000000');
    });

    it('should format inset shadow', () => {
      const shadow = {
        offsetX: '0',
        offsetY: '0',
        blurRadius: '10px',
        spreadRadius: '0',
        color: '#000',
        opacity: 100,
        inset: true,
      };

      const result = formatShadow(shadow);

      expect(result).toBe('inset 0 0 10px 0 #000');
    });

    it('should handle null/empty values with defaults', () => {
      const shadow = {
        offsetX: null,
        offsetY: null,
        blurRadius: null,
        spreadRadius: null,
        color: '#FF0000',
        opacity: 50,
        inset: false,
      };

      const result = formatShadow(shadow);

      expect(result).toContain('0 0 0 0');
      expect(result).toContain('#FF0000');
    });

    it('should handle null shadow object', () => {
      const result = formatShadow(null);

      expect(result).toBe('');
    });

    it('should handle non-object value', () => {
      const result = formatShadow('invalid');

      expect(result).toBe('');
    });
  });

  // ===================================================================
  // PART 4: parseMultipleShadows (3 tests)
  // ===================================================================

  describe('parseMultipleShadows', () => {
    it('should parse multiple shadows separated by comma', () => {
      const result = parseMultipleShadows('2px 2px 5px red, 0 0 10px blue');

      expect(result).toHaveLength(2);
      expect(result[0].offsetX).toBe('2px');
      expect(result[0].color).toBe('red');
      expect(result[1].offsetX).toBe('0');
      expect(result[1].color).toBe('blue');
    });

    it('should parse single shadow', () => {
      const result = parseMultipleShadows('5px 5px 10px #000');

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        offsetX: '5px',
        offsetY: '5px',
        blurRadius: '10px',
        spreadRadius: null,
        color: '#000',
        opacity: 100,
        inset: false,
      });
    });

    it('should handle empty string', () => {
      const result = parseMultipleShadows('');

      expect(result).toEqual([]);
    });
  });

  // ===================================================================
  // PART 5: formatMultipleShadows (2 tests)
  // ===================================================================

  describe('formatMultipleShadows', () => {
    it('should format multiple shadows with comma separator', () => {
      const shadows = [
        { offsetX: '2px', offsetY: '2px', blurRadius: '5px', spreadRadius: '0', color: 'red', opacity: 100, inset: false },
        { offsetX: '0', offsetY: '0', blurRadius: '10px', spreadRadius: '0', color: 'blue', opacity: 100, inset: true },
      ];

      const result = formatMultipleShadows(shadows);

      expect(result).toContain(',');
      expect(result).toContain('2px 2px 5px 0');
      expect(result).toContain('inset 0 0 10px 0');
    });

    it('should handle empty array', () => {
      const result = formatMultipleShadows([]);

      expect(result).toBe('');
    });
  });
});

