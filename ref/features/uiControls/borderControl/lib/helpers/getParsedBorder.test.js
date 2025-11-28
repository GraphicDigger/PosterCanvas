// ===================================================================
// Unit Tests for Border Parsing Helpers
// Coverage Target: 100%
// Week 2 - Day 3 (Utils Testing)
// ===================================================================

import { describe, it, expect } from 'vitest';
import { parseBorder, formatBorder, parseBorderSides } from './getParsedBorder';

describe('parseBorder', () => {
  describe('Complete Border Values', () => {
    it('should parse complete border value (width style color)', () => {
      const result = parseBorder('1px solid #000000');

      expect(result).toEqual({
        width: '1px',
        style: 'solid',
        color: '#000000',
      });
    });

    it('should parse with different order', () => {
      const result = parseBorder('solid 2px red');

      expect(result).toEqual({
        width: '2px',
        style: 'solid',
        color: 'red',
      });
    });

    it('should parse with color first', () => {
      const result = parseBorder('blue 3px dashed');

      expect(result).toEqual({
        width: '3px',
        style: 'dashed',
        color: 'blue',
      });
    });
  });

  describe('Partial Border Values', () => {
    it('should parse width and style only', () => {
      const result = parseBorder('2px dashed');

      expect(result).toEqual({
        width: '2px',
        style: 'dashed',
        color: null,
      });
    });

    it('should parse style and color only', () => {
      const result = parseBorder('solid red');

      expect(result).toEqual({
        width: null,
        style: 'solid',
        color: 'red',
      });
    });

    it('should parse width only', () => {
      const result = parseBorder('3px');

      expect(result).toEqual({
        width: '3px',
        style: null,
        color: null,
      });
    });

    it('should parse style only', () => {
      const result = parseBorder('dotted');

      expect(result).toEqual({
        width: null,
        style: 'dotted',
        color: null,
      });
    });

    it('should parse color only', () => {
      const result = parseBorder('#FF0000');

      expect(result).toEqual({
        width: null,
        style: null,
        color: '#FF0000',
      });
    });
  });

  describe('Border Styles', () => {
    const styles = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];

    styles.forEach(style => {
      it(`should recognize ${style} border style`, () => {
        const result = parseBorder(`1px ${style} black`);

        expect(result.style).toBe(style);
      });
    });

    it('should handle uppercase style', () => {
      const result = parseBorder('SOLID 1px black');

      expect(result.style).toBe('SOLID');
    });
  });

  describe('Width Units', () => {
    it('should handle px units', () => {
      const result = parseBorder('10px solid black');
      expect(result.width).toBe('10px');
    });

    it('should handle em units', () => {
      const result = parseBorder('1.5em solid black');
      expect(result.width).toBe('1.5em');
    });

    it('should handle rem units', () => {
      const result = parseBorder('2rem solid black');
      expect(result.width).toBe('2rem');
    });

    it('should handle percentage', () => {
      const result = parseBorder('10% solid black');
      expect(result.width).toBe('10%');
    });

    it('should handle vh units', () => {
      const result = parseBorder('5vh solid black');
      expect(result.width).toBe('5vh');
    });

    it('should handle vw units', () => {
      const result = parseBorder('5vw solid black');
      expect(result.width).toBe('5vw');
    });

    it('should handle decimal values', () => {
      const result = parseBorder('0.5px solid black');
      expect(result.width).toBe('0.5px');
    });

    it('should handle zero', () => {
      const result = parseBorder('0px solid black');
      expect(result.width).toBe('0px');
    });
  });

  describe('Color Formats', () => {
    it('should handle hex colors (short)', () => {
      const result = parseBorder('1px solid #FFF');
      expect(result.color).toBe('#FFF');
    });

    it('should handle hex colors (long)', () => {
      const result = parseBorder('1px solid #FF00FF');
      expect(result.color).toBe('#FF00FF');
    });

    it('should handle named colors', () => {
      const result = parseBorder('1px solid red');
      expect(result.color).toBe('red');
    });

    it('should handle rgb colors', () => {
      const result = parseBorder('1px solid rgb(255,0,0)');
      expect(result.color).toBe('rgb(255,0,0)');
    });

    it('should handle rgba colors', () => {
      const result = parseBorder('1px solid rgba(255,0,0,0.5)');
      expect(result.color).toBe('rgba(255,0,0,0.5)');
    });

    it('should handle hsl colors', () => {
      const result = parseBorder('1px solid hsl(120,100%,50%)');
      expect(result.color).toBe('hsl(120,100%,50%)');
    });

    it('should handle hsla colors', () => {
      const result = parseBorder('1px solid hsla(120,100%,50%,0.5)');
      expect(result.color).toBe('hsla(120,100%,50%,0.5)');
    });
  });

  describe('Edge Cases', () => {
    it('should return null for all properties when value is null', () => {
      const result = parseBorder(null);

      expect(result).toEqual({
        width: null,
        style: null,
        color: null,
      });
    });

    it('should return null for all properties when value is undefined', () => {
      const result = parseBorder(undefined);

      expect(result).toEqual({
        width: null,
        style: null,
        color: null,
      });
    });

    it('should return null for all properties when value is empty string', () => {
      const result = parseBorder('');

      expect(result).toEqual({
        width: null,
        style: null,
        color: null,
      });
    });

    it('should return null for all properties when value is not a string', () => {
      const result = parseBorder(123);

      expect(result).toEqual({
        width: null,
        style: null,
        color: null,
      });
    });

    it('should handle leading/trailing whitespace', () => {
      const result = parseBorder('  1px solid black  ');

      expect(result).toEqual({
        width: '1px',
        style: 'solid',
        color: 'black',
      });
    });

    it('should handle multiple spaces between values', () => {
      const result = parseBorder('1px    solid    black');

      expect(result).toEqual({
        width: '1px',
        style: 'solid',
        color: 'black',
      });
    });

    it('should only capture first occurrence of each property', () => {
      const result = parseBorder('1px 2px solid dashed black red');

      // First width, first style, first color (even if it's a style keyword)
      expect(result.width).toBe('1px');
      expect(result.style).toBe('solid');
      expect(result.color).toBe('dashed'); // 'dashed' matches color regex since style is already set
    });
  });
});

describe('formatBorder', () => {
  describe('Complete Border Objects', () => {
    it('should format complete border object', () => {
      const result = formatBorder({
        width: '1px',
        style: 'solid',
        color: '#000000',
      });

      expect(result).toBe('1px solid #000000');
    });

    it('should format in order: width style color', () => {
      const result = formatBorder({
        width: '2px',
        style: 'dashed',
        color: 'red',
      });

      expect(result).toBe('2px dashed red');
    });
  });

  describe('Partial Border Objects', () => {
    it('should format with width and style only', () => {
      const result = formatBorder({
        width: '1px',
        style: 'solid',
        color: null,
      });

      expect(result).toBe('1px solid');
    });

    it('should format with style and color only', () => {
      const result = formatBorder({
        width: null,
        style: 'dotted',
        color: 'blue',
      });

      expect(result).toBe('dotted blue');
    });

    it('should format with width only', () => {
      const result = formatBorder({
        width: '3px',
        style: null,
        color: null,
      });

      expect(result).toBe('3px');
    });

    it('should format with style only', () => {
      const result = formatBorder({
        width: null,
        style: 'dashed',
        color: null,
      });

      expect(result).toBe('dashed');
    });

    it('should format with color only', () => {
      const result = formatBorder({
        width: null,
        style: null,
        color: '#FF0000',
      });

      expect(result).toBe('#FF0000');
    });
  });

  describe('Edge Cases', () => {
    it('should return empty string for null input', () => {
      const result = formatBorder(null);
      expect(result).toBe('');
    });

    it('should return empty string for undefined input', () => {
      const result = formatBorder(undefined);
      expect(result).toBe('');
    });

    it('should return empty string for non-object input', () => {
      const result = formatBorder('not an object');
      expect(result).toBe('');
    });

    it('should return empty string for all null properties', () => {
      const result = formatBorder({
        width: null,
        style: null,
        color: null,
      });

      expect(result).toBe('');
    });

    it('should ignore extra properties', () => {
      const result = formatBorder({
        width: '1px',
        style: 'solid',
        color: 'black',
        extra: 'ignored',
      });

      expect(result).toBe('1px solid black');
    });
  });

  describe('Roundtrip Conversion', () => {
    it('should roundtrip parse and format', () => {
      const original = '2px dashed #FF0000';
      const parsed = parseBorder(original);
      const formatted = formatBorder(parsed);

      expect(formatted).toBe(original);
    });

    it('should roundtrip with partial values', () => {
      const original = '1px solid';
      const parsed = parseBorder(original);
      const formatted = formatBorder(parsed);

      expect(formatted).toBe(original);
    });
  });
});

describe('parseBorderSides', () => {
  describe('String Input (All Sides)', () => {
    it('should apply string value to all sides', () => {
      const result = parseBorderSides('1px solid red');

      const expected = {
        width: '1px',
        style: 'solid',
        color: 'red',
      };

      expect(result.top).toEqual(expected);
      expect(result.right).toEqual(expected);
      expect(result.bottom).toEqual(expected);
      expect(result.left).toEqual(expected);
    });

    it('should apply partial value to all sides', () => {
      const result = parseBorderSides('2px dashed');

      const expected = {
        width: '2px',
        style: 'dashed',
        color: null,
      };

      expect(result.top).toEqual(expected);
      expect(result.right).toEqual(expected);
      expect(result.bottom).toEqual(expected);
      expect(result.left).toEqual(expected);
    });
  });

  describe('Object Input (Per Side)', () => {
    it('should parse different values for each side', () => {
      const result = parseBorderSides({
        top: '1px solid red',
        right: '2px dashed blue',
        bottom: '3px dotted green',
        left: '4px double yellow',
      });

      expect(result.top).toEqual({
        width: '1px',
        style: 'solid',
        color: 'red',
      });

      expect(result.right).toEqual({
        width: '2px',
        style: 'dashed',
        color: 'blue',
      });

      expect(result.bottom).toEqual({
        width: '3px',
        style: 'dotted',
        color: 'green',
      });

      expect(result.left).toEqual({
        width: '4px',
        style: 'double',
        color: 'yellow',
      });
    });

    it('should handle missing sides', () => {
      const result = parseBorderSides({
        top: '1px solid red',
        right: null,
      });

      expect(result.top).toEqual({
        width: '1px',
        style: 'solid',
        color: 'red',
      });

      expect(result.right).toEqual({
        width: null,
        style: null,
        color: null,
      });

      expect(result.bottom).toEqual({
        width: null,
        style: null,
        color: null,
      });

      expect(result.left).toEqual({
        width: null,
        style: null,
        color: null,
      });
    });

    it('should handle partial values per side', () => {
      const result = parseBorderSides({
        top: '1px',
        right: 'solid',
        bottom: 'red',
        left: '2px dashed',
      });

      expect(result.top).toEqual({
        width: '1px',
        style: null,
        color: null,
      });

      expect(result.right).toEqual({
        width: null,
        style: 'solid',
        color: null,
      });

      expect(result.bottom).toEqual({
        width: null,
        style: null,
        color: 'red',
      });

      expect(result.left).toEqual({
        width: '2px',
        style: 'dashed',
        color: null,
      });
    });
  });

  describe('Edge Cases', () => {
    it('should return null sides for null input', () => {
      const result = parseBorderSides(null);

      const expected = {
        width: null,
        style: null,
        color: null,
      };

      expect(result.top).toEqual(expected);
      expect(result.right).toEqual(expected);
      expect(result.bottom).toEqual(expected);
      expect(result.left).toEqual(expected);
    });

    it('should return null sides for undefined input', () => {
      const result = parseBorderSides(undefined);

      const expected = {
        width: null,
        style: null,
        color: null,
      };

      expect(result.top).toEqual(expected);
      expect(result.right).toEqual(expected);
      expect(result.bottom).toEqual(expected);
      expect(result.left).toEqual(expected);
    });

    it('should handle empty string', () => {
      const result = parseBorderSides('');

      const expected = {
        width: null,
        style: null,
        color: null,
      };

      expect(result.top).toEqual(expected);
      expect(result.right).toEqual(expected);
      expect(result.bottom).toEqual(expected);
      expect(result.left).toEqual(expected);
    });

    it('should handle empty object', () => {
      const result = parseBorderSides({});

      const expected = {
        width: null,
        style: null,
        color: null,
      };

      expect(result.top).toEqual(expected);
      expect(result.right).toEqual(expected);
      expect(result.bottom).toEqual(expected);
      expect(result.left).toEqual(expected);
    });

    it('should handle number input (invalid)', () => {
      const result = parseBorderSides(123);

      const expected = {
        width: null,
        style: null,
        color: null,
      };

      expect(result.top).toEqual(expected);
      expect(result.right).toEqual(expected);
      expect(result.bottom).toEqual(expected);
      expect(result.left).toEqual(expected);
    });
  });
});

