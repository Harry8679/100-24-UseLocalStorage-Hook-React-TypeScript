import { useLocalStorage } from '../hooks';

export const LocalStorageDemo = () => {
  const [count, setCount, removeCount, error] = useLocalStorage('demo-count', 0);
  const [name, setName, removeName] = useLocalStorage('demo-name', '');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        localStorage Demo
      </h3>

      {/* Counter */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Compteur persistant
        </h4>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCount(c => c - 1)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
          >
            -
          </button>
          <div className="text-3xl font-bold text-gray-800 dark:text-white">
            {count}
          </div>
          <button
            onClick={() => setCount(c => c + 1)}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
          >
            +
          </button>
          <button
            onClick={removeCount}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Name input */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Nom persistant
        </h4>
        <div className="flex gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Entrez votre nom..."
            className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 outline-none transition-colors"
          />
          <button
            onClick={removeName}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
          >
            Effacer
          </button>
        </div>
        {name && (
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Bonjour, <strong>{name}</strong> !
          </p>
        )}
      </div>

      {/* Error display */}
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900/20 border-2 border-red-500 rounded-lg">
          <p className="text-red-700 dark:text-red-400 font-semibold">
            ❌ Erreur : {error.message}
          </p>
        </div>
      )}

      {/* Info */}
      <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-700 dark:text-blue-400">
          💡 Les valeurs sont sauvegardées dans localStorage et persistent après rechargement de la page.
        </p>
      </div>
    </div>
  );
};