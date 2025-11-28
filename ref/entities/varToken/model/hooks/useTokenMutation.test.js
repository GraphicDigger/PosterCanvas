import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTokenMutation } from './useTokenMutation';

// Mock Redux hooks
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

// Mock actions
vi.mock('../store/slice', () => ({
  addToken: vi.fn(),
  updateToken: vi.fn(),
  removeToken: vi.fn(),
}));

import { useDispatch } from 'react-redux';
import { addToken, updateToken, removeToken } from '../store/slice';

describe('useTokenMutation', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useDispatch.mockReturnValue(mockDispatch);
  });

  it('should provide mutation functions', () => {
    const { result } = renderHook(() => useTokenMutation());

    expect(result.current).toHaveProperty('addToken');
    expect(result.current).toHaveProperty('updateToken');
    expect(result.current).toHaveProperty('removeToken');
    expect(typeof result.current.addToken).toBe('function');
    expect(typeof result.current.updateToken).toBe('function');
    expect(typeof result.current.removeToken).toBe('function');
  });

  it('should dispatch addToken action', () => {
    const mockToken = { id: 'token-1', name: 'Primary Color', value: '#ff0000' };
    addToken.mockReturnValue({ type: 'tokens/addToken', payload: mockToken });

    const { result } = renderHook(() => useTokenMutation());

    result.current.addToken(mockToken);

    expect(addToken).toHaveBeenCalledWith(mockToken);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'tokens/addToken', payload: mockToken });
  });

  it('should dispatch updateToken action', () => {
    const mockToken = { id: 'token-1', name: 'Updated Color', value: '#00ff00' };
    updateToken.mockReturnValue({ type: 'tokens/updateToken', payload: mockToken });

    const { result } = renderHook(() => useTokenMutation());

    result.current.updateToken(mockToken);

    expect(updateToken).toHaveBeenCalledWith(mockToken);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'tokens/updateToken', payload: mockToken });
  });

  it('should dispatch removeToken action', () => {
    const tokenId = 'token-1';
    removeToken.mockReturnValue({ type: 'tokens/removeToken', payload: tokenId });

    const { result } = renderHook(() => useTokenMutation());

    result.current.removeToken(tokenId);

    expect(removeToken).toHaveBeenCalledWith(tokenId);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'tokens/removeToken', payload: tokenId });
  });

  it('should handle addToken with partial token data', () => {
    const partialToken = { name: 'New Token', value: '#0000ff' };
    addToken.mockReturnValue({ type: 'tokens/addToken', payload: partialToken });

    const { result } = renderHook(() => useTokenMutation());

    result.current.addToken(partialToken);

    expect(addToken).toHaveBeenCalledWith(partialToken);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'tokens/addToken', payload: partialToken });
  });

  it('should handle updateToken with ID only', () => {
    const tokenUpdate = { id: 'token-1' };
    updateToken.mockReturnValue({ type: 'tokens/updateToken', payload: tokenUpdate });

    const { result } = renderHook(() => useTokenMutation());

    result.current.updateToken(tokenUpdate);

    expect(updateToken).toHaveBeenCalledWith(tokenUpdate);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'tokens/updateToken', payload: tokenUpdate });
  });

  it('should handle removeToken with string ID', () => {
    const tokenId = 'token-1';
    removeToken.mockReturnValue({ type: 'tokens/removeToken', payload: tokenId });

    const { result } = renderHook(() => useTokenMutation());

    result.current.removeToken(tokenId);

    expect(removeToken).toHaveBeenCalledWith(tokenId);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'tokens/removeToken', payload: tokenId });
  });

  it('should handle removeToken with object containing ID', () => {
    const tokenObject = { id: 'token-1' };
    removeToken.mockReturnValue({ type: 'tokens/removeToken', payload: tokenObject });

    const { result } = renderHook(() => useTokenMutation());

    result.current.removeToken(tokenObject);

    expect(removeToken).toHaveBeenCalledWith(tokenObject);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'tokens/removeToken', payload: tokenObject });
  });

  it('should handle multiple mutations in sequence', () => {
    const token1 = { id: 'token-1', name: 'Token 1' };
    const token2 = { id: 'token-2', name: 'Token 2' };

    addToken.mockReturnValue({ type: 'tokens/addToken', payload: token1 });
    updateToken.mockReturnValue({ type: 'tokens/updateToken', payload: token2 });

    const { result } = renderHook(() => useTokenMutation());

    result.current.addToken(token1);
    result.current.updateToken(token2);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: 'tokens/addToken', payload: token1 });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, { type: 'tokens/updateToken', payload: token2 });
  });

  it('should handle mutation with metadata', () => {
    const tokenWithMetadata = {
      id: 'token-1',
      name: 'Token',
      value: '#ff0000',
      metadata: { description: 'Primary color' },
    };
    addToken.mockReturnValue({ type: 'tokens/addToken', payload: tokenWithMetadata });

    const { result } = renderHook(() => useTokenMutation());

    result.current.addToken(tokenWithMetadata);

    expect(addToken).toHaveBeenCalledWith(tokenWithMetadata);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'tokens/addToken', payload: tokenWithMetadata });
  });

  it('should handle mutation with validation', () => {
    const tokenWithValidation = {
      id: 'token-1',
      name: 'Token',
      value: '#ff0000',
      isValid: true,
      validationErrors: [],
    };
    updateToken.mockReturnValue({ type: 'tokens/updateToken', payload: tokenWithValidation });

    const { result } = renderHook(() => useTokenMutation());

    result.current.updateToken(tokenWithValidation);

    expect(updateToken).toHaveBeenCalledWith(tokenWithValidation);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'tokens/updateToken', payload: tokenWithValidation });
  });

  it('should handle mutation with timestamps', () => {
    const tokenWithTimestamps = {
      id: 'token-1',
      name: 'Token',
      value: '#ff0000',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-02T00:00:00Z',
    };
    addToken.mockReturnValue({ type: 'tokens/addToken', payload: tokenWithTimestamps });

    const { result } = renderHook(() => useTokenMutation());

    result.current.addToken(tokenWithTimestamps);

    expect(addToken).toHaveBeenCalledWith(tokenWithTimestamps);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'tokens/addToken', payload: tokenWithTimestamps });
  });

  it('should handle mutation with custom properties', () => {
    const tokenWithCustomProps = {
      id: 'token-1',
      name: 'Token',
      value: '#ff0000',
      customProperty: 'customValue',
    };
    updateToken.mockReturnValue({ type: 'tokens/updateToken', payload: tokenWithCustomProps });

    const { result } = renderHook(() => useTokenMutation());

    result.current.updateToken(tokenWithCustomProps);

    expect(updateToken).toHaveBeenCalledWith(tokenWithCustomProps);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'tokens/updateToken', payload: tokenWithCustomProps });
  });
});

