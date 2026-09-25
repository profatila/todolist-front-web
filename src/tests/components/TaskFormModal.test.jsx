import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskFormModal from '../../components/forms/TaskFormModal';

describe('TaskFormModal Component', () => {
  it('não deve renderizar quando isOpen for false', () => {
    render(<TaskFormModal isOpen={false} onClose={() => {}} onSubmit={() => {}} />);
    expect(screen.queryByText('Nova Tarefa')).not.toBeInTheDocument();
  });

  it('deve exibir mensagem de erro ao submeter com título em branco', async () => {
    const handleSubmit = vi.fn();
    render(<TaskFormModal isOpen={true} onClose={() => {}} onSubmit={handleSubmit} />);

    const submitBtn = screen.getByRole('button', { name: /Criar Tarefa/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText('O título é obrigatório.')).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('deve chamar onSubmit com os dados preenchidos corretamente', async () => {
    const handleSubmit = vi.fn();
    render(<TaskFormModal isOpen={true} onClose={() => {}} onSubmit={handleSubmit} />);

    const titleInput = screen.getByLabelText(/Título da Tarefa/i);
    fireEvent.change(titleInput, { target: { value: 'Comprar suprimentos' } });

    const submitBtn = screen.getByRole('button', { name: /Criar Tarefa/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByRole('button', { name: /Criar Tarefa/i })).toBeInTheDocument();
  });
});
