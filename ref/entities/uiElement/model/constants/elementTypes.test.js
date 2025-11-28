// ===================================================================
// Unit Tests for Element Types & Style Target Properties
// Coverage Target: 100%
// Phase 5 - Push to 3,500: Element Type System! 🚀
// ===================================================================

import { describe, it, expect } from 'vitest';
import {
  ELEMENT_TYPES,
  STYLE_TARGET_PROPERTY,
  getElementTypeByTag,
  getElementTagsByType,
} from './elementTypes';
import { ELEMENT_TAGS } from './elementTags';

describe('ELEMENT_TYPES', () => {
  describe('Structure', () => {
    it('should be an object', () => {
      expect(ELEMENT_TYPES).toBeTypeOf('object');
      expect(ELEMENT_TYPES).not.toBeNull();
    });

    it('should have required element types', () => {
      expect(ELEMENT_TYPES).toHaveProperty('TEXT');
      expect(ELEMENT_TYPES).toHaveProperty('BOX');
    });

    it('should have exactly 2 types', () => {
      const keys = Object.keys(ELEMENT_TYPES);
      expect(keys).toHaveLength(2);
    });
  });

  describe('Type values', () => {
    it('should have TEXT type', () => {
      expect(ELEMENT_TYPES.TEXT).toBe('text');
    });

    it('should have BOX type', () => {
      expect(ELEMENT_TYPES.BOX).toBe('box');
    });
  });

  describe('Value format', () => {
    it('should have all string values', () => {
      Object.values(ELEMENT_TYPES).forEach(value => {
        expect(typeof value).toBe('string');
      });
    });

    it('should have all lowercase values', () => {
      Object.values(ELEMENT_TYPES).forEach(value => {
        expect(value).toBe(value.toLowerCase());
      });
    });
  });

  describe('Value uniqueness', () => {
    it('should have unique values', () => {
      const values = Object.values(ELEMENT_TYPES);
      const uniqueValues = [...new Set(values)];
      expect(values.length).toBe(uniqueValues.length);
    });
  });
});

describe('STYLE_TARGET_PROPERTY', () => {
  describe('Structure', () => {
    it('should be an object', () => {
      expect(STYLE_TARGET_PROPERTY).toBeTypeOf('object');
      expect(STYLE_TARGET_PROPERTY).not.toBeNull();
    });

    it('should map element tags to element types', () => {
      Object.values(STYLE_TARGET_PROPERTY).forEach(value => {
        expect(Object.values(ELEMENT_TYPES)).toContain(value);
      });
    });
  });

  describe('TEXT type mappings', () => {
    it('should map PARAGRAPH to TEXT', () => {
      expect(STYLE_TARGET_PROPERTY[ELEMENT_TAGS.PARAGRAPH]).toBe(ELEMENT_TYPES.TEXT);
    });

    it('should map all headings to TEXT', () => {
      expect(STYLE_TARGET_PROPERTY[ELEMENT_TAGS.HEADING1]).toBe(ELEMENT_TYPES.TEXT);
      expect(STYLE_TARGET_PROPERTY[ELEMENT_TAGS.HEADING2]).toBe(ELEMENT_TYPES.TEXT);
      expect(STYLE_TARGET_PROPERTY[ELEMENT_TAGS.HEADING3]).toBe(ELEMENT_TYPES.TEXT);
      expect(STYLE_TARGET_PROPERTY[ELEMENT_TAGS.HEADING4]).toBe(ELEMENT_TYPES.TEXT);
      expect(STYLE_TARGET_PROPERTY[ELEMENT_TAGS.HEADING5]).toBe(ELEMENT_TYPES.TEXT);
      expect(STYLE_TARGET_PROPERTY[ELEMENT_TAGS.HEADING6]).toBe(ELEMENT_TYPES.TEXT);
    });

    it('should map SPAN to TEXT', () => {
      expect(STYLE_TARGET_PROPERTY[ELEMENT_TAGS.SPAN]).toBe(ELEMENT_TYPES.TEXT);
    });

    it('should map LINK to TEXT', () => {
      expect(STYLE_TARGET_PROPERTY[ELEMENT_TAGS.LINK]).toBe(ELEMENT_TYPES.TEXT);
    });

    it('should map LABEL to TEXT', () => {
      expect(STYLE_TARGET_PROPERTY[ELEMENT_TAGS.LABEL]).toBe(ELEMENT_TYPES.TEXT);
    });
  });

  describe('BOX type mappings', () => {
    it('should map DIV to BOX', () => {
      expect(STYLE_TARGET_PROPERTY[ELEMENT_TAGS.DIV]).toBe(ELEMENT_TYPES.BOX);
    });

    it('should map HEADER to BOX', () => {
      expect(STYLE_TARGET_PROPERTY[ELEMENT_TAGS.HEADER]).toBe(ELEMENT_TYPES.BOX);
    });

    it('should map FOOTER to BOX', () => {
      expect(STYLE_TARGET_PROPERTY[ELEMENT_TAGS.FOOTER]).toBe(ELEMENT_TYPES.BOX);
    });

    it('should map SECTION to BOX', () => {
      expect(STYLE_TARGET_PROPERTY[ELEMENT_TAGS.SECTION]).toBe(ELEMENT_TYPES.BOX);
    });

    it('should map ARTICLE to BOX', () => {
      expect(STYLE_TARGET_PROPERTY[ELEMENT_TAGS.ARTICLE]).toBe(ELEMENT_TYPES.BOX);
    });

    it('should map ASIDE to BOX', () => {
      expect(STYLE_TARGET_PROPERTY[ELEMENT_TAGS.ASIDE]).toBe(ELEMENT_TYPES.BOX);
    });

    it('should map MAIN to BOX', () => {
      expect(STYLE_TARGET_PROPERTY[ELEMENT_TAGS.MAIN]).toBe(ELEMENT_TYPES.BOX);
    });

    it('should map NAV to BOX', () => {
      expect(STYLE_TARGET_PROPERTY[ELEMENT_TAGS.NAV]).toBe(ELEMENT_TYPES.BOX);
    });
  });

  describe('Coverage', () => {
    it('should have mappings for text elements', () => {
      const textTags = Object.keys(STYLE_TARGET_PROPERTY).filter(
        tag => STYLE_TARGET_PROPERTY[tag] === ELEMENT_TYPES.TEXT,
      );
      expect(textTags.length).toBeGreaterThan(0);
    });

    it('should have mappings for box elements', () => {
      const boxTags = Object.keys(STYLE_TARGET_PROPERTY).filter(
        tag => STYLE_TARGET_PROPERTY[tag] === ELEMENT_TYPES.BOX,
      );
      expect(boxTags.length).toBeGreaterThan(0);
    });
  });
});

describe('getElementTypeByTag', () => {
  describe('Valid tags', () => {
    it('should return TEXT for paragraph tag', () => {
      expect(getElementTypeByTag(ELEMENT_TAGS.PARAGRAPH)).toBe(ELEMENT_TYPES.TEXT);
    });

    it('should return TEXT for heading tags', () => {
      expect(getElementTypeByTag(ELEMENT_TAGS.HEADING1)).toBe(ELEMENT_TYPES.TEXT);
      expect(getElementTypeByTag(ELEMENT_TAGS.HEADING2)).toBe(ELEMENT_TYPES.TEXT);
      expect(getElementTypeByTag(ELEMENT_TAGS.HEADING3)).toBe(ELEMENT_TYPES.TEXT);
    });

    it('should return BOX for div tag', () => {
      expect(getElementTypeByTag(ELEMENT_TAGS.DIV)).toBe(ELEMENT_TYPES.BOX);
    });

    it('should return BOX for semantic tags', () => {
      expect(getElementTypeByTag(ELEMENT_TAGS.HEADER)).toBe(ELEMENT_TYPES.BOX);
      expect(getElementTypeByTag(ELEMENT_TAGS.FOOTER)).toBe(ELEMENT_TYPES.BOX);
      expect(getElementTypeByTag(ELEMENT_TAGS.SECTION)).toBe(ELEMENT_TYPES.BOX);
    });
  });

  describe('Invalid/unmapped tags', () => {
    it('should return BOX for null tag', () => {
      expect(getElementTypeByTag(null)).toBe(ELEMENT_TYPES.BOX);
    });

    it('should return BOX for undefined tag', () => {
      expect(getElementTypeByTag(undefined)).toBe(ELEMENT_TYPES.BOX);
    });

    it('should return BOX for empty string tag', () => {
      expect(getElementTypeByTag('')).toBe(ELEMENT_TYPES.BOX);
    });

    it('should return BOX for unmapped tag', () => {
      expect(getElementTypeByTag('unknownTag')).toBe(ELEMENT_TYPES.BOX);
    });

    it('should return BOX for button tag (commented out in mapping)', () => {
      expect(getElementTypeByTag(ELEMENT_TAGS.BUTTON)).toBe(ELEMENT_TYPES.BOX);
    });

    it('should return BOX for input tag (commented out in mapping)', () => {
      expect(getElementTypeByTag(ELEMENT_TAGS.INPUT)).toBe(ELEMENT_TYPES.BOX);
    });
  });

  describe('Return value', () => {
    it('should always return a string', () => {
      const result1 = getElementTypeByTag('div');
      const result2 = getElementTypeByTag(null);
      const result3 = getElementTypeByTag('unknownTag');

      expect(typeof result1).toBe('string');
      expect(typeof result2).toBe('string');
      expect(typeof result3).toBe('string');
    });

    it('should always return a valid element type', () => {
      const validTypes = Object.values(ELEMENT_TYPES);

      expect(validTypes).toContain(getElementTypeByTag('div'));
      expect(validTypes).toContain(getElementTypeByTag('p'));
      expect(validTypes).toContain(getElementTypeByTag(null));
      expect(validTypes).toContain(getElementTypeByTag('unknownTag'));
    });
  });
});

describe('getElementTagsByType', () => {
  describe('Valid types', () => {
    it('should return text tags for TEXT type', () => {
      const textTags = getElementTagsByType(ELEMENT_TYPES.TEXT);

      expect(Array.isArray(textTags)).toBe(true);
      expect(textTags.length).toBeGreaterThan(0);
      expect(textTags).toContain(ELEMENT_TAGS.PARAGRAPH);
      expect(textTags).toContain(ELEMENT_TAGS.HEADING1);
      expect(textTags).toContain(ELEMENT_TAGS.SPAN);
    });

    it('should return box tags for BOX type', () => {
      const boxTags = getElementTagsByType(ELEMENT_TYPES.BOX);

      expect(Array.isArray(boxTags)).toBe(true);
      expect(boxTags.length).toBeGreaterThan(0);
      expect(boxTags).toContain(ELEMENT_TAGS.DIV);
      expect(boxTags).toContain(ELEMENT_TAGS.HEADER);
      expect(boxTags).toContain(ELEMENT_TAGS.SECTION);
    });
  });

  describe('Invalid/empty types', () => {
    it('should return all tags for null type', () => {
      const allTags = getElementTagsByType(null);

      expect(Array.isArray(allTags)).toBe(true);
      expect(allTags.length).toBeGreaterThan(0);
    });

    it('should return all tags for undefined type', () => {
      const allTags = getElementTagsByType(undefined);

      expect(Array.isArray(allTags)).toBe(true);
      expect(allTags.length).toBeGreaterThan(0);
    });

    it('should return all tags for empty string type', () => {
      const allTags = getElementTagsByType('');

      expect(Array.isArray(allTags)).toBe(true);
      expect(allTags.length).toBeGreaterThan(0);
    });

    it('should return empty array for unknown type', () => {
      const tags = getElementTagsByType('unknownType');

      expect(Array.isArray(tags)).toBe(true);
      expect(tags).toEqual([]);
    });
  });

  describe('Return value', () => {
    it('should always return an array', () => {
      expect(Array.isArray(getElementTagsByType(ELEMENT_TYPES.TEXT))).toBe(true);
      expect(Array.isArray(getElementTagsByType(ELEMENT_TYPES.BOX))).toBe(true);
      expect(Array.isArray(getElementTagsByType(null))).toBe(true);
      expect(Array.isArray(getElementTagsByType('unknown'))).toBe(true);
    });

    it('should return valid element tags', () => {
      const textTags = getElementTagsByType(ELEMENT_TYPES.TEXT);
      const allTags = Object.values(ELEMENT_TAGS);

      textTags.forEach(tag => {
        expect(allTags).toContain(tag);
      });
    });
  });

  describe('Consistency with getElementTypeByTag', () => {
    it('should be consistent with getElementTypeByTag for TEXT', () => {
      const textTags = getElementTagsByType(ELEMENT_TYPES.TEXT);

      textTags.forEach(tag => {
        expect(getElementTypeByTag(tag)).toBe(ELEMENT_TYPES.TEXT);
      });
    });

    it('should be consistent with getElementTypeByTag for BOX', () => {
      const boxTags = getElementTagsByType(ELEMENT_TYPES.BOX);

      boxTags.forEach(tag => {
        expect(getElementTypeByTag(tag)).toBe(ELEMENT_TYPES.BOX);
      });
    });
  });
});

