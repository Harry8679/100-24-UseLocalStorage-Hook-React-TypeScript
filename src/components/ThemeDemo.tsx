import { useLocalStorage } from '../hooks';

type Theme = 'light' | 'dark' | 'auto';

export const ThemeDemo = () => {
  const [theme, setTheme] = useLocalStorage<Theme>('app-theme', 'auto');

  const themes: Array<{ value: Theme; label: string; icon: string; color: string }> = [
    { value: 'light', label: 'Clair', icon: '☀️', color: 'yellow' },
    { value: 'dark', label: 'Sombre', icon: '🌙', color: 'blue' },
    { value: 'auto', label: 'Auto', icon: '🔄', color: 'purple' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Préférence de Thème
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {themes.map((t) => (
            <button
              key={t.value}
              onClick={() => setTheme(t.value)}
              className={`p-6 rounded-xl transition-all ${
                theme === t.value
                  ? `bg-${t.color}-500 text-white scale-105 shadow-lg`
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:scale-105'
              }`}
            >
              <div className="text-4xl mb-2">{t.icon}</div>
              <div className="font-bold">{t.label}</div>
            </button>
          ))}
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Thème actuel :
          </div>
          <div className="text-xl font-bold text-gray-800 dark:text-white capitalize">
            {theme}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-700 dark:text-blue-400">
          💡 La préférence de thème est sauvegardée et restaurée automatiquement.
        </p>
      </div>
    </div>
  );
};