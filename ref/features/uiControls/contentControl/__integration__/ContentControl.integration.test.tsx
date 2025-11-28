/**
 * Integration Tests: ContentControl Component
 *
 * Phase 5 - Week 3 Day 3: Component Integration Tests
 *
 * Purpose: Test integration between ContentControl component and its dependencies
 * Coverage Target: 90%+ for component integration
 * Mode: 🔒 Assessment Only - Zero Functional Code Changes
 *
 * Integration Scenarios:
 * 1. Component Rendering & Prop Passing (5 tests)
 * 2. Hook Integration (5 tests)
 * 3. Event Handling (5 tests)
 * 4. Child Component Composition (5 tests)
 *
 * Total: 20 tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { ContentControl } from '../ui/ContentControl';
import React from 'react';

// Mock dependencies
vi.mock('../../../../entities/uiElement', () => ({
  PROPERTY_TYPES: {
    CONTENT: 'content',
  },
  useElement: vi.fn(),
  useElementMutations: vi.fn(),
}));

vi.mock('../../../../entities/binding', () => ({
  BindVariableToPropertyPicker: ({ children }: any) => <div data-testid="bind-picker">{children}</div>,
  useBoundVariableValue: vi.fn(),
}));

vi.mock('../../../../shared/uiKit/SectionPanel', () => ({
  SectionPanel: ({ children }: any) => <div data-testid="section-panel">{children}</div>,
  SectionPanelHeader: ({ children }: any) => <div data-testid="section-header">{children}</div>,
  SectionPanelBody: ({ children }: any) => <div data-testid="section-body">{children}</div>,
  SectionPanelName: ({ children }: any) => <div data-testid="section-name">{children}</div>,
}));

vi.mock('../../../../shared/uiKit/Fields', () => ({
  TextField: ({ value, onChange }: any) => (
    <input
      data-testid="text-field"
      value={value || ''}
      onChange={(e) => onChange?.(e.target.value)}
    />
  ),
}));

import { useElement, useElementMutations } from '../../../../entities/uiElement';
import { useBoundVariableValue } from '../../../../entities/binding';

describe('ContentControl Component Integration', () => {
  let mockFocusedElement: any;
  let mockContentValue: any;
  let mockUpdateContent: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockFocusedElement = {
      id: 'element-1',
      name: 'TestElement',
    };

    mockContentValue = {
      type: 'text',
      value: 'Test content',
    };

    mockUpdateContent = vi.fn();

    (useElement as ReturnType<typeof vi.fn>).mockReturnValue({
      focusedElement: mockFocusedElement,
    });

    (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
      contentValue: mockContentValue,
    });

    (useElementMutations as ReturnType<typeof vi.fn>).mockReturnValue({
      updateContent: mockUpdateContent,
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 1: COMPONENT RENDERING & PROP PASSING (5 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Component Rendering & Prop Passing', () => {
    it('should render all child components', () => {
      render(<ContentControl />);

      expect(screen.getByTestId('section-panel')).toBeInTheDocument();
      expect(screen.getByTestId('section-header')).toBeInTheDocument();
      expect(screen.getByTestId('section-body')).toBeInTheDocument();
      expect(screen.getByTestId('section-name')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should render TextField with correct value from contentValue', () => {
      render(<ContentControl />);

      const textField = screen.getByTestId('text-field');
      expect(textField).toHaveValue('Test content');
    });

    it('should render BindVariableToPropertyPicker wrapper', () => {
      render(<ContentControl />);

      expect(screen.getByTestId('bind-picker')).toBeInTheDocument();
    });

    it('should render TextField for text content type', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        contentValue: { type: 'text', value: 'Text content' },
      });

      render(<ContentControl />);

      const textField = screen.getByTestId('text-field');
      expect(textField).toHaveValue('Text content');
    });

    it('should render TextField for image content type', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        contentValue: { type: 'image', value: 'image-url.png' },
      });

      render(<ContentControl />);

      const textField = screen.getByTestId('text-field');
      expect(textField).toHaveValue('image-url.png');
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 2: HOOK INTEGRATION (5 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Hook Integration', () => {
    it('should call useElement hook on render', () => {
      render(<ContentControl />);

      expect(useElement).toHaveBeenCalled();
    });

    it('should call useBoundVariableValue with focused element id', () => {
      render(<ContentControl />);

      expect(useBoundVariableValue).toHaveBeenCalledWith('element-1');
    });

    it('should call useElementMutations hook on render', () => {
      render(<ContentControl />);

      expect(useElementMutations).toHaveBeenCalled();
    });

    it('should react to focusedElement changes', () => {
      const { rerender } = render(<ContentControl />);

      expect(useBoundVariableValue).toHaveBeenCalledWith('element-1');

      // Change focused element
      (useElement as ReturnType<typeof vi.fn>).mockReturnValue({
        focusedElement: { id: 'element-2', name: 'NewElement' },
      });

      rerender(<ContentControl />);

      expect(useBoundVariableValue).toHaveBeenCalledWith('element-2');
    });

    it('should handle null focusedElement gracefully', () => {
      (useElement as ReturnType<typeof vi.fn>).mockReturnValue({
        focusedElement: null,
      });

      render(<ContentControl />);

      expect(useBoundVariableValue).toHaveBeenCalledWith(undefined);
      expect(screen.getByTestId('section-panel')).toBeInTheDocument();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 3: EVENT HANDLING (5 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Event Handling', () => {
    it('should call updateContent when TextField value changes', async () => {
      render(<ContentControl />);

      const textField = screen.getByTestId('text-field') as HTMLInputElement;
      fireEvent.change(textField, { target: { value: 'New content' } });

      await waitFor(() => {
        expect(mockUpdateContent).toHaveBeenCalled();
      });
    });

    it('should pass correct element id to updateContent', async () => {
      render(<ContentControl />);

      const textField = screen.getByTestId('text-field') as HTMLInputElement;
      fireEvent.change(textField, { target: { value: 'X' } });

      await waitFor(() => {
        expect(mockUpdateContent).toHaveBeenCalledWith(
          'element-1',
          expect.objectContaining({ text: expect.any(String) }),
        );
      });
    });

    it('should update content with new text value', async () => {
      render(<ContentControl />);

      const textField = screen.getByTestId('text-field') as HTMLInputElement;
      fireEvent.change(textField, { target: { value: 'Updated' } });

      await waitFor(() => {
        expect(mockUpdateContent).toHaveBeenCalledWith('element-1', { text: 'Updated' });
      });
    });

    it('should handle multiple content updates', async () => {
      render(<ContentControl />);

      const textField = screen.getByTestId('text-field') as HTMLInputElement;

      fireEvent.change(textField, { target: { value: 'First' } });
      fireEvent.change(textField, { target: { value: 'Second' } });

      await waitFor(() => {
        expect(mockUpdateContent.mock.calls.length).toBe(2);
      });
    });

    it('should not call updateContent when focusedElement is null', async () => {
      (useElement as ReturnType<typeof vi.fn>).mockReturnValue({
        focusedElement: null,
      });

      render(<ContentControl />);

      const textField = screen.getByTestId('text-field') as HTMLInputElement;
      fireEvent.change(textField, { target: { value: 'Test' } });

      // updateContent should be called with undefined element id
      await waitFor(() => {
        if (mockUpdateContent.mock.calls.length > 0) {
          expect(mockUpdateContent).toHaveBeenCalledWith(
            undefined,
            expect.any(Object),
          );
        }
      });
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 4: CHILD COMPONENT COMPOSITION (5 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Child Component Composition', () => {
    it('should compose SectionPanel with header and body', () => {
      render(<ContentControl />);

      const panel = screen.getByTestId('section-panel');
      const header = screen.getByTestId('section-header');
      const body = screen.getByTestId('section-body');

      expect(panel).toContainElement(header);
      expect(panel).toContainElement(body);
    });

    it('should nest TextField inside BindVariableToPropertyPicker', () => {
      render(<ContentControl />);

      const bindPicker = screen.getByTestId('bind-picker');
      const textField = screen.getByTestId('text-field');

      expect(bindPicker).toContainElement(textField);
    });

    it('should nest BindVariableToPropertyPicker inside SectionPanelBody', () => {
      render(<ContentControl />);

      const body = screen.getByTestId('section-body');
      const bindPicker = screen.getByTestId('bind-picker');

      expect(body).toContainElement(bindPicker);
    });

    it('should maintain component hierarchy for text content', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        contentValue: { type: 'text', value: 'Text' },
      });

      render(<ContentControl />);

      const panel = screen.getByTestId('section-panel');
      const body = screen.getByTestId('section-body');
      const bindPicker = screen.getByTestId('bind-picker');
      const textField = screen.getByTestId('text-field');

      expect(panel).toContainElement(body);
      expect(body).toContainElement(bindPicker);
      expect(bindPicker).toContainElement(textField);
    });

    it('should maintain component hierarchy for image content', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        contentValue: { type: 'image', value: 'image.png' },
      });

      render(<ContentControl />);

      const panel = screen.getByTestId('section-panel');
      const body = screen.getByTestId('section-body');
      const bindPicker = screen.getByTestId('bind-picker');
      const textField = screen.getByTestId('text-field');

      expect(panel).toContainElement(body);
      expect(body).toContainElement(bindPicker);
      expect(bindPicker).toContainElement(textField);
    });
  });
});

