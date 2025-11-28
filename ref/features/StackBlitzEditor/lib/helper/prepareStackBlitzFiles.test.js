// ===================================================================
// STACKBLITZ INTEGRATION TESTS: File Preparation
// 🔴 CRITICAL-FIRST STRATEGY - Phase 4 🔴
// File Preparation, Path Generation, Dependency Resolution
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { prepareStackBlitzFiles } from './prepareStackBlitzFiles';

// Mock dependencies
vi.mock('../../model', () => ({
  ID_TO_PATH_MAP: {
    'file-1': 'src/App.tsx',
    'file-2': 'src/index.tsx',
    'file-3': 'src/App.css',
  },
}));

vi.mock('../../../../entities/code', () => ({
  CODE_EXTENSIONS: {
    js: '.js',
    jsx: '.jsx',
    ts: '.ts',
    tsx: '.tsx',
    css: '.css',
    html: '.html',
  },
  CODE_TYPES: {
    SCREEN: 'screen',
    COMPONENT: 'component',
    COMPONENT_STYLE: 'componentStyle',
    CUSTOM: 'custom',
    CODEBASE: 'codebase',
  },
}));

describe('StackBlitz File Preparation - CRITICAL BUSINESS LOGIC', () => {

  // ===================================================================
  // Section 1: Basic File Preparation (10 tests)
  // ===================================================================

  describe('Basic File Preparation', () => {
    it('should return empty object for null input', async () => {
      const result = await prepareStackBlitzFiles(null);

      expect(result).toEqual({});
    });

    it('should return empty object for undefined input', async () => {
      const result = await prepareStackBlitzFiles(undefined);

      expect(result).toEqual({});
    });

    it('should prepare single file with ID_TO_PATH_MAP', async () => {
      const files = [
        { id: 'file-1', content: 'const App = () => <div>Hello</div>;' },
      ];

      const result = await prepareStackBlitzFiles(files);

      expect(result.files).toEqual({
        'src/App.tsx': 'const App = () => <div>Hello</div>;',
      });
      expect(result.allCodesWithFilePaths).toHaveLength(1);
      expect(result.allCodesWithFilePaths[0].filePath).toBe('src/App.tsx');
    });

    it('should prepare multiple files with ID_TO_PATH_MAP', async () => {
      const files = [
        { id: 'file-1', content: 'const App = () => <div>Hello</div>;' },
        { id: 'file-2', content: 'import React from "react";' },
        { id: 'file-3', content: '.app { color: red; }' },
      ];

      const result = await prepareStackBlitzFiles(files);

      expect(result.files).toEqual({
        'src/App.tsx': 'const App = () => <div>Hello</div>;',
        'src/index.tsx': 'import React from "react";',
        'src/App.css': '.app { color: red; }',
      });
      expect(result.allCodesWithFilePaths).toHaveLength(3);
    });

    it('should skip file without content', async () => {
      const files = [
        { id: 'file-1', content: '' },
        { id: 'file-2', content: 'const App = () => {};' },
      ];

      const result = await prepareStackBlitzFiles(files);

      // file-1 should be skipped because content is empty
      expect(Object.keys(result.files)).toHaveLength(1);
      expect(result.files['src/index.tsx']).toBe('const App = () => {};');
    });

    it('should skip file without filePath', async () => {
      const files = [
        { id: 'unknown-file', content: 'some content' }, // No mapping, no type
      ];

      const result = await prepareStackBlitzFiles(files);

      // Should be skipped
      expect(Object.keys(result.files)).toHaveLength(0);
    });

    it('should handle empty array', async () => {
      const result = await prepareStackBlitzFiles([]);

      expect(result.files).toEqual({});
      expect(result.allCodesWithFilePaths).toEqual([]);
    });

    it('should handle non-array input gracefully', async () => {
      const result = await prepareStackBlitzFiles({ not: 'array' });

      expect(result.files).toEqual({});
      expect(result.allCodesWithFilePaths).toEqual([]);
    });

    it('should preserve file properties in allCodesWithFilePaths', async () => {
      const files = [
        {
          id: 'file-1',
          name: 'App',
          content: 'content',
          lang: 'tsx',
          metadata: { author: 'test' },
        },
      ];

      const result = await prepareStackBlitzFiles(files);

      expect(result.allCodesWithFilePaths[0]).toMatchObject({
        id: 'file-1',
        name: 'App',
        content: 'content',
        lang: 'tsx',
        metadata: { author: 'test' },
        filePath: 'src/App.tsx',
      });
    });

    it('should handle error during file processing', async () => {
      // Create file with circular reference that might cause errors
      const circularFile = { id: 'file-1', content: 'test' };
      circularFile.self = circularFile;

      const files = [circularFile];

      // Should not throw, should return empty result
      const result = await prepareStackBlitzFiles(files);

      expect(result).toBeDefined();
      expect(result.files).toBeDefined();
    });
  });

  // ===================================================================
  // Section 2: Path Generation by Code Type (15 tests)
  // ===================================================================

  describe('Path Generation by Code Type', () => {
    it('should generate path for SCREEN type', async () => {
      const files = [
        {
          id: 'screen-1',
          name: 'Home Screen',
          type: 'screen',
          lang: 'tsx',
          content: 'const HomeScreen = () => {};',
        },
      ];

      const result = await prepareStackBlitzFiles(files);

      expect(result.files['src/screens/HomeScreen.tsx']).toBeDefined();
    });

    it('should generate path for COMPONENT type', async () => {
      const files = [
        {
          id: 'comp-1',
          name: 'Button',
          type: 'component',
          lang: 'jsx',
          content: 'const Button = () => {};',
        },
      ];

      const result = await prepareStackBlitzFiles(files);

      expect(result.files['src/components/Button.jsx']).toBeDefined();
    });

    it('should generate path for COMPONENT_STYLE type', async () => {
      const files = [
        {
          id: 'style-1',
          name: 'Button',
          type: 'componentStyle',
          content: '.button { color: blue; }',
        },
      ];

      const result = await prepareStackBlitzFiles(files);

      expect(result.files['src/components/Button.css']).toBeDefined();
    });

    it('should generate path for CUSTOM type', async () => {
      const files = [
        {
          id: 'custom-1',
          name: 'Utils',
          type: 'custom',
          lang: 'ts',
          content: 'export const utils = {};',
        },
      ];

      const result = await prepareStackBlitzFiles(files);

      expect(result.files['src/customCode/Utils.ts']).toBeDefined();
    });

    it('should generate path for CODEBASE type', async () => {
      const files = [
        {
          id: 'codebase-1',
          name: 'config',
          type: 'codebase',
          lang: 'json',
          content: '{"key": "value"}',
        },
      ];

      const result = await prepareStackBlitzFiles(files);

      expect(result.files['config']).toBeDefined();
    });

    it('should handle name with spaces', async () => {
      const files = [
        {
          id: 'comp-1',
          name: 'My Cool Component',
          type: 'component',
          lang: 'tsx',
          content: 'const MyCoolComponent = () => {};',
        },
      ];

      const result = await prepareStackBlitzFiles(files);

      // Spaces should be removed
      expect(result.files['src/components/MyCoolComponent.tsx']).toBeDefined();
    });

    it('should detect JavaScript extension', async () => {
      const files = [
        {
          id: 'comp-1',
          name: 'Button',
          type: 'component',
          lang: 'javascript',
          content: 'const Button = () => {};',
        },
      ];

      const result = await prepareStackBlitzFiles(files);

      expect(result.files['src/components/Button.js']).toBeDefined();
    });

    it('should detect TypeScript extension', async () => {
      const files = [
        {
          id: 'comp-1',
          name: 'Button',
          type: 'component',
          lang: 'typescript',
          content: 'const Button: FC = () => {};',
        },
      ];

      const result = await prepareStackBlitzFiles(files);

      expect(result.files['src/components/Button.ts']).toBeDefined();
    });

    it('should detect CSS extension', async () => {
      const files = [
        {
          id: 'style-1',
          name: 'styles',
          type: 'custom',
          lang: 'css',
          content: '.class { }',
        },
      ];

      const result = await prepareStackBlitzFiles(files);

      expect(result.files['src/customCode/styles.css']).toBeDefined();
    });

    it('should detect HTML extension', async () => {
      const files = [
        {
          id: 'html-1',
          name: 'template',
          type: 'custom',
          lang: 'html',
          content: '<div></div>',
        },
      ];

      const result = await prepareStackBlitzFiles(files);

      expect(result.files['src/customCode/template.html']).toBeDefined();
    });

    it('should detect Markdown extension', async () => {
      const files = [
        {
          id: 'md-1',
          name: 'README',
          type: 'custom',
          lang: 'markdown',
          content: '# Heading',
        },
      ];

      const result = await prepareStackBlitzFiles(files);

      expect(result.files['src/customCode/README.md']).toBeDefined();
    });

    it('should handle unknown language extension', async () => {
      const files = [
        {
          id: 'file-1',
          name: 'unknown',
          type: 'component',
          lang: 'unknown-lang',
          content: 'const x = 1;',
        },
      ];

      const result = await prepareStackBlitzFiles(files);

      // Should process file even with unknown language
      expect(result).toBeDefined();
      expect(result.allCodesWithFilePaths).toHaveLength(1);
    });

    it('should handle missing language property', async () => {
      const files = [
        {
          id: 'file-1',
          name: 'noLang',
          type: 'component',
          content: 'const x = 1;',
        },
      ];

      const result = await prepareStackBlitzFiles(files);

      // Should process file even without language
      expect(result).toBeDefined();
      expect(result.allCodesWithFilePaths).toHaveLength(1);
    });

    it('should handle default type', async () => {
      const files = [
        {
          id: 'file-unknown',
          name: 'other',
          type: 'unknown-type',
          lang: 'tsx',
          content: 'const Other = () => {};',
        },
      ];

      const result = await prepareStackBlitzFiles(files);

      // Unknown type should go to src/other/
      expect(result.files['src/other/file-unknown.tsx']).toBeDefined();
    });

    it('should handle CODEBASE type with spaces in name', async () => {
      const files = [
        {
          id: 'cb-1',
          name: 'my config file',
          type: 'codebase',
          lang: 'json',
          content: '{}',
        },
      ];

      const result = await prepareStackBlitzFiles(files);

      // Spaces should be removed
      expect(result.files['src/myconfigfile.json']).toBeDefined();
    });
  });

  // ===================================================================
  // Section 3: Edge Cases & Error Handling (10 tests)
  // ===================================================================

  describe('Edge Cases & Error Handling', () => {
    it('should handle file with null content', async () => {
      const files = [
        { id: 'file-1', content: null },
      ];

      const result = await prepareStackBlitzFiles(files);

      // Should skip file with null content
      expect(Object.keys(result.files)).toHaveLength(0);
    });

    it('should handle file with undefined content', async () => {
      const files = [
        { id: 'file-1', content: undefined },
      ];

      const result = await prepareStackBlitzFiles(files);

      // Should skip file with undefined content
      expect(Object.keys(result.files)).toHaveLength(0);
    });

    it('should handle file with very long content', async () => {
      const longContent = 'a'.repeat(100000); // 100KB
      const files = [
        { id: 'file-1', content: longContent },
      ];

      const result = await prepareStackBlitzFiles(files);

      expect(result.files['src/App.tsx']).toBe(longContent);
    });

    it('should handle file with special characters in content', async () => {
      const specialContent = '©®™€£¥@#$%^&*(){}[]|\\:;"\'<>,.?/~`';
      const files = [
        { id: 'file-1', content: specialContent },
      ];

      const result = await prepareStackBlitzFiles(files);

      expect(result.files['src/App.tsx']).toBe(specialContent);
    });

    it('should handle file with Unicode characters', async () => {
      const unicodeContent = '你好世界 مرحبا العالم Здравствуй мир 🌍🚀🎉';
      const files = [
        { id: 'file-1', content: unicodeContent },
      ];

      const result = await prepareStackBlitzFiles(files);

      expect(result.files['src/App.tsx']).toBe(unicodeContent);
    });

    it('should handle file with multiline content', async () => {
      const multilineContent = `
        import React from 'react';
        
        const App = () => {
          return <div>Hello World</div>;
        };
        
        export default App;
      `;
      const files = [
        { id: 'file-1', content: multilineContent },
      ];

      const result = await prepareStackBlitzFiles(files);

      expect(result.files['src/App.tsx']).toBe(multilineContent);
    });

    it('should handle 100+ files efficiently', async () => {
      const files = Array.from({ length: 100 }, (_, i) => ({
        id: `file-${i}`,
        name: `File${i}`,
        type: 'component',
        lang: 'tsx',
        content: `const File${i} = () => {};`,
      }));

      const startTime = performance.now();
      const result = await prepareStackBlitzFiles(files);
      const endTime = performance.now();

      expect(Object.keys(result.files)).toHaveLength(100);
      expect(endTime - startTime).toBeLessThan(100); // Should complete in under 100ms
    });

    it('should handle file with missing ID', async () => {
      const files = [
        { name: 'Test', type: 'component', lang: 'tsx', content: 'const Test = () => {};' },
      ];

      const result = await prepareStackBlitzFiles(files);

      // Should still process file based on type
      expect(result.files['src/components/Test.tsx']).toBeDefined();
    });

    it('should handle mixed valid and invalid files', async () => {
      const files = [
        { id: 'file-1', content: 'valid content' },
        { id: 'file-invalid', content: null },
        { id: 'file-2', content: 'another valid' },
        { id: 'file-invalid2', content: '' },
      ];

      const result = await prepareStackBlitzFiles(files);

      // Only valid files should be included
      expect(Object.keys(result.files)).toHaveLength(2);
      expect(result.files['src/App.tsx']).toBe('valid content');
      expect(result.files['src/index.tsx']).toBe('another valid');
    });

    it('should handle multiple files with same language', async () => {
      const files = [
        { id: 'file-1', name: 'Upper', type: 'component', lang: 'tsx', content: 'test' },
        { id: 'file-2', name: 'Lower', type: 'component', lang: 'tsx', content: 'test2' },
      ];

      const result = await prepareStackBlitzFiles(files);

      // Both files should be processed
      expect(result.allCodesWithFilePaths).toHaveLength(2);
      expect(result.allCodesWithFilePaths[0].content).toBe('test');
      expect(result.allCodesWithFilePaths[1].content).toBe('test2');
    });
  });
});
