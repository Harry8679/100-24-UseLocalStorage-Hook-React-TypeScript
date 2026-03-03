import { useState } from 'react';
import { useLocalStorage } from '../hooks';
import type { Todo } from '../types';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

export const TodoListDemo = () => {
  const [todos, setTodos, removeTodos] = useLocalStorage<Todo[]>('todos', []);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    const newTodo: Todo = {
      id: generateId(),
      title: newTodoTitle,
      completed: false,
      createdAt: new Date(),
    };

    setTodos([...todos, newTodo]);
    setNewTodoTitle('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Todo List Persistante
      </h3>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {todos.length}
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-500">Total</div>
        </div>
        <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {completedCount}
          </div>
          <div className="text-sm text-green-700 dark:text-green-500">Terminées</div>
        </div>
        <div className="p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {todos.length - completedCount}
          </div>
          <div className="text-sm text-yellow-700 dark:text-yellow-500">En cours</div>
        </div>
      </div>

      {/* Add form */}
      <form onSubmit={addTodo} className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="Nouvelle tâche..."
            className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 outline-none transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
          >
            ➕ Ajouter
          </button>
        </div>
      </form>

      {/* Todo list */}
      <div className="space-y-2 mb-6">
        {todos.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            Aucune tâche pour le moment
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 p-4 rounded-lg transition-all ${
                todo.completed
                  ? 'bg-gray-100 dark:bg-gray-700 opacity-60'
                  : 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600'
              }`}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  todo.completed
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'
                }`}
              >
                {todo.completed && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              <div className="flex-1">
                <div className={`font-semibold ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-white'}`}>
                  {todo.title}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(todo.createdAt).toLocaleString('fr-FR')}
                </div>
              </div>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      {/* Actions */}
      {todos.length > 0 && (
        <button
          onClick={removeTodos}
          className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
        >
          🗑️ Tout effacer
        </button>
      )}
    </div>
  );
};