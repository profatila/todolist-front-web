import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export function ErrorAlert({ message, onRetry }) {
  return (
    <div
      className="p-6 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 my-4 shadow-sm"
      role="alert"
    >
      <div className="flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1">
          <h3 className="text-base font-semibold text-rose-900">Erro ao carregar dados</h3>
          <p className="text-sm text-rose-700 mt-1">
            {message || 'Não foi possível se conectar com o servidor.'}
          </p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Tentar Novamente
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ErrorAlert;
