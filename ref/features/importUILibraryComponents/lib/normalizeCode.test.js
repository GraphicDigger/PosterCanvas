// ===================================================================
// Unit Tests for normalizeCode - Component Code Normalization
// Coverage Target: 100%
// Phase 5 - Final Push: Feature Utilities (Pushing to 3,000!)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import { normalizeCode } from './normalizeCode';
import { ENTITY_KINDS } from '../../../shared/constants';

// Mock uuid
vi.mock('uuid', () => ({
  v4: vi.fn(() => 'mock-uuid-1234'),
}));

describe('normalizeCode', () => {
  it('should return empty array for null component', () => {
    const result = normalizeCode(null);
    expect(result).toEqual([]);
  });

  it('should return empty array for undefined component', () => {
    const result = normalizeCode(undefined);
    expect(result).toEqual([]);
  });

  it('should create JSX and CSS code objects', () => {
    const component = {
      id: 'button-123',
      name: 'Button',
      jsx: 'const Button = () => <button>Click</button>',
      css: '.button { color: blue; }',
    };

    const result = normalizeCode(component);

    expect(result).toHaveLength(2);
    expect(result[0].lang).toBe('jsx');
    expect(result[1].lang).toBe('css');
  });

  it('should include component ID in code IDs', () => {
    const component = {
      id: 'input-456',
      name: 'Input',
      jsx: 'const Input = () => <input />',
      css: '.input { border: 1px solid gray; }',
    };

    const result = normalizeCode(component);

    expect(result[0].id).toContain('input-456');
    expect(result[1].id).toContain('input-456');
  });

  it('should set correct entity kinds', () => {
    const component = {
      id: 'comp-1',
      name: 'Component',
      jsx: 'code',
      css: 'styles',
    };

    const result = normalizeCode(component);

    expect(result[0].kind).toBe(ENTITY_KINDS.CODE);
    expect(result[0].type).toBe(ENTITY_KINDS.COMPONENT);
    expect(result[1].kind).toBe(ENTITY_KINDS.CODE);
    expect(result[1].type).toBe(ENTITY_KINDS.COMPONENT);
  });

  it('should use component name in code objects', () => {
    const component = {
      id: 'comp-2',
      name: 'MyButton',
      jsx: 'jsx code',
      css: 'css code',
    };

    const result = normalizeCode(component);

    expect(result[0].name).toBe('MyButton');
    expect(result[1].name).toBe('MyButton');
  });

  it('should include JSX content', () => {
    const jsxContent = 'const Button = ({ label }) => <button>{label}</button>';
    const component = {
      id: 'comp-3',
      name: 'Button',
      jsx: jsxContent,
      css: '',
    };

    const result = normalizeCode(component);

    expect(result[0].content).toBe(jsxContent);
  });

  it('should include CSS content', () => {
    const cssContent = '.button { background: red; padding: 10px; }';
    const component = {
      id: 'comp-4',
      name: 'Button',
      jsx: '',
      css: cssContent,
    };

    const result = normalizeCode(component);

    expect(result[1].content).toBe(cssContent);
  });

  it('should set ownership with component ID', () => {
    const component = {
      id: 'comp-5',
      name: 'Component',
      jsx: 'code',
      css: 'styles',
    };

    const result = normalizeCode(component);

    expect(result[0].ownership).toEqual({
      type: ENTITY_KINDS.COMPONENT,
      componentId: 'comp-5',
    });
    expect(result[1].ownership).toEqual({
      type: ENTITY_KINDS.COMPONENT,
      componentId: 'comp-5',
    });
  });

  it('should handle empty JSX', () => {
    const component = {
      id: 'comp-6',
      name: 'Component',
      jsx: '',
      css: 'styles',
    };

    const result = normalizeCode(component);

    expect(result[0].content).toBe('');
  });

  it('should handle empty CSS', () => {
    const component = {
      id: 'comp-7',
      name: 'Component',
      jsx: 'code',
      css: '',
    };

    const result = normalizeCode(component);

    expect(result[1].content).toBe('');
  });

  it('should handle undefined JSX', () => {
    const component = {
      id: 'comp-8',
      name: 'Component',
      css: 'styles',
    };

    const result = normalizeCode(component);

    expect(result[0].content).toBeUndefined();
  });

  it('should handle undefined CSS', () => {
    const component = {
      id: 'comp-9',
      name: 'Component',
      jsx: 'code',
    };

    const result = normalizeCode(component);

    expect(result[1].content).toBeUndefined();
  });

  it('should handle multi-line JSX content', () => {
    const jsxContent = `
      const Button = ({ label }) => {
        return (
          <button>{label}</button>
        );
      };
    `;
    const component = {
      id: 'comp-10',
      name: 'Button',
      jsx: jsxContent,
      css: '',
    };

    const result = normalizeCode(component);

    expect(result[0].content).toBe(jsxContent);
  });

  it('should handle multi-line CSS content', () => {
    const cssContent = `
      .button {
        background: blue;
        color: white;
        padding: 10px 20px;
      }
    `;
    const component = {
      id: 'comp-11',
      name: 'Button',
      jsx: '',
      css: cssContent,
    };

    const result = normalizeCode(component);

    expect(result[1].content).toBe(cssContent);
  });

  it('should generate unique IDs for JSX and CSS', () => {
    const component = {
      id: 'comp-12',
      name: 'Component',
      jsx: 'code',
      css: 'styles',
    };

    const result = normalizeCode(component);

    expect(result[0].id).not.toBe(result[1].id);
    expect(result[0].id).toContain('jsx');
    expect(result[1].id).toContain('css');
  });

  it('should handle component with special characters in name', () => {
    const component = {
      id: 'comp-13',
      name: 'My-Button_Component',
      jsx: 'code',
      css: 'styles',
    };

    const result = normalizeCode(component);

    expect(result[0].name).toBe('My-Button_Component');
    expect(result[1].name).toBe('My-Button_Component');
  });

  it('should handle component with special characters in ID', () => {
    const component = {
      id: 'my-comp_123',
      name: 'Component',
      jsx: 'code',
      css: 'styles',
    };

    const result = normalizeCode(component);

    expect(result[0].id).toContain('my-comp_123');
    expect(result[1].id).toContain('my-comp_123');
  });

  it('should always return array with 2 elements when component exists', () => {
    const component = {
      id: 'comp-14',
      name: 'Component',
      jsx: 'code',
      css: 'styles',
    };

    const result = normalizeCode(component);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
  });

  it('should handle very long JSX content', () => {
    const longJsx = 'a'.repeat(10000);
    const component = {
      id: 'comp-15',
      name: 'Component',
      jsx: longJsx,
      css: '',
    };

    const result = normalizeCode(component);

    expect(result[0].content).toBe(longJsx);
    expect(result[0].content.length).toBe(10000);
  });

  it('should handle very long CSS content', () => {
    const longCss = 'b'.repeat(10000);
    const component = {
      id: 'comp-16',
      name: 'Component',
      jsx: '',
      css: longCss,
    };

    const result = normalizeCode(component);

    expect(result[1].content).toBe(longCss);
    expect(result[1].content.length).toBe(10000);
  });
});

