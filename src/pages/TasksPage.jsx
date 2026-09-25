import React, { useState } from 'react';
import { Plus, CheckCircle, AlertCircle } from 'lucide-react';
import {
  useTasks,
  useCreateTask,
  useUpdateTask,
  useUpdateTaskStatus,
  useDeleteTask,
} from '../hooks/useTasks';
import TaskFilters from '../components/tasks/TaskFilters';
import TaskList from '../components/tasks/TaskList';
import Pagination from '../components/common/Pagination';
import TaskFormModal from '../components/forms/TaskFormModal';
import ConfirmDialog from '../components/common/ConfirmDialog';

export function TasksPage() {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    dueDateFrom: '',
    dueDateTo: '',
    page: 0,
    size: 10,
    sortBy: 'createdAt',
    sortDir: 'DESC',
  });

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Queries e Mutations
  const { data, isLoading, isError, error, refetch } = useTasks(filters);
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const updateStatusMutation = useUpdateTaskStatus();
  const deleteTaskMutation = useDeleteTask();

  // Handlers para o Formulário de Criar/Editar
  const handleOpenCreateModal = () => {
    setSelectedTask(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setSelectedTask(task);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setSelectedTask(null);
  };

  const handleSaveTask = (taskPayload) => {
    if (selectedTask) {
      updateTaskMutation.mutate(
        { id: selectedTask.id, data: taskPayload },
        {
          onSuccess: () => {
            showNotification('Tarefa atualizada com sucesso!');
            handleCloseFormModal();
          },
          onError: (err) => {
            showNotification(err?.message || 'Erro ao atualizar tarefa.', 'error');
          },
        }
      );
    } else {
      createTaskMutation.mutate(taskPayload, {
        onSuccess: () => {
          showNotification('Tarefa criada com sucesso!');
          handleCloseFormModal();
        },
        onError: (err) => {
          showNotification(err?.message || 'Erro ao criar tarefa.', 'error');
        },
      });
    }
  };

  // Handlers de Alteração Rápida de Status
  const handleStatusChange = (taskId, newStatus) => {
    updateStatusMutation.mutate(
      { id: taskId, status: newStatus },
      {
        onSuccess: () => {
          showNotification(`Status alterado para "${newStatus}" com sucesso!`);
        },
        onError: (err) => {
          showNotification(err?.message || 'Erro ao alterar status.', 'error');
        },
      }
    );
  };

  // Handlers de Exclusão
  const handleOpenDeleteModal = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (!taskToDelete) return;
    deleteTaskMutation.mutate(taskToDelete.id, {
      onSuccess: () => {
        showNotification('Tarefa excluída com sucesso!');
        handleCloseDeleteModal();
      },
      onError: (err) => {
        showNotification(err?.message || 'Erro ao excluir tarefa.', 'error');
      },
    });
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: '',
      priority: '',
      dueDateFrom: '',
      dueDateTo: '',
      page: 0,
      size: 10,
      sortBy: 'createdAt',
      sortDir: 'DESC',
    });
  };

  return (
    <div className="space-y-6">
      {/* Notificação Temporária (Toast / Alert) */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg border flex items-center gap-3 animate-bounce ${
            notification.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}
          role="status"
          aria-live="polite"
        >
          {notification.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-rose-600" />
          ) : (
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          )}
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      {/* Cabeçalho da Página */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Minhas Tarefas
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Gerencie e organize suas tarefas com filtros e ordenação em tempo real.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreateModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 shrink-0"
        >
          <Plus className="w-5 h-5" />
          Nova Tarefa
        </button>
      </div>

      {/* Componente de Filtros */}
      <TaskFilters
        filters={filters}
        onFilterChange={setFilters}
        onReset={handleResetFilters}
      />

      {/* Lista de Tarefas */}
      <TaskList
        tasks={data?.content}
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRetry={refetch}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
        onStatusChange={handleStatusChange}
        isUpdatingStatus={updateStatusMutation.isPending}
        onOpenCreateModal={handleOpenCreateModal}
      />

      {/* Paginação */}
      {data && (
        <Pagination
          page={data.page}
          totalPages={data.totalPages}
          totalElements={data.totalElements}
          size={data.size}
          onPageChange={(newPage) => setFilters((prev) => ({ ...prev, page: newPage }))}
        />
      )}

      {/* Modal de Formulário (Criar / Editar) */}
      <TaskFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        onSubmit={handleSaveTask}
        initialTask={selectedTask}
        isLoading={createTaskMutation.isPending || updateTaskMutation.isPending}
      />

      {/* Modal de Confirmação de Exclusão */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Excluir Tarefa"
        message={`Tem certeza que deseja excluir permanentemente a tarefa "${taskToDelete?.title}"? Esta ação não pode ser desfeita.`}
        isLoading={deleteTaskMutation.isPending}
      />
    </div>
  );
}

export default TasksPage;
