import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { dataModelApi } from '../../api/dataModels.api';
import { setModels, setSelectedModelId } from '../store/slice';
import type { DataModel, DataModelQuery } from '../../types';

// Query keys for consistent caching
export const dataModelKeys = {
  all: ['dataModels'] as const,
  lists: () => [...dataModelKeys.all, 'list'] as const,
  list: (query?: DataModelQuery) => [...dataModelKeys.lists(), query] as const,
  details: () => [...dataModelKeys.all, 'detail'] as const,
  detail: (id: string) => [...dataModelKeys.details(), id] as const,
};

export const useDataModelsQueries = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // Fetch all models with caching
  const modelsQuery = useQuery({
    queryKey: dataModelKeys.lists(),
    queryFn: () => dataModelApi.getModels(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    onSuccess: (models) => {
      // Update Redux store for backward compatibility
      dispatch(setModels(models || []));
      if (models && models.length > 0) {
        dispatch(setSelectedModelId(models[0].id));
      }
    },
  });

  // Fetch single model by ID
  const fetchModelById = useQuery({
    queryKey: dataModelKeys.detail(''),
    queryFn: (id: string) => dataModelApi.getModelById(id),
    enabled: false, // Only fetch when explicitly called
    staleTime: 5 * 60 * 1000,
  });

  // Create model mutation
  const createModelMutation = useMutation({
    mutationFn: (modelData: Omit<DataModel, 'id' | 'createdAt' | 'updatedAt'>) =>
      dataModelApi.createModel(modelData),
    onSuccess: (newModel) => {
      // Invalidate and refetch models list
      queryClient.invalidateQueries({ queryKey: dataModelKeys.lists() });
      // Add to cache
      queryClient.setQueryData(dataModelKeys.detail(newModel.id), newModel);
    },
  });

  // Update model mutation
  const updateModelMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<DataModel> }) =>
      dataModelApi.updateModel(id, updates),
    onSuccess: (updatedModel) => {
      // Update cache
      queryClient.setQueryData(dataModelKeys.detail(updatedModel.id), updatedModel);
      // Invalidate lists to refetch
      queryClient.invalidateQueries({ queryKey: dataModelKeys.lists() });
    },
  });

  // Delete model mutation
  const deleteModelMutation = useMutation({
    mutationFn: (id: string) => dataModelApi.deleteModel(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: dataModelKeys.detail(deletedId) });
      // Invalidate lists to refetch
      queryClient.invalidateQueries({ queryKey: dataModelKeys.lists() });
    },
  });

  // Helper function to fetch model by ID
  const fetchModelByIdFn = async (id: string) => {
    return queryClient.fetchQuery({
      queryKey: dataModelKeys.detail(id),
      queryFn: () => dataModelApi.getModelById(id),
      staleTime: 5 * 60 * 1000,
    });
  };

  return {
    // Query state
    models: modelsQuery.data || [],
    loading: modelsQuery.isLoading,
    error: modelsQuery.error,
    isError: modelsQuery.isError,
    isSuccess: modelsQuery.isSuccess,

    // Query functions
    refetch: modelsQuery.refetch,
    fetchModelById: fetchModelByIdFn,

    // Mutations
    createModel: createModelMutation.mutate,
    updateModel: updateModelMutation.mutate,
    deleteModel: deleteModelMutation.mutate,

    // Mutation states
    isCreating: createModelMutation.isPending,
    isUpdating: updateModelMutation.isPending,
    isDeleting: deleteModelMutation.isPending,

    // Mutation results
    createError: createModelMutation.error,
    updateError: updateModelMutation.error,
    deleteError: deleteModelMutation.error,
  };
};
