import React from 'react';
import TaskCard from './TaskCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert';
import { ClipboardList, Plus } from 'lucide-react';

export function TaskList({
  tasks,
  isLoading,
  isError,
  error,
  onRetry,
  onEdit,
  onDelete,
  onStatusChange,
  isUpdatingStatus,
  onOpenCreateModal,
}) {
  if (isLoading) {
    return <LoadingSpinner message="Carregando lista de tarefas..." />;
  }

  if (isError) {
    return <ErrorAlert message={error?.message} onRetry={onRetry} />;
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-xl border border-dashed border-slate-300 text-center">
        <div className="p-4 bg-indigo-50 rounded-full text-indigo-600 mb-4">
          <ClipboardList className="w-10 h-10" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">Nenhuma tarefa encontrada</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-md">
          Não há tarefas correspondentes aos filtros selecionados. Crie uma nova tarefa para começar.
        </p>
        <button
          type="button"
          onClick={onOpenCreateModal}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <Plus className="w-4 h-4" />
          Criar Nova Tarefa
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          isUpdatingStatus={isUpdatingStatus}
        />
      ))}
    </div>
  );
}

export default TaskList;
