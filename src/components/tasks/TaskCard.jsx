import React from 'react';
import { Calendar, Clock, Edit2, Trash2, CheckCircle2, Archive, PlayCircle } from 'lucide-react';
import TaskStatusBadge from './TaskStatusBadge';
import { PRIORITY_CONFIG } from '../../utils/priorityUtils';
import { formatDate, getDueDateStatus } from '../../utils/dateFormatter';

export function TaskCard({ task, onEdit, onDelete, onStatusChange, isUpdatingStatus }) {
  const priorityInfo = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.MÉDIA;
  const dueDateInfo = getDueDateStatus(task.dueDate, task.status);

  return (
    <div
      className={`bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
        task.status === 'CONCLUÍDA'
          ? 'border-slate-200 bg-slate-50/50 opacity-90'
          : task.status === 'ARCHIVADA'
          ? 'border-zinc-300 bg-zinc-50'
          : 'border-slate-200'
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <TaskStatusBadge status={task.status} />
          <span
            className={`px-2.5 py-0.5 text-xs font-semibold rounded-md border ${priorityInfo.badgeClass}`}
          >
            Prioridade {priorityInfo.label}
          </span>
        </div>

        <h3
          className={`text-base font-semibold ${
            task.status === 'CONCLUÍDA' ? 'line-through text-slate-500' : 'text-slate-900'
          }`}
        >
          {task.title}
        </h3>

        {task.description && (
          <p className="text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
            {task.description}
          </p>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-3">
        {/* Informações de Prazo */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          {task.dueDate ? (
            <div className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{formatDate(task.dueDate)}</span>
              {dueDateInfo.label && (
                <span
                  className={`ml-1 px-2 py-0.5 rounded text-[11px] font-semibold ${
                    dueDateInfo.isOverdue
                      ? 'bg-rose-100 text-rose-800'
                      : dueDateInfo.isToday
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {dueDateInfo.label}
                </span>
              )}
            </div>
          ) : (
            <span className="text-slate-400 italic">Sem data limite</span>
          )}

          {task.completedAt && (
            <div className="flex items-center gap-1 text-emerald-700 text-[11px] font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Concluída
            </div>
          )}
        </div>

        {/* Ações e Alteração Rápida de Status */}
        <div className="flex items-center justify-between gap-2 pt-2">
          <div className="flex items-center gap-1">
            {task.status !== 'CONCLUÍDA' && (
              <button
                type="button"
                onClick={() => onStatusChange(task.id, 'CONCLUÍDA')}
                disabled={isUpdatingStatus}
                className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                title="Marcar como Concluída"
                aria-label={`Marcar ${task.title} como concluída`}
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}

            {task.status !== 'FAZENDO' && (
              <button
                type="button"
                onClick={() => onStatusChange(task.id, 'FAZENDO')}
                disabled={isUpdatingStatus}
                className="p-1.5 text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                title="Marcar como Fazendo"
                aria-label={`Marcar ${task.title} como fazendo`}
              >
                <PlayCircle className="w-4 h-4" />
              </button>
            )}

            {task.status !== 'ARCHIVADA' && (
              <button
                type="button"
                onClick={() => onStatusChange(task.id, 'ARCHIVADA')}
                disabled={isUpdatingStatus}
                className="p-1.5 text-slate-600 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500"
                title="Arquivar Tarefa"
                aria-label={`Arquivar ${task.title}`}
              >
                <Archive className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onEdit(task)}
              className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              title="Editar Tarefa"
              aria-label={`Editar ${task.title}`}
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(task)}
              className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
              title="Excluir Tarefa"
              aria-label={`Excluir ${task.title}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
