// ===================================================================
// Unit Tests for structureConverters
// CRITICAL BUSINESS LOGIC - StackBlitz Structure Conversion
// Day 1 Part 2 - Feature Utilities (20 tests)
// ===================================================================

import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the converters module
vi.mock('./converters/jsx', () => ({
  structureToJsx: vi.fn(),
  jsxToStructure: vi.fn(),
}));

import { convertStructureTo, convertToStructure } from './structureConverters';
import { structureToJsx, jsxToStructure } from './converters/jsx';

describe('structureConverters - StackBlitz Structure Conversion', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ===================================================================
  // PART 1: convertStructureTo - Basic Functionality (5 tests)
  // ===================================================================

  describe('convertStructureTo - Basic Functionality', () => {
    it('should convert structure to JSX format', () => {
      const structure = { type: 'element', tag: 'div' };
      const options = { indent: 2 };
      const expected = '<div></div>';

      structureToJsx.mockReturnValue(expected);

      const result = convertStructureTo('jsx', structure, options);

      expect(structureToJsx).toHaveBeenCalledWith(structure, options);
      expect(result).toBe(expected);
    });

    it('should pass structure without options', () => {
      const structure = { type: 'element', tag: 'span' };
      const expected = '<span></span>';

      structureToJsx.mockReturnValue(expected);

      const result = convertStructureTo('jsx', structure);

      expect(structureToJsx).toHaveBeenCalledWith(structure, {});
      expect(result).toBe(expected);
    });

    it('should handle complex structure objects', () => {
      const structure = {
        type: 'element',
        tag: 'div',
        children: [
          { type: 'element', tag: 'span', text: 'Hello' },
          { type: 'element', tag: 'p', text: 'World' },
        ],
      };
      const expected = '<div><span>Hello</span><p>World</p></div>';

      structureToJsx.mockReturnValue(expected);

      const result = convertStructureTo('jsx', structure);

      expect(structureToJsx).toHaveBeenCalledWith(structure, {});
      expect(result).toBe(expected);
    });

    it('should handle empty structure', () => {
      const structure = {};
      const expected = '';

      structureToJsx.mockReturnValue(expected);

      const result = convertStructureTo('jsx', structure);

      expect(structureToJsx).toHaveBeenCalledWith(structure, {});
      expect(result).toBe(expected);
    });

    it('should handle null structure', () => {
      const structure = null;
      const expected = null;

      structureToJsx.mockReturnValue(expected);

      const result = convertStructureTo('jsx', structure);

      expect(structureToJsx).toHaveBeenCalledWith(structure, {});
      expect(result).toBe(expected);
    });
  });

  // ===================================================================
  // PART 2: convertStructureTo - Options Handling (3 tests)
  // ===================================================================

  describe('convertStructureTo - Options Handling', () => {
    it('should pass all options to converter', () => {
      const structure = { type: 'element', tag: 'div' };
      const options = {
        indent: 4,
        allProps: { prop1: 'value1' },
        instances: [{ id: '1' }],
      };

      structureToJsx.mockReturnValue('<div></div>');

      convertStructureTo('jsx', structure, options);

      expect(structureToJsx).toHaveBeenCalledWith(structure, options);
    });

    it('should handle undefined options', () => {
      const structure = { type: 'element', tag: 'div' };

      structureToJsx.mockReturnValue('<div></div>');

      convertStructureTo('jsx', structure, undefined);

      expect(structureToJsx).toHaveBeenCalledWith(structure, {});
    });

    it('should handle empty options object', () => {
      const structure = { type: 'element', tag: 'div' };

      structureToJsx.mockReturnValue('<div></div>');

      convertStructureTo('jsx', structure, {});

      expect(structureToJsx).toHaveBeenCalledWith(structure, {});
    });
  });

  // ===================================================================
  // PART 3: convertStructureTo - Error Handling (3 tests)
  // ===================================================================

  describe('convertStructureTo - Error Handling', () => {
    it('should throw error for unknown format', () => {
      const structure = { type: 'element', tag: 'div' };

      expect(() => {
        convertStructureTo('html', structure);
      }).toThrow('Unknown format: html');
    });

    it('should throw error for invalid format type', () => {
      const structure = { type: 'element', tag: 'div' };

      expect(() => {
        convertStructureTo('xml', structure);
      }).toThrow('Unknown format: xml');
    });

    it('should throw error for null format', () => {
      const structure = { type: 'element', tag: 'div' };

      expect(() => {
        convertStructureTo(null, structure);
      }).toThrow('Unknown format: null');
    });
  });

  // ===================================================================
  // PART 4: convertToStructure - Basic Functionality (5 tests)
  // ===================================================================

  describe('convertToStructure - Basic Functionality', () => {
    it('should convert JSX code to structure', () => {
      const code = '<div></div>';
      const options = {};
      const expected = { type: 'element', tag: 'div' };

      jsxToStructure.mockReturnValue(expected);

      const result = convertToStructure('jsx', code, options);

      expect(jsxToStructure).toHaveBeenCalledWith(code, options);
      expect(result).toEqual(expected);
    });

    it('should handle complex JSX code', () => {
      const code = '<div><span>Hello</span><p>World</p></div>';
      const expected = {
        type: 'element',
        tag: 'div',
        children: [
          { type: 'element', tag: 'span', text: 'Hello' },
          { type: 'element', tag: 'p', text: 'World' },
        ],
      };

      jsxToStructure.mockReturnValue(expected);

      const result = convertToStructure('jsx', code);

      expect(jsxToStructure).toHaveBeenCalledWith(code, {});
      expect(result).toEqual(expected);
    });

    it('should handle empty JSX code', () => {
      const code = '';
      const expected = null;

      jsxToStructure.mockReturnValue(expected);

      const result = convertToStructure('jsx', code);

      expect(jsxToStructure).toHaveBeenCalledWith(code, {});
      expect(result).toBe(expected);
    });

    it('should handle self-closing JSX tags', () => {
      const code = '<img src="test.jpg" />';
      const expected = { type: 'element', tag: 'img', props: { src: 'test.jpg' } };

      jsxToStructure.mockReturnValue(expected);

      const result = convertToStructure('jsx', code);

      expect(jsxToStructure).toHaveBeenCalledWith(code, {});
      expect(result).toEqual(expected);
    });

    it('should handle JSX with attributes', () => {
      const code = '<div className="container" id="main"></div>';
      const expected = {
        type: 'element',
        tag: 'div',
        props: { className: 'container', id: 'main' },
      };

      jsxToStructure.mockReturnValue(expected);

      const result = convertToStructure('jsx', code);

      expect(jsxToStructure).toHaveBeenCalledWith(code, {});
      expect(result).toEqual(expected);
    });
  });

  // ===================================================================
  // PART 5: convertToStructure - Error Handling (3 tests)
  // ===================================================================

  describe('convertToStructure - Error Handling', () => {
    it('should throw error for unknown format', () => {
      const code = '<div></div>';

      expect(() => {
        convertToStructure('html', code);
      }).toThrow('Unknown format: html');
    });

    it('should throw error for invalid format type', () => {
      const code = '<div></div>';

      expect(() => {
        convertToStructure('xml', code);
      }).toThrow('Unknown format: xml');
    });

    it('should throw error for undefined format', () => {
      const code = '<div></div>';

      expect(() => {
        convertToStructure(undefined, code);
      }).toThrow('Unknown format: undefined');
    });
  });

  // ===================================================================
  // PART 6: Edge Cases & Integration (1 test)
  // ===================================================================

  describe('Edge Cases & Integration', () => {
    it('should handle round-trip conversion', () => {
      const originalStructure = {
        type: 'element',
        tag: 'div',
        children: [{ type: 'element', tag: 'span', text: 'Test' }],
      };
      const jsxCode = '<div><span>Test</span></div>';

      structureToJsx.mockReturnValue(jsxCode);
      jsxToStructure.mockReturnValue(originalStructure);

      // Convert structure to JSX
      const jsx = convertStructureTo('jsx', originalStructure);
      expect(jsx).toBe(jsxCode);

      // Convert JSX back to structure
      const structure = convertToStructure('jsx', jsx);
      expect(structure).toEqual(originalStructure);

      expect(structureToJsx).toHaveBeenCalledWith(originalStructure, {});
      expect(jsxToStructure).toHaveBeenCalledWith(jsxCode, {});
    });
  });
});

