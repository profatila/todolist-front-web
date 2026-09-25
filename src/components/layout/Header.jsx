import React from 'react';
import { CheckSquare } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-indigo-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg shadow-sm">
            <CheckSquare className="w-6 h-6 text-white" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              TaskManager
            </h1>
            <p className="text-xs text-indigo-200">
              Gerenciamento Eficiente de Tarefas
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
