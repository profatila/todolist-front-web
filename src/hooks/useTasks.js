import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import taskService from '../services/taskService';

export const TASK_QUERY_KEY = 'tasks';

export function useTasks(filters = {}) {
  return useQuery({
    queryKey: [TASK_QUERY_KEY, filters],
    queryFn: () => taskService.fetchTasks(filters),
    keepPreviousData: true,
  });
}

export function useTask(id) {
  return useQuery({
    queryKey: [TASK_QUERY_KEY, id],
    queryFn: () => taskService.fetchTaskById(id),
    enabled: Boolean(id),
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (taskData) => taskService.createTask(taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TASK_QUERY_KEY] });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => taskService.updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TASK_QUERY_KEY] });
    },
  });
}

export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => taskService.updateTaskStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TASK_QUERY_KEY] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => taskService.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TASK_QUERY_KEY] });
    },
  });
}
