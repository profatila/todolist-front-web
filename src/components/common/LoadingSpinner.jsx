import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingSpinner({ message = 'Carregando tarefas...' }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 text-slate-500"
      aria-live="polite"
      aria-busy="true"
    >
      <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-3" />
      <p className="text-sm font-medium text-slate-600">{message}</p>
    </div>
  );
}

export default LoadingSpinner;
