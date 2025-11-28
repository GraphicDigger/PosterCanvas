import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTokenMutation } from './useTokenMutation';

// Mock Redux hooks
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

// Mock actions
vi.mock('../store', () => ({
  addToken: vi.fn(),
  updateToken: vi.fn(),
  removeTokensFromCollection: vi.fn(),
}));

import { useDispatch } from 'react-redux';
import { addToken, updateToken, removeTokensFromCollection } from '../store';

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
    expect(result.current).toHaveProperty('removeTokensFromCollection');
    expect(typeof result.current.addToken).toBe('function');
    expect(typeof result.current.updateToken).toBe('function');
    expect(typeof result.current.removeTokensFromCollection).toBe('function');
  });

  it('should dispatch addToken action', () => {
    const mockToken = { id: 'token-1', name: 'Primary Color', value: '#ff0000' };
    addToken.mockReturnValue({ type: 'tokens/addToken', payload: mockToken });

    const { result } = renderHook(() => useTokenMutation());

    result.current.addToken(mockToken);

    expect(addToken).toHaveBeenCalledWith(mockToken);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'tokens/addToken', payload: mockToken });
  });

  it('should dispatch updateToken action with id and updates', () => {
    const tokenId = 'token-1';
    const updates = { name: 'Updated Color', value: '#00ff00' };
    const token = { id: tokenId, ...updates };
    updateToken.mockReturnValue({ type: 'tokens/updateToken', payload: token });

    const { result } = renderHook(() => useTokenMutation());

    result.current.updateToken(token);

    expect(updateToken).toHaveBeenCalledWith(token);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'tokens/updateToken', payload: token });
  });

  it('should dispatch removeTokensFromCollection action', () => {
    const collectionId = 'collection-1';
    removeTokensFromCollection.mockReturnValue({ type: 'tokens/removeTokensFromCollection', payload: collectionId });

    const { result } = renderHook(() => useTokenMutation());

    result.current.removeTokensFromCollection(collectionId);

    expect(removeTokensFromCollection).toHaveBeenCalledWith(collectionId);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'tokens/removeTokensFromCollection', payload: collectionId });
  });

  it('should handle addToken with partial token data', () => {
    const partialToken = { name: 'New Token', value: '#0000ff' };
    addToken.mockReturnValue({ type: 'tokens/addToken', payload: partialToken });

    const { result } = renderHook(() => useTokenMutation());

    result.current.addToken(partialToken);

    expect(addToken).toHaveBeenCalledWith(partialToken);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'tokens/addToken', payload: partialToken });
  });

  it('should handle updateToken with empty updates', () => {
    const tokenId = 'token-1';
    const updates = {};
    const token = { id: tokenId, ...updates };
    updateToken.mockReturnValue({ type: 'tokens/updateToken', payload: token });

    const { result } = renderHook(() => useTokenMutation());

    result.current.updateToken(token);

    expect(updateToken).toHaveBeenCalledWith(token);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'tokens/updateToken', payload: token });
  });

  it('should handle multiple mutations in sequence', () => {
    const token1 = { id: 'token-1', name: 'Token 1' };
    const token2 = { id: 'token-2', name: 'Token 2' };

    addToken.mockReturnValue({ type: 'tokens/addToken', payload: token1 });
    updateToken.mockReturnValue({ type: 'tokens/updateToken', payload: { id: 'token-2', updates: token2 } });

    const { result } = renderHook(() => useTokenMutation());

    result.current.addToken(token1);
    result.current.updateToken('token-2', token2);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: 'tokens/addToken', payload: token1 });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, { type: 'tokens/updateToken', payload: { id: 'token-2', updates: token2 } });
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
    const tokenId = 'token-1';
    const updatesWithValidation = {
      name: 'Token',
      value: '#ff0000',
      isValid: true,
      validationErrors: [],
    };
    const token = { id: tokenId, ...updatesWithValidation };
    updateToken.mockReturnValue({ type: 'tokens/updateToken', payload: token });

    const { result } = renderHook(() => useTokenMutation());

    result.current.updateToken(token);

    expect(updateToken).toHaveBeenCalledWith(token);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'tokens/updateToken', payload: token });
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
    const tokenId = 'token-1';
    const updatesWithCustomProps = {
      name: 'Token',
      value: '#ff0000',
      customProperty: 'customValue',
    };
    const token = { id: tokenId, ...updatesWithCustomProps };
    updateToken.mockReturnValue({ type: 'tokens/updateToken', payload: token });

    const { result } = renderHook(() => useTokenMutation());

    result.current.updateToken(token);

    expect(updateToken).toHaveBeenCalledWith(token);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'tokens/updateToken', payload: token });
  });
});
