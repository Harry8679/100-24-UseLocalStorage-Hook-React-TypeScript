import { useLocalStorage, useStorageListener } from '../hooks';

export const CrossTabDemo = () => {
  const [message, setMessage] = useLocalStorage('cross-tab-message', '');
  const lastUpdate = useStorageListener('cross-tab-message', 'localStorage');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Synchronisation Cross-Tab
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Message partagé
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tapez un message..."
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        {message && (
          <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <div className="text-sm text-blue-700 dark:text-blue-400 mb-2">
              Message actuel :
            </div>
            <div className="text-lg font-semibold text-blue-600 dark:text-blue-300">
              {message}
            </div>
          </div>
        )}

        {lastUpdate && (
          <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <div className="text-sm text-green-700 dark:text-green-400 mb-2">
              Dernière mise à jour :
            </div>
            <div className="text-sm font-semibold text-green-600 dark:text-green-300">
              {lastUpdate.toLocaleTimeString('fr-FR')}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
        <p className="text-sm text-purple-700 dark:text-purple-400">
          💡 <strong>Astuce :</strong> Ouvrez cette page dans plusieurs onglets et modifiez le message.
          Tous les onglets seront automatiquement synchronisés !
        </p>
      </div>
    </div>
  );
};