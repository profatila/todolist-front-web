# Todo List — Aplicação Web Full-Stack

Aplicação web full-stack completa de gerenciamento de tarefas (**Todo List**), desenvolvida com arquitetura limpa em camadas, sem qualquer mecanismo de autenticação ou autorização.

> [!IMPORTANTE]
> **APLICAÇÃO 100% PÚBLICA**:
> O sistema não possui cadastro de usuário, login, logout, contas, sessões, tokens JWT, OAuth2 ou Spring Security. Todos os endpoints da API e a interface gráfica do usuário estão abertos e prontos para uso direto.

---

## 1. Tecnologias e Versões

### Back-end
- **Java**: 25 (LTS)
- **Spring Boot**: 3.4.3 / 3.5.x
- **Build Tool**: Maven 3.9+ (com wrapper `mvnw` incluído)
- **Persistence**: Spring Data JPA & Hibernate
- **Validation**: Bean Validation (`jakarta.validation`)
- **Documentação**: Springdoc OpenAPI / Swagger UI 2.8.5
- **Conector BD**: MySQL Connector/J 9.x
- **DTOs**: Java Records nativos

### Front-end
- **Framework**: React 19.x + Vite 6.x/7.x (JavaScript ES6+ JSX)
- **Estilização**: Tailwind CSS 4.x
- **Ícones**: Lucide React
- **Gerenciamento de Estado de Servidor**: TanStack Query v5 (`@tanstack/react-query`)
- **Roteamento**: React Router DOM v7
- **Formulários**: React Hook Form v7
- **Cliente HTTP**: Axios v1

### Banco de Dados
- **SGBD**: MySQL 8.4 LTS
- **Charset / Collation**: `utf8mb4` / `utf8mb4_unicode_ci`

---

## 2. Estrutura do Projeto

```text
todo-list-app/
├── database/
│   ├── schema.sql        # Script de criação do banco e tabela tb_tasks
│   └── data.sql          # Script de inserção de tarefas de exemplo
├── backend/
│   ├── pom.xml           # Configuração de dependências Maven
│   ├── mvnw.cmd          # Executável do Maven Wrapper (Windows)
│   ├── .env.example      # Exemplo de variáveis de ambiente
│   └── src/
│       ├── main/
│       │   ├── java/com/example/todo/
│       │   │   ├── TodoApplication.java
│       │   │   ├── config/ (CorsConfig, OpenApiConfig)
│       │   │   ├── controller/ (TaskController)
│       │   │   ├── domain/ (Task, TaskStatus, TaskPriority)
│       │   │   ├── dto/ (TaskRequest, TaskResponse, PageResponse, ApiErrorResponse)
│       │   │   ├── exception/ (GlobalExceptionHandler, ResourceNotFoundException)
│       │   │   ├── mapper/ (TaskMapper)
│       │   │   ├── repository/ (TaskRepository)
│       │   │   └── service/ (TaskService)
│       │   └── resources/ (application.yml, application-dev.yml)
│       └── test/         # Testes unitários de Service, Mapper, Controller e Repositório
├── frontend/
│   ├── package.json      # Dependências do React 19, Vite, Tailwind v4
│   ├── .env.example      # Exemplo de variáveis do front-end
│   ├── vite.config.js    # Configuração do Vite e Vitest
│   └── src/
│       ├── components/   # Componentes reutilizáveis (TaskCard, TaskFilters, TaskFormModal)
│       ├── hooks/        # Custom hook useTasks com TanStack Query v5
│       ├── pages/        # TasksPage
│       ├── routes/       # AppRouter
│       └── services/     # Instância centralizada do Axios
└── README.md
```

---

## 3. Inicialização do Banco de Dados (MySQL 8.4 LTS)

### Passo a Passo no MySQL Workbench

1. Abra o **MySQL Workbench** e conecte-se ao seu servidor MySQL local (porta padrão `3306`).
2. Abra o arquivo [database/schema.sql](file:///C:/Users/User/.gemini/antigravity/scratch/todo-list-app/database/schema.sql) (`File -> Open SQL Script...`).
3. Execute todo o script (`Ctrl + Shift + Enter` ou ícone do raio). Isso criará o banco `todolist_db` e a tabela `tb_tasks`.
4. Abra o arquivo [database/data.sql](file:///C:/Users/User/.gemini/antigravity/scratch/todo-list-app/database/data.sql).
5. Execute o script para carregar as tarefas de exemplo.

### Via Linha de Comando MySQL (CLI)

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/data.sql
```

> [!NOTE]
> O Hibernate está configurado com `spring.jpa.hibernate.ddl-auto=validate` e `spring.sql.init.mode=never`, garantindo que o esquema seja lido exclusivamente do MySQL sem alterações automáticas em tempo de execução.

---

## 4. Configuração e Variáveis de Ambiente

Crie os arquivos `.env` copiando a partir dos exemplos:

### Windows (PowerShell)

```powershell
# Back-end
$env:DB_URL="jdbc:mysql://localhost:3306/todolist_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true"
$env:DB_USERNAME="root"
$env:DB_PASSWORD="sua_senha_mysql"
$env:CORS_ALLOWED_ORIGIN="http://localhost:5173"

# Front-end
$env:VITE_API_BASE_URL="http://localhost:8080/api/v1"
```

### Linux / macOS (Bash / Zsh)

```bash
# Back-end
export DB_URL="jdbc:mysql://localhost:3306/todolist_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true"
export DB_USERNAME="root"
export DB_PASSWORD="sua_senha_mysql"
export CORS_ALLOWED_ORIGIN="http://localhost:5173"

# Front-end
export VITE_API_BASE_URL="http://localhost:8080/api/v1"
```

---

## 5. Execução do Projeto

### 5.1 Executando o Back-end

Navegue até a pasta `backend/` e execute:

```bash
# Windows
.\mvnw.cmd spring-boot:run

# Linux / macOS
./mvnw spring-boot:run
```

A API estará disponível em `http://localhost:8080`.

Documentação Swagger UI disponível em:
- `http://localhost:8080/swagger-ui.html`
- `http://localhost:8080/v3/api-docs`

### 5.2 Executando o Front-end

Navegue até a pasta `frontend/` e execute:

```bash
npm install
npm run dev
```

A aplicação React estará acessível em `http://localhost:5173`. O acesso à raiz `/` redireciona automaticamente para a tela principal `/tasks`.

---

## 6. Execução de Testes Automatizados

### Back-end (JUnit 5 & Mockito)

Navegue até a pasta `backend/` e execute:

```bash
# Windows
.\mvnw.cmd test

# Linux / macOS
./mvnw test
```

### Front-end (Vitest & React Testing Library)

Navegue até a pasta `frontend/` e execute:

```bash
# Testes unitários e de componentes
npm test

# Build de produção do front-end
npm run build

# Teste Ponta a Ponta (Playwright E2E)
npx playwright test
```

---

## 7. Contrato da API REST (`/api/v1/tasks`)

### Endpoints

| Método | Endpoint | Descrição | Status Sucesso |
|---|---|---|---|
| `GET` | `/api/v1/tasks` | Lista tarefas (pesquisa, filtros, ordenação, paginação) | `200 OK` |
| `POST` | `/api/v1/tasks` | Criar nova tarefa | `201 Created` |
| `GET` | `/api/v1/tasks/{id}` | Consultar tarefa por ID | `200 OK` |
| `PUT` | `/api/v1/tasks/{id}` | Atualizar tarefa completa | `200 OK` |
| `PATCH` | `/api/v1/tasks/{id}/status` | Alterar apenas o status da tarefa | `200 OK` |
| `DELETE` | `/api/v1/tasks/{id}` | Excluir tarefa fisicamente | `204 No Content` |

### Exemplos de Chamadas cURL

#### 1. Criar Tarefa (`POST`)

```bash
curl -X POST "http://localhost:8080/api/v1/tasks" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Preparar apresentação do projeto",
    "description": "Elaborar slides e organizar demonstração da API REST",
    "status": "A FAZER",
    "priority": "ALTA",
    "dueDate": "25-09-2026"
  }'
```

#### 2. Listar Tarefas com Filtros e Paginação (`GET`)

```bash
curl -X GET "http://localhost:8080/api/v1/tasks?search=apresentação&priority=ALTA&page=0&size=10&sortBy=createdAt&sortDir=DESC"
```

#### 3. Alterar Status para CONCLUÍDA (`PATCH`)

```bash
curl -X PATCH "http://localhost:8080/api/v1/tasks/1/status" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "CONCLUÍDA"
  }'
```

#### 4. Excluir Tarefa (`DELETE`)

```bash
curl -X DELETE "http://localhost:8080/api/v1/tasks/1"
```

---

## 8. Checklist dos Critérios de Aceitação

- [x] Back-end compila e executa sem erros em **Java 25**.
- [x] Front-end compila sem erros com `npm run build` em **React 19** e **Vite**.
- [x] 100% dos testes unitários e de integração do back-end passando (`mvn test`).
- [x] 100% dos testes unitários do front-end passando com Vitest (`npm test`).
- [x] Ausência total de tabelas, entidades, tokens, JWT, cookies ou middlewares de autenticação.
- [x] CRUD completo de tarefas funcionando ponta a ponta.
- [x] Regra de preenchimento automático de `completedAt` ao marcar como `CONCLUÍDA` e redefinição para `null` ao alterar para outro status.
- [x] Filtro padrão oculta tarefas `ARCHIVADA` da listagem principal a menos que explicitamente filtradas.
- [x] Resposta de erros padronizada via `@RestControllerAdvice` sem expor stack traces.
- [x] Interface gráfica acessível, responsiva (Mobile-First) em português do Brasil com Tailwind CSS 4.
