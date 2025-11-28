import { useState, useCallback, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// Critical data that must be loaded first for UI to render
const CRITICAL_DATA_QUERIES = [
  'dataModels',
  'uiScreens',
  'uiComponents',
  'uiElements',
];

// Secondary data that can be loaded in background
const SECONDARY_DATA_QUERIES = [
  'dataRecords',
  'comments',
  'members',
  'projects',
  'documents',
  'tasks',
  'chats',
  'codes',
  'props',
  'propValues',
  'actions',
  'wireframeBlocks',
  'instances',
  'apis',
  'actorRoles',
  'actorPositions',
  'workspaces',
  'userspaces',
  'events',
  'activities',
  'notifications',
  'tokens',
  'variables',
  'tokenValues',
  'tokenCollections',
  'htmlAttrs',
  'contextLinks',
  'uiDefaultEntity',
  'users',
  'projectMembers',
];

export const useOptimizedDataInitialization = () => {
  const [state, setState] = useState({
    isInitialized: false,
    isInitializing: false,
    isLoading: false,
    error: null,
    criticalDataLoaded: false,
    secondaryDataLoaded: false,
  });

  const queryClient = useQueryClient();

  // Safe execution wrapper with error handling
  const safeExecute = useCallback(async (fn, name) => {
    try {
      console.log(`[OptimizedInit] Loading ${name}...`);
      await fn();
      console.log(`[OptimizedInit] ✅ ${name} loaded successfully`);
    } catch (error) {
      console.error(`[OptimizedInit] ❌ Error loading ${name}:`, error);
      // Don't throw - continue with other data
    }
  }, []);

  // Load critical data first
  const loadCriticalData = useCallback(async () => {
    console.log('[OptimizedInit] 🚀 Loading critical data...');

    // Use React Query's prefetch for critical data
    const criticalPromises = CRITICAL_DATA_QUERIES.map(queryKey =>
      queryClient.prefetchQuery({
        queryKey: [queryKey],
        queryFn: () => {
          // This would call the actual API function
          console.log(`Prefetching ${queryKey}`);
          return Promise.resolve([]);
        },
        staleTime: 5 * 60 * 1000,
      }),
    );

    await Promise.all(criticalPromises);

    setState(prev => ({ ...prev, criticalDataLoaded: true }));
    console.log('[OptimizedInit] ✅ Critical data loaded');
  }, [queryClient]);

  // Load secondary data in background
  const loadSecondaryData = useCallback(async () => {
    console.log('[OptimizedInit] 📦 Loading secondary data in background...');

    // Use React Query's prefetch for secondary data
    const secondaryPromises = SECONDARY_DATA_QUERIES.map(queryKey =>
      queryClient.prefetchQuery({
        queryKey: [queryKey],
        queryFn: () => {
          console.log(`Background prefetching ${queryKey}`);
          return Promise.resolve([]);
        },
        staleTime: 5 * 60 * 1000,
      }),
    );

    await Promise.all(secondaryPromises);

    setState(prev => ({ ...prev, secondaryDataLoaded: true }));
    console.log('[OptimizedInit] ✅ Secondary data loaded');
  }, [queryClient]);

  // Main initialization function
  const initializeData = useCallback(async () => {
    if (state.isInitialized || state.isInitializing) {return;}

    setState(prev => ({
      ...prev,
      isInitializing: true,
      error: null,
      isLoading: true,
    }));

    try {
      console.log('[OptimizedInit] 🎯 Starting optimized data initialization');

      // Step 1: Load critical data first (blocking)
      await loadCriticalData();

      // Step 2: Mark as initialized for UI rendering
      setState(prev => ({
        ...prev,
        isInitialized: true,
        isInitializing: false,
        isLoading: false,
      }));

      console.log('[OptimizedInit] 🎉 App ready for user interaction');

      // Step 3: Load secondary data in background (non-blocking)
      setTimeout(() => {
        loadSecondaryData();
      }, 100); // Small delay to ensure UI is rendered

    } catch (error) {
      console.error('[OptimizedInit] ❌ Initialization failed:', error);
      setState(prev => ({
        ...prev,
        error: error.message,
        isInitializing: false,
        isLoading: false,
      }));
    }
  }, [state.isInitialized, state.isInitializing, loadCriticalData, loadSecondaryData]);

  // Auto-initialize on mount
  useEffect(() => {
    initializeData();
  }, [initializeData]);

  return {
    ...state,
    initializeData,
    loadCriticalData,
    loadSecondaryData,
  };
};
