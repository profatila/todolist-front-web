import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../common/Modal';

export function TaskFormModal({ isOpen, onClose, onSubmit, initialTask, isLoading }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      status: 'A FAZER',
      priority: 'MÉDIA',
      dueDate: '',
    },
  });

  useEffect(() => {
    if (initialTask) {
      // Converter DD-MM-YYYY para YYYY-MM-DD se necessário para o input type="date"
      let formattedDueDate = '';
      if (initialTask.dueDate) {
        if (/^\d{2}-\d{2}-\d{4}$/.test(initialTask.dueDate)) {
          const [d, m, y] = initialTask.dueDate.split('-');
          formattedDueDate = `${y}-${m}-${d}`;
        } else {
          formattedDueDate = initialTask.dueDate;
        }
      }

      reset({
        title: initialTask.title || '',
        description: initialTask.description || '',
        status: initialTask.status || 'A FAZER',
        priority: initialTask.priority || 'MÉDIA',
        dueDate: formattedDueDate,
      });
    } else {
      reset({
        title: '',
        description: '',
        status: 'A FAZER',
        priority: 'MÉDIA',
        dueDate: '',
      });
    }
  }, [initialTask, reset, isOpen]);

  const handleFormSubmit = (data) => {
    let formattedDueDate = null;
    if (data.dueDate) {
      const [y, m, d] = data.dueDate.split('-');
      formattedDueDate = `${d}-${m}-${y}`;
    }

    const payload = {
      title: data.title.trim(),
      description: data.description ? data.description.trim() : null,
      status: data.status,
      priority: data.priority,
      dueDate: formattedDueDate,
    };

    onSubmit(payload);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialTask ? 'Editar Tarefa' : 'Nova Tarefa'}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Título */}
        <div>
          <label htmlFor="task-title" className="block text-xs font-semibold text-slate-700 mb-1">
            Título da Tarefa <span className="text-rose-500">*</span>
          </label>
          <input
            id="task-title"
            type="text"
            placeholder="Ex.: Comprar suprimentos de escritório"
            {...register('title', {
              required: 'O título é obrigatório.',
              minLength: { value: 1, message: 'O título deve ter no mínimo 1 caractere.' },
              maxLength: { value: 120, message: 'O título deve ter no máximo 120 caracteres.' },
            })}
            className={`w-full px-3 py-2 border rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 ${
              errors.title
                ? 'border-rose-300 focus:ring-rose-500'
                : 'border-slate-300 focus:ring-indigo-500'
            }`}
          />
          {errors.title && (
            <p className="text-xs text-rose-600 mt-1" role="alert">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Descrição */}
        <div>
          <label htmlFor="task-description" className="block text-xs font-semibold text-slate-700 mb-1">
            Descrição (Opcional)
          </label>
          <textarea
            id="task-description"
            rows="3"
            placeholder="Detalhe o contexto ou passos da tarefa..."
            {...register('description', {
              maxLength: { value: 1000, message: 'A descrição deve ter no máximo 1000 caracteres.' },
            })}
            className={`w-full px-3 py-2 border rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 ${
              errors.description
                ? 'border-rose-300 focus:ring-rose-500'
                : 'border-slate-300 focus:ring-indigo-500'
            }`}
          />
          {errors.description && (
            <p className="text-xs text-rose-600 mt-1" role="alert">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Status e Prioridade */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="task-status" className="block text-xs font-semibold text-slate-700 mb-1">
              Status Inicial
            </label>
            <select
              id="task-status"
              {...register('status')}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="A FAZER">A Fazer</option>
              <option value="FAZENDO">Fazendo</option>
              <option value="CONCLUÍDA">Concluída</option>
              <option value="ARCHIVADA">Arquivada</option>
            </select>
          </div>

          <div>
            <label htmlFor="task-priority" className="block text-xs font-semibold text-slate-700 mb-1">
              Prioridade
            </label>
            <select
              id="task-priority"
              {...register('priority')}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="BAIXA">Baixa</option>
              <option value="MÉDIA">Média</option>
              <option value="ALTA">Alta</option>
            </select>
          </div>
        </div>

        {/* Data de Vencimento */}
        <div>
          <label htmlFor="task-duedate" className="block text-xs font-semibold text-slate-700 mb-1">
            Data de Vencimento (Opcional)
          </label>
          <input
            id="task-duedate"
            type="date"
            {...register('dueDate')}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Ações */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? 'Salvando...' : initialTask ? 'Salvar Alterações' : 'Criar Tarefa'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default TaskFormModal;
