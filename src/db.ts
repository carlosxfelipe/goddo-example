import { Database } from '@db/sqlite'
import type { Todo } from './page.tsx'

export const db = new Database('todos.db')

// Enable WAL mode for better concurrent read performance
db.exec('PRAGMA journal_mode=WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    title     TEXT    NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0
  )
`)

// Seed initial data only when the table is empty
const isEmpty = db.prepare('SELECT COUNT(*) as n FROM todos').value<[number]>()![0] === 0
if (isEmpty) {
  db.exec(`
    INSERT INTO todos (title, completed) VALUES
      ('Buy groceries', 1),
      ('Walk the dog', 0)
  `)
}

// Pre-compiled prepared statements — compiled once at startup, reused per request
export const stmts = {
  list: db.prepare('SELECT id, title, completed FROM todos ORDER BY id'),
  findById: db.prepare('SELECT id, title, completed FROM todos WHERE id = ?'),
  insert: db.prepare(
    'INSERT INTO todos (title, completed) VALUES (?, 0) RETURNING id, title, completed',
  ),
  update: db.prepare(
    'UPDATE todos SET title = COALESCE(?, title), completed = COALESCE(?, completed) WHERE id = ? RETURNING id, title, completed',
  ),
  delete: db.prepare('DELETE FROM todos WHERE id = ?'),
  deleteAll: db.prepare('DELETE FROM todos'),
  resetSequence: db.prepare("DELETE FROM sqlite_sequence WHERE name = 'todos'"),
}

/** Raw row shape returned by SQLite (completed stored as 0 | 1). */
export interface TodoRow {
  id: number
  title: string
  completed: number
}

/** Converts a raw SQLite row to the typed Todo (maps integer completed → boolean). */
export const rowToTodo = (row: TodoRow): Todo => ({
  id: row.id,
  title: row.title,
  completed: row.completed === 1,
})

/** Resets the store to its initial seed state. Used by benchmarks to avoid cross-benchmark pollution. */
export function resetStore() {
  stmts.deleteAll.run()
  stmts.resetSequence.run()
  db.exec(`
    INSERT INTO todos (title, completed) VALUES
      ('Buy groceries', 1),
      ('Walk the dog', 0)
  `)
}
