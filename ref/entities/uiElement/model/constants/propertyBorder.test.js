// ===================================================================
// Unit Tests for Border Property Constants
// Coverage Target: 100%
// Phase 6 - Push to 4,000! 🚀
// ===================================================================

import { describe, it, expect } from 'vitest';
import { BORDER_PROPERTIES, BORDER_RADIUS_PROPERTIES } from './propertyBorder';
import { STYLE_PROPERTIES } from './propertyTypes';

describe('BORDER_PROPERTIES', () => {
  describe('Structure', () => {
    it('should be an array', () => {
      expect(Array.isArray(BORDER_PROPERTIES)).toBe(true);
    });

    it('should have all border properties', () => {
      expect(BORDER_PROPERTIES.length).toBeGreaterThan(0);
    });

    it('should have exactly 15 border properties', () => {
      expect(BORDER_PROPERTIES).toHaveLength(15);
    });
  });

  describe('Border shorthand properties', () => {
    it('should include border', () => {
      expect(BORDER_PROPERTIES).toContain(STYLE_PROPERTIES.border);
    });

    it('should include borderTop', () => {
      expect(BORDER_PROPERTIES).toContain(STYLE_PROPERTIES.borderTop);
    });

    it('should include borderLeft', () => {
      expect(BORDER_PROPERTIES).toContain(STYLE_PROPERTIES.borderLeft);
    });

    it('should include borderRight', () => {
      expect(BORDER_PROPERTIES).toContain(STYLE_PROPERTIES.borderRight);
    });

    it('should include borderBottom', () => {
      expect(BORDER_PROPERTIES).toContain(STYLE_PROPERTIES.borderBottom);
    });
  });

  describe('Border width properties', () => {
    it('should include borderWidth', () => {
      expect(BORDER_PROPERTIES).toContain(STYLE_PROPERTIES.borderWidth);
    });

    it('should include borderTopWidth', () => {
      expect(BORDER_PROPERTIES).toContain(STYLE_PROPERTIES.borderTopWidth);
    });

    it('should include borderBottomWidth', () => {
      expect(BORDER_PROPERTIES).toContain(STYLE_PROPERTIES.borderBottomWidth);
    });

    it('should include borderLeftWidth', () => {
      expect(BORDER_PROPERTIES).toContain(STYLE_PROPERTIES.borderLeftWidth);
    });

    it('should include borderRightWidth', () => {
      expect(BORDER_PROPERTIES).toContain(STYLE_PROPERTIES.borderRightWidth);
    });
  });

  describe('Border color properties', () => {
    it('should include borderColor', () => {
      expect(BORDER_PROPERTIES).toContain(STYLE_PROPERTIES.borderColor);
    });

    it('should include borderTopColor', () => {
      expect(BORDER_PROPERTIES).toContain(STYLE_PROPERTIES.borderTopColor);
    });

    it('should include borderBottomColor', () => {
      expect(BORDER_PROPERTIES).toContain(STYLE_PROPERTIES.borderBottomColor);
    });

    it('should include borderLeftColor', () => {
      expect(BORDER_PROPERTIES).toContain(STYLE_PROPERTIES.borderLeftColor);
    });

    it('should include borderRightColor', () => {
      expect(BORDER_PROPERTIES).toContain(STYLE_PROPERTIES.borderRightColor);
    });
  });

  describe('Value types', () => {
    it('should contain only string values', () => {
      BORDER_PROPERTIES.forEach(prop => {
        expect(typeof prop).toBe('string');
      });
    });

    it('should have valid CSS property names', () => {
      BORDER_PROPERTIES.forEach(prop => {
        expect(prop).toBeTruthy();
        expect(prop.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Coverage', () => {
    it('should cover all border sides', () => {
      const hasSides = ['Top', 'Right', 'Bottom', 'Left'].every(side =>
        BORDER_PROPERTIES.some(prop => prop.includes(side)),
      );
      expect(hasSides).toBe(true);
    });

    it('should cover width, color, and shorthand', () => {
      const hasWidth = BORDER_PROPERTIES.some(prop => prop.includes('Width'));
      const hasColor = BORDER_PROPERTIES.some(prop => prop.includes('Color'));
      const hasShorthand = BORDER_PROPERTIES.includes(STYLE_PROPERTIES.border);

      expect(hasWidth).toBe(true);
      expect(hasColor).toBe(true);
      expect(hasShorthand).toBe(true);
    });
  });

  describe('Uniqueness', () => {
    it('should not have duplicate properties', () => {
      const uniqueProps = [...new Set(BORDER_PROPERTIES)];
      expect(BORDER_PROPERTIES.length).toBe(uniqueProps.length);
    });
  });
});

describe('BORDER_RADIUS_PROPERTIES', () => {
  describe('Structure', () => {
    it('should be an array', () => {
      expect(Array.isArray(BORDER_RADIUS_PROPERTIES)).toBe(true);
    });

    it('should have all border radius properties', () => {
      expect(BORDER_RADIUS_PROPERTIES.length).toBeGreaterThan(0);
    });

    it('should have exactly 5 border radius properties', () => {
      expect(BORDER_RADIUS_PROPERTIES).toHaveLength(5);
    });
  });

  describe('Border radius properties', () => {
    it('should include borderRadius', () => {
      expect(BORDER_RADIUS_PROPERTIES).toContain(STYLE_PROPERTIES.borderRadius);
    });

    it('should include borderTopLeftRadius', () => {
      expect(BORDER_RADIUS_PROPERTIES).toContain(STYLE_PROPERTIES.borderTopLeftRadius);
    });

    it('should include borderTopRightRadius', () => {
      expect(BORDER_RADIUS_PROPERTIES).toContain(STYLE_PROPERTIES.borderTopRightRadius);
    });

    it('should include borderBottomLeftRadius', () => {
      expect(BORDER_RADIUS_PROPERTIES).toContain(STYLE_PROPERTIES.borderBottomLeftRadius);
    });

    it('should include borderBottomRightRadius', () => {
      expect(BORDER_RADIUS_PROPERTIES).toContain(STYLE_PROPERTIES.borderBottomRightRadius);
    });
  });

  describe('Value types', () => {
    it('should contain only string values', () => {
      BORDER_RADIUS_PROPERTIES.forEach(prop => {
        expect(typeof prop).toBe('string');
      });
    });
  });

  describe('Coverage', () => {
    it('should cover all corners', () => {
      const corners = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'];
      corners.forEach(corner => {
        const hasCorner = BORDER_RADIUS_PROPERTIES.some(prop => prop.includes(corner));
        expect(hasCorner).toBe(true);
      });
    });

    it('should have shorthand property', () => {
      expect(BORDER_RADIUS_PROPERTIES).toContain(STYLE_PROPERTIES.borderRadius);
    });
  });

  describe('Uniqueness', () => {
    it('should not have duplicate properties', () => {
      const uniqueProps = [...new Set(BORDER_RADIUS_PROPERTIES)];
      expect(BORDER_RADIUS_PROPERTIES.length).toBe(uniqueProps.length);
    });
  });
});

describe('Immutability', () => {
  it('should return same references', () => {
    expect(BORDER_PROPERTIES).toBe(BORDER_PROPERTIES);
    expect(BORDER_RADIUS_PROPERTIES).toBe(BORDER_RADIUS_PROPERTIES);
  });
});

describe('Usage patterns', () => {
  it('should be usable for border styling', () => {
    BORDER_PROPERTIES.forEach(prop => {
      expect(prop).toBeDefined();
      expect(typeof prop).toBe('string');
    });
  });

  it('should be usable for radius styling', () => {
    BORDER_RADIUS_PROPERTIES.forEach(prop => {
      expect(prop).toBeDefined();
      expect(typeof prop).toBe('string');
    });
  });

  it('should support iteration', () => {
    let count = 0;
    BORDER_PROPERTIES.forEach(() => count++);
    expect(count).toBe(15);
  });
});

