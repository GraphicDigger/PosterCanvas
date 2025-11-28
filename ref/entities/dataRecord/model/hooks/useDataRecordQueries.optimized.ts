import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { dataRecordApi } from '../../api/dataRecords.api';
import { setRecords } from '../store/slice';

// Query keys for consistent caching
export const dataRecordKeys = {
  all: ['dataRecords'] as const,
  lists: () => [...dataRecordKeys.all, 'list'] as const,
  list: (query?: any) => [...dataRecordKeys.lists(), query] as const,
  details: () => [...dataRecordKeys.all, 'detail'] as const,
  detail: (id: string) => [...dataRecordKeys.details(), id] as const,
};

export const useDataRecordQueries = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // Fetch all records with caching
  const recordsQuery = useQuery({
    queryKey: dataRecordKeys.lists(),
    queryFn: () => dataRecordApi.getRecords(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    onSuccess: (records) => {
      // Update Redux store for backward compatibility
      dispatch(setRecords(records || []));
    },
  });

  // Create record mutation
  const createRecordMutation = useMutation({
    mutationFn: (recordData: any) => dataRecordApi.createRecord(recordData),
    onSuccess: (newRecord) => {
      // Invalidate and refetch records list
      queryClient.invalidateQueries({ queryKey: dataRecordKeys.lists() });
      // Add to cache
      queryClient.setQueryData(dataRecordKeys.detail(newRecord.id), newRecord);
    },
  });

  // Update record mutation
  const updateRecordMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      dataRecordApi.updateRecord(id, updates),
    onSuccess: (updatedRecord) => {
      // Update cache
      queryClient.setQueryData(dataRecordKeys.detail(updatedRecord.id), updatedRecord);
      // Invalidate lists to refetch
      queryClient.invalidateQueries({ queryKey: dataRecordKeys.lists() });
    },
  });

  // Delete record mutation
  const deleteRecordMutation = useMutation({
    mutationFn: (id: string) => dataRecordApi.deleteRecord(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: dataRecordKeys.detail(deletedId) });
      // Invalidate lists to refetch
      queryClient.invalidateQueries({ queryKey: dataRecordKeys.lists() });
    },
  });

  return {
    // Query state
    records: recordsQuery.data || [],
    loading: recordsQuery.isLoading,
    error: recordsQuery.error,
    isError: recordsQuery.isError,
    isSuccess: recordsQuery.isSuccess,

    // Query functions
    refetch: recordsQuery.refetch,

    // Mutations
    createRecord: createRecordMutation.mutate,
    updateRecord: updateRecordMutation.mutate,
    deleteRecord: deleteRecordMutation.mutate,

    // Mutation states
    isCreating: createRecordMutation.isPending,
    isUpdating: updateRecordMutation.isPending,
    isDeleting: deleteRecordMutation.isPending,

    // Mutation results
    createError: createRecordMutation.error,
    updateError: updateRecordMutation.error,
    deleteError: deleteRecordMutation.error,
  };
};
