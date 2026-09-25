import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ page, totalPages, totalElements, size, onPageChange }) {
  if (totalElements === 0) return null;

  const startElement = page * size + 1;
  const endElement = Math.min((page + 1) * size, totalElements);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 border-t border-slate-200 mt-6 text-sm text-slate-600">
      <div>
        Mostrando <span className="font-semibold text-slate-900">{startElement}</span> a{' '}
        <span className="font-semibold text-slate-900">{endElement}</span> de{' '}
        <span className="font-semibold text-slate-900">{totalElements}</span> tarefas
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
          className="px-3 py-1.5 border border-slate-300 rounded-lg bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Página anterior"
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </button>

        <span className="px-3 py-1 font-medium text-slate-700">
          Página {page + 1} de {totalPages || 1}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages - 1}
          className="px-3 py-1.5 border border-slate-300 rounded-lg bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Próxima página"
        >
          Próxima
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
