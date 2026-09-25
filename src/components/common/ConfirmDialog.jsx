import React from 'react';
import Modal from './Modal';
import { AlertTriangle } from 'lucide-react';

export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, isLoading }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex items-start gap-4">
        <div className="p-3 bg-rose-100 rounded-full text-rose-600 shrink-0">
          <AlertTriangle className="w-6 h-6" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm text-slate-600">{message}</p>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-rose-600 rounded-lg hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-50 flex items-center gap-2"
        >
          {isLoading ? 'Excluindo...' : 'Confirmar Exclusão'}
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
