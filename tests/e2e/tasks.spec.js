import { test, expect } from '@playwright/test';

test.describe('Fluxo Completo de Gerenciamento de Tarefas (Todo List)', () => {
  test('deve acessar a tela de tarefas diretamente e executar o CRUD completo sem autenticação', async ({ page }) => {
    // 1. Acesso direto à aplicação e redirecionamento para /tasks
    await page.goto('http://localhost:5173/');
    await expect(page).toHaveURL('http://localhost:5173/tasks');
    await expect(page.locator('h1')).toContainText('TaskManager');

    // 2. Criar nova tarefa
    await page.click('button:has-text("Nova Tarefa")');
    await expect(page.locator('#modal-title')).toHaveText('Nova Tarefa');

    await page.fill('#task-title', 'Tarefa E2E Playwright');
    await page.fill('#task-description', 'Descrição automatizada criada durante o teste de integração E2E');
    await page.selectOption('#task-priority', 'ALTA');
    await page.click('button:has-text("Criar Tarefa")');

    // Validar criação na lista
    await expect(page.locator('text=Tarefa E2E Playwright')).toBeVisible();

    // 3. Editar tarefa
    await page.click('button[aria-label*="Editar Tarefa E2E Playwright"]');
    await expect(page.locator('#modal-title')).toHaveText('Editar Tarefa');

    await page.fill('#task-title', 'Tarefa E2E Playwright (Editada)');
    await page.click('button:has-text("Salvar Alterações")');

    await expect(page.locator('text=Tarefa E2E Playwright (Editada)')).toBeVisible();

    // 4. Alterar status para CONCLUÍDA
    await page.click('button[aria-label*="Marcar Tarefa E2E Playwright (Editada) como concluída"]');
    await expect(page.locator('text=Concluída')).toBeVisible();

    // 5. Pesquisar/Filtrar a tarefa
    await page.fill('input[placeholder*="Pesquisar"]', 'Playwright');
    await expect(page.locator('text=Tarefa E2E Playwright (Editada)')).toBeVisible();

    // 6. Excluir tarefa com confirmação
    await page.click('button[aria-label*="Excluir Tarefa E2E Playwright (Editada)"]');
    await expect(page.locator('#modal-title')).toHaveText('Excluir Tarefa');

    await page.click('button:has-text("Confirmar Exclusão")');
    await expect(page.locator('text=Tarefa E2E Playwright (Editada)')).not.toBeVisible();
  });
});
