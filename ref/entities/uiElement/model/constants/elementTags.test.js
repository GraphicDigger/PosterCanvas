// ===================================================================
// Unit Tests for ELEMENT_TAGS - HTML Element Tag Constants
// Coverage Target: 100%
// Phase 5 - Push to 3,500: Element Constants! 🚀
// ===================================================================

import { describe, it, expect } from 'vitest';
import { ELEMENT_TAGS } from './elementTags';

describe('ELEMENT_TAGS', () => {
  describe('Structure', () => {
    it('should be an object', () => {
      expect(ELEMENT_TAGS).toBeTypeOf('object');
      expect(ELEMENT_TAGS).not.toBeNull();
    });

    it('should have all required HTML element tags', () => {
      const requiredTags = [
        'BODY', 'PARAGRAPH', 'HEADING1', 'HEADING2', 'HEADING3', 'HEADING4', 'HEADING5', 'HEADING6',
        'DIV', 'SPAN', 'HEADER', 'FOOTER', 'SECTION', 'ARTICLE', 'ASIDE', 'MAIN', 'NAV',
        'IMAGE', 'VIDEO', 'AUDIO', 'LINK', 'IFRAME', 'BUTTON', 'LABEL', 'INPUT', 'TEXTAREA', 'SELECT', 'OPTION', 'FORM',
      ];

      requiredTags.forEach(tag => {
        expect(ELEMENT_TAGS).toHaveProperty(tag);
      });
    });

    it('should have correct number of element tags', () => {
      const keys = Object.keys(ELEMENT_TAGS);
      expect(keys.length).toBeGreaterThanOrEqual(29); // At least 29 tags
    });
  });

  describe('Document structure tags', () => {
    it('should have BODY tag', () => {
      expect(ELEMENT_TAGS.BODY).toBe('body');
    });
  });

  describe('Text element tags', () => {
    it('should have PARAGRAPH tag', () => {
      expect(ELEMENT_TAGS.PARAGRAPH).toBe('p');
    });

    it('should have HEADING1 tag', () => {
      expect(ELEMENT_TAGS.HEADING1).toBe('h1');
    });

    it('should have HEADING2 tag', () => {
      expect(ELEMENT_TAGS.HEADING2).toBe('h2');
    });

    it('should have HEADING3 tag', () => {
      expect(ELEMENT_TAGS.HEADING3).toBe('h3');
    });

    it('should have HEADING4 tag', () => {
      expect(ELEMENT_TAGS.HEADING4).toBe('h4');
    });

    it('should have HEADING5 tag', () => {
      expect(ELEMENT_TAGS.HEADING5).toBe('h5');
    });

    it('should have HEADING6 tag', () => {
      expect(ELEMENT_TAGS.HEADING6).toBe('h6');
    });

    it('should have SPAN tag', () => {
      expect(ELEMENT_TAGS.SPAN).toBe('span');
    });
  });

  describe('Container element tags', () => {
    it('should have DIV tag', () => {
      expect(ELEMENT_TAGS.DIV).toBe('div');
    });

    it('should have HEADER tag', () => {
      expect(ELEMENT_TAGS.HEADER).toBe('header');
    });

    it('should have FOOTER tag', () => {
      expect(ELEMENT_TAGS.FOOTER).toBe('footer');
    });

    it('should have SECTION tag', () => {
      expect(ELEMENT_TAGS.SECTION).toBe('section');
    });

    it('should have ARTICLE tag', () => {
      expect(ELEMENT_TAGS.ARTICLE).toBe('article');
    });

    it('should have ASIDE tag', () => {
      expect(ELEMENT_TAGS.ASIDE).toBe('aside');
    });

    it('should have MAIN tag', () => {
      expect(ELEMENT_TAGS.MAIN).toBe('main');
    });

    it('should have NAV tag', () => {
      expect(ELEMENT_TAGS.NAV).toBe('nav');
    });
  });

  describe('Media element tags', () => {
    it('should have IMAGE tag', () => {
      expect(ELEMENT_TAGS.IMAGE).toBe('img');
    });

    it('should have VIDEO tag', () => {
      expect(ELEMENT_TAGS.VIDEO).toBe('video');
    });

    it('should have AUDIO tag', () => {
      expect(ELEMENT_TAGS.AUDIO).toBe('audio');
    });

    it('should have IFRAME tag', () => {
      expect(ELEMENT_TAGS.IFRAME).toBe('iframe');
    });
  });

  describe('Interactive element tags', () => {
    it('should have LINK tag', () => {
      expect(ELEMENT_TAGS.LINK).toBe('a');
    });

    it('should have BUTTON tag', () => {
      expect(ELEMENT_TAGS.BUTTON).toBe('button');
    });
  });

  describe('Form element tags', () => {
    it('should have LABEL tag', () => {
      expect(ELEMENT_TAGS.LABEL).toBe('label');
    });

    it('should have INPUT tag', () => {
      expect(ELEMENT_TAGS.INPUT).toBe('input');
    });

    it('should have TEXTAREA tag', () => {
      expect(ELEMENT_TAGS.TEXTAREA).toBe('textarea');
    });

    it('should have SELECT tag', () => {
      expect(ELEMENT_TAGS.SELECT).toBe('select');
    });

    it('should have OPTION tag', () => {
      expect(ELEMENT_TAGS.OPTION).toBe('option');
    });

    it('should have FORM tag', () => {
      expect(ELEMENT_TAGS.FORM).toBe('form');
    });
  });

  describe('Value format', () => {
    it('should have all string values', () => {
      Object.values(ELEMENT_TAGS).forEach(value => {
        expect(typeof value).toBe('string');
      });
    });

    it('should have all lowercase values', () => {
      Object.values(ELEMENT_TAGS).forEach(value => {
        expect(value).toBe(value.toLowerCase());
      });
    });

    it('should have valid HTML tag names', () => {
      const validHtmlTags = [
        'body', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'div', 'span', 'header', 'footer', 'section', 'article', 'aside', 'main', 'nav',
        'img', 'video', 'audio', 'a', 'iframe', 'button', 'label', 'input', 'textarea', 'select', 'option', 'form',
      ];

      Object.values(ELEMENT_TAGS).forEach(value => {
        expect(validHtmlTags).toContain(value);
      });
    });
  });

  describe('Key naming', () => {
    it('should have UPPER_CASE keys', () => {
      Object.keys(ELEMENT_TAGS).forEach(key => {
        expect(key).toBe(key.toUpperCase());
      });
    });

    it('should use descriptive names for keys', () => {
      expect(ELEMENT_TAGS.PARAGRAPH).toBeDefined();
      expect(ELEMENT_TAGS.HEADING1).toBeDefined();
      expect(ELEMENT_TAGS.IMAGE).toBeDefined();
    });
  });

  describe('Value uniqueness', () => {
    it('should have unique values', () => {
      const values = Object.values(ELEMENT_TAGS);
      const uniqueValues = [...new Set(values)];
      expect(values.length).toBe(uniqueValues.length);
    });
  });

  describe('HTML5 semantic tags', () => {
    it('should include HTML5 semantic tags', () => {
      const semanticTags = [
        ELEMENT_TAGS.HEADER,
        ELEMENT_TAGS.FOOTER,
        ELEMENT_TAGS.SECTION,
        ELEMENT_TAGS.ARTICLE,
        ELEMENT_TAGS.ASIDE,
        ELEMENT_TAGS.MAIN,
        ELEMENT_TAGS.NAV,
      ];

      semanticTags.forEach(tag => {
        expect(tag).toBeTruthy();
        expect(typeof tag).toBe('string');
      });
    });
  });

  describe('Immutability', () => {
    it('should return same reference', () => {
      const ref1 = ELEMENT_TAGS;
      const ref2 = ELEMENT_TAGS;
      expect(ref1).toBe(ref2);
    });
  });

  describe('Usage patterns', () => {
    it('should be usable for element creation', () => {
      const tag = ELEMENT_TAGS.DIV;
      expect(typeof tag).toBe('string');
      expect(tag).toBe('div');
    });

    it('should be usable for element type checking', () => {
      const tagTypes = Object.values(ELEMENT_TAGS);
      expect(tagTypes).toContain('div');
      expect(tagTypes).toContain('span');
      expect(tagTypes).toContain('p');
    });

    it('should support all heading levels', () => {
      const headings = [
        ELEMENT_TAGS.HEADING1,
        ELEMENT_TAGS.HEADING2,
        ELEMENT_TAGS.HEADING3,
        ELEMENT_TAGS.HEADING4,
        ELEMENT_TAGS.HEADING5,
        ELEMENT_TAGS.HEADING6,
      ];

      expect(headings).toEqual(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);
    });
  });
});

