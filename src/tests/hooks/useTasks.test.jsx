import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { useTasks } from '../../hooks/useTasks';
import React from 'react';

const mockTasksResponse = {
  content: [
    {
      id: 1,
      title: 'Tarefa Teste MSW',
      description: 'Desc',
      status: 'A FAZER',
      priority: 'MÉDIA',
      dueDate: '20-09-2026',
      completedAt: null,
      createdAt: '2026-09-18T12:00:00',
      updatedAt: '2026-09-18T12:00:00',
    },
  ],
  page: 0,
  size: 10,
  totalElements: 1,
  totalPages: 1,
  first: true,
  last: true,
  sort: 'createdAt: DESC',
};

const server = setupServer(
  http.get('http://localhost:8080/api/v1/tasks', () => {
    return HttpResponse.json(mockTasksResponse);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useTasks Custom Hook', () => {
  it('deve buscar a lista de tarefas da API via MSW com sucesso', async () => {
    const { result } = renderHook(() => useTasks(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data.content).toHaveLength(1);
    expect(result.current.data.content[0].title).toBe('Tarefa Teste MSW');
  });
});
