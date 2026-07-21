import { Goddo, t } from '@goddo/core'
import { html } from '@goddo/html'
import { openapi } from '@goddo/openapi'
import { llmstxt } from '@goddo/llms-txt'
import { renderPage } from './page.tsx'
import { TodoItem } from './components/TodoItem.tsx'
import { rowToTodo, stmts, type TodoRow } from './db.ts'

export { resetStore } from './db.ts'

export const app = new Goddo()
  .use(
    openapi({
      documentation: {
        info: {
          title: 'Todo API',
          version: '1.0.0',
          description: 'A simple Todo CRUD API.',
        },
      },
    }),
  )
  .use(
    llmstxt({
      title: 'My Todos API',
      description: 'An API to manage your tasks',
    }),
  )
  .use(html())
  .get('/', ({ redirect }) => redirect('/page'))
  .get('/page', () => renderPage(stmts.list.all<TodoRow>().map(rowToTodo)))
  .group('/todos', (app) =>
    app
      .get('/', () => stmts.list.all<TodoRow>().map(rowToTodo), {
        detail: { summary: 'List all todos', tags: ['Todos'] },
      })
      .get(
        '/:id',
        ({ params: { id }, set }) => {
          const row = stmts.findById.get<TodoRow>(id)
          if (!row) {
            set.status = 404
            return { error: 'Todo not found' }
          }
          return rowToTodo(row)
        },
        {
          params: t.Object({ id: t.Numeric() }),
          detail: { summary: 'Get a todo by ID', tags: ['Todos'] },
        },
      )
      .post(
        '/',
        ({ body, headers }) => {
          const row = stmts.insert.get<TodoRow>(body.title)!
          const todo = rowToTodo(row)
          if (headers['hx-request']) return TodoItem(todo)
          return todo
        },
        {
          body: t.Object({ title: t.String() }),
          detail: { summary: 'Create a new todo', tags: ['Todos'] },
        },
      )
      .patch(
        '/:id',
        ({ params: { id }, body, headers, set }) => {
          const row = stmts.update.get<TodoRow>(
            body.title ?? null,
            body.completed !== undefined ? (body.completed ? 1 : 0) : null,
            id,
          )
          if (!row) {
            set.status = 404
            return { error: 'Todo not found' }
          }
          const todo = rowToTodo(row)
          if (headers['hx-request']) return TodoItem(todo)
          return todo
        },
        {
          params: t.Object({ id: t.Numeric() }),
          body: t.Object({
            title: t.Optional(t.String()),
            completed: t.Optional(t.Boolean()),
          }),
          detail: { summary: 'Partially update a todo', tags: ['Todos'] },
        },
      )
      .delete(
        '/:id',
        ({ params: { id }, headers, set }) => {
          const changes = stmts.delete.run(id)
          if (changes === 0) {
            set.status = 404
            return { error: 'Todo not found' }
          }
          if (headers['hx-request']) return ''
          return { success: true }
        },
        {
          params: t.Object({ id: t.Numeric() }),
          detail: { summary: 'Delete a todo', tags: ['Todos'] },
        },
      ))
