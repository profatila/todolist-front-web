import React from 'react';
import { Search, Filter, ArrowUpDown, X, Calendar } from 'lucide-react';

export function TaskFilters({ filters, onFilterChange, onReset }) {
  const handleChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value, page: 0 });
  };

  const toggleSortDir = () => {
    const nextDir = filters.sortDir === 'ASC' ? 'DESC' : 'ASC';
    onFilterChange({ ...filters, sortDir: nextDir, page: 0 });
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col gap-4">
      {/* Barra de Pesquisa Principal */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder="Pesquisar por título ou descrição..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            aria-label="Pesquisar tarefas"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => handleChange('search', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              aria-label="Limpar pesquisa"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Ordenação */}
          <select
            value={filters.sortBy || 'createdAt'}
            onChange={(e) => handleChange('sortBy', e.target.value)}
            className="py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Ordenar por"
          >
            <option value="createdAt">Data de Criação</option>
            <option value="updatedAt">Última Alteração</option>
            <option value="dueDate">Data de Vencimento</option>
            <option value="title">Título</option>
            <option value="priority">Prioridade</option>
            <option value="status">Status</option>
          </select>

          <button
            type="button"
            onClick={toggleSortDir}
            className="p-2.5 border border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium text-sm flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            title={`Ordem ${filters.sortDir === 'ASC' ? 'Crescente' : 'Decrescente'}`}
            aria-label={`Alterar ordem para ${filters.sortDir === 'ASC' ? 'Decrescente' : 'Crescente'}`}
          >
            <ArrowUpDown className="w-4 h-4" />
            <span className="hidden md:inline">{filters.sortDir === 'ASC' ? 'ASC' : 'DESC'}</span>
          </button>
        </div>
      </div>

      {/* Filtros Secundários */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
        {/* Filtro por Status */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Status</label>
          <select
            value={filters.status || ''}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Todos (Exceto Arquivadas)</option>
            <option value="A FAZER">A Fazer</option>
            <option value="FAZENDO">Fazendo</option>
            <option value="CONCLUÍDA">Concluída</option>
            <option value="ARCHIVADA">Arquivada</option>
          </select>
        </div>

        {/* Filtro por Prioridade */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Prioridade</label>
          <select
            value={filters.priority || ''}
            onChange={(e) => handleChange('priority', e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Todas</option>
            <option value="BAIXA">Baixa</option>
            <option value="MÉDIA">Média</option>
            <option value="ALTA">Alta</option>
          </select>
        </div>

        {/* Data Vencimento Inicial */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Vencimento De</label>
          <input
            type="date"
            value={filters.dueDateFrom || ''}
            onChange={(e) => handleChange('dueDateFrom', e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Data Vencimento Final */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Vencimento Até</label>
          <input
            type="date"
            value={filters.dueDateTo || ''}
            onChange={(e) => handleChange('dueDateTo', e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Botão de Limpar Filtros */}
      {(filters.search || filters.status || filters.priority || filters.dueDateFrom || filters.dueDateTo) && (
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 focus:outline-none underline"
          >
            Limpar todos os filtros
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskFilters;
