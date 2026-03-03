import { useLocalStorage } from '../hooks';
import type { User } from '../types';

export const TypesDemo = () => {
  const [user, setUser, removeUser] = useLocalStorage<User>('user-profile', {
    name: 'John Doe',
    email: 'john@example.com',
    preferences: {
      theme: 'light',
      notifications: true,
    },
  });

  const toggleTheme = () => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        theme: prev.preferences.theme === 'light' ? 'dark' : 'light',
      },
    }));
  };

  const toggleNotifications = () => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: !prev.preferences.notifications,
      },
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Types Complexes
      </h3>

      <div className="space-y-6">
        {/* User info */}
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h4 className="font-bold text-gray-800 dark:text-white mb-3">
            Profil utilisateur
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Nom :</span>
              <span className="font-semibold text-gray-800 dark:text-white">{user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Email :</span>
              <span className="font-semibold text-gray-800 dark:text-white">{user.email}</span>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-3">
          <h4 className="font-bold text-gray-800 dark:text-white">
            Préférences
          </h4>

          <div className="flex items-center justify-between p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <div>
              <div className="font-semibold text-blue-700 dark:text-blue-400">
                Thème
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-500">
                {user.preferences.theme === 'light' ? '☀️ Clair' : '🌙 Sombre'}
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
            >
              Changer
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <div>
              <div className="font-semibold text-green-700 dark:text-green-400">
                Notifications
              </div>
              <div className="text-sm text-green-600 dark:text-green-500">
                {user.preferences.notifications ? '✅ Activées' : '❌ Désactivées'}
              </div>
            </div>
            <button
              onClick={toggleNotifications}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
            >
              {user.preferences.notifications ? 'Désactiver' : 'Activer'}
            </button>
          </div>
        </div>

        {/* Form to update user */}
        <div>
          <h4 className="font-bold text-gray-800 dark:text-white mb-3">
            Modifier le profil
          </h4>
          <div className="space-y-3">
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 outline-none transition-colors"
            />
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 outline-none transition-colors"
            />
            <button
              onClick={removeUser}
              className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
        <p className="text-sm text-purple-700 dark:text-purple-400">
          💡 Cet objet complexe avec types imbriqués est automatiquement sérialisé/désérialisé.
        </p>
      </div>
    </div>
  );
};