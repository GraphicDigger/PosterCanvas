// ===================================================================
// USE ACTOR AGENTS HOOK - COMPREHENSIVE TESTS
// ===================================================================
// Entity: actorAgent
// Hooks: useActorAgents, useActorAgentsByIds
// Purpose: Provides access to actor agents from Redux store
// Coverage: All agents, selected agent, agents by IDs
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { useActorAgents, useActorAgentsByIds } from './useActorAgents';
import * as agentStore from '../store';

// Mock dependencies
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('../store', () => ({
  selectAllActorAgents: vi.fn(),
  selectSelectedActorAgent: vi.fn(),
  selectActorAgentsByIds: vi.fn(),
}));

describe('useActorAgents', () => {
  // Mock data
  const mockAgents = [
    { id: 'agent-1', name: 'Agent Smith', role: 'admin', status: 'active' },
    { id: 'agent-2', name: 'Agent Jones', role: 'moderator', status: 'active' },
    { id: 'agent-3', name: 'Agent Brown', role: 'viewer', status: 'inactive' },
  ];

  const mockSelectedAgent = mockAgents[0];

  beforeEach(() => {
    vi.clearAllMocks();

    useSelector.mockImplementation((selector) => {
      if (selector === agentStore.selectAllActorAgents) {
        return mockAgents;
      }
      if (selector === agentStore.selectSelectedActorAgent) {
        return mockSelectedAgent;
      }
      return undefined;
    });
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return all actor agents', () => {
      const { result } = renderHook(() => useActorAgents());

      expect(result.current.allActorAgents).toEqual(mockAgents);
      expect(result.current.allActorAgents).toHaveLength(3);
    });

    it('should return selected actor agent', () => {
      const { result } = renderHook(() => useActorAgents());

      expect(result.current.selectedActorAgent).toEqual(mockSelectedAgent);
      expect(result.current.selectedActorAgent.id).toBe('agent-1');
    });

    it('should return both properties', () => {
      const { result } = renderHook(() => useActorAgents());

      expect(result.current).toHaveProperty('allActorAgents');
      expect(result.current).toHaveProperty('selectedActorAgent');
    });

    it('should have correct agent structure', () => {
      const { result } = renderHook(() => useActorAgents());

      const agent = result.current.allActorAgents[0];
      expect(agent).toHaveProperty('id');
      expect(agent).toHaveProperty('name');
      expect(agent).toHaveProperty('role');
      expect(agent).toHaveProperty('status');
    });
  });

  // ===================================================================
  // AGENT ROLES TESTS
  // ===================================================================

  describe('Agent Roles', () => {
    it('should handle admin role agents', () => {
      const { result } = renderHook(() => useActorAgents());

      const adminAgent = result.current.allActorAgents.find(a => a.role === 'admin');
      expect(adminAgent).toBeDefined();
      expect(adminAgent.name).toBe('Agent Smith');
    });

    it('should handle moderator role agents', () => {
      const { result } = renderHook(() => useActorAgents());

      const modAgent = result.current.allActorAgents.find(a => a.role === 'moderator');
      expect(modAgent).toBeDefined();
      expect(modAgent.name).toBe('Agent Jones');
    });

    it('should handle viewer role agents', () => {
      const { result } = renderHook(() => useActorAgents());

      const viewerAgent = result.current.allActorAgents.find(a => a.role === 'viewer');
      expect(viewerAgent).toBeDefined();
      expect(viewerAgent.name).toBe('Agent Brown');
    });
  });

  // ===================================================================
  // EMPTY STATE TESTS
  // ===================================================================

  describe('Empty States', () => {
    it('should handle empty agents list', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === agentStore.selectAllActorAgents) {
          return [];
        }
        if (selector === agentStore.selectSelectedActorAgent) {
          return null;
        }
        return undefined;
      });

      const { result } = renderHook(() => useActorAgents());

      expect(result.current.allActorAgents).toEqual([]);
      expect(result.current.selectedActorAgent).toBeNull();
    });

    it('should handle no selected agent', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === agentStore.selectAllActorAgents) {
          return mockAgents;
        }
        if (selector === agentStore.selectSelectedActorAgent) {
          return null;
        }
        return undefined;
      });

      const { result } = renderHook(() => useActorAgents());

      expect(result.current.allActorAgents).toEqual(mockAgents);
      expect(result.current.selectedActorAgent).toBeNull();
    });

    it('should handle undefined selected agent', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === agentStore.selectAllActorAgents) {
          return mockAgents;
        }
        if (selector === agentStore.selectSelectedActorAgent) {
          return undefined;
        }
        return undefined;
      });

      const { result } = renderHook(() => useActorAgents());

      expect(result.current.selectedActorAgent).toBeUndefined();
    });
  });
});

describe('useActorAgentsByIds', () => {
  const mockAgents = [
    { id: 'agent-1', name: 'Agent Smith' },
    { id: 'agent-2', name: 'Agent Jones' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return agents by provided IDs', () => {
      const targetIds = ['agent-1', 'agent-2'];

      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return mockAgents;
        }
        return undefined;
      });

      const { result } = renderHook(() => useActorAgentsByIds(targetIds));

      expect(result.current.ActorAgents).toEqual(mockAgents);
      expect(result.current.ActorAgents).toHaveLength(2);
    });

    it('should return single agent for single ID', () => {
      const targetIds = ['agent-1'];

      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [mockAgents[0]];
        }
        return undefined;
      });

      const { result } = renderHook(() => useActorAgentsByIds(targetIds));

      expect(result.current.ActorAgents).toHaveLength(1);
      expect(result.current.ActorAgents[0].id).toBe('agent-1');
    });

    it('should return empty array for empty IDs', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useActorAgentsByIds([]));

      expect(result.current.ActorAgents).toEqual([]);
    });

    it('should return empty array for non-existent IDs', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useActorAgentsByIds(['non-existent']));

      expect(result.current.ActorAgents).toEqual([]);
    });

    it('should handle null IDs parameter', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useActorAgentsByIds(null));

      expect(result.current.ActorAgents).toEqual([]);
    });

    it('should handle undefined IDs parameter', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useActorAgentsByIds(undefined));

      expect(result.current.ActorAgents).toEqual([]);
    });
  });
});

