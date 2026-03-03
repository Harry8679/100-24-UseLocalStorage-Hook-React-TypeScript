import { useSessionStorage } from '../hooks';

export const SessionStorageDemo = () => {
  const [sessionData, setSessionData, removeSessionData] = useSessionStorage('session-demo', {
    visitCount: 0,
    lastVisit: new Date().toISOString(),
  });

  const incrementVisit = () => {
    setSessionData(prev => ({
      visitCount: prev.visitCount + 1,
      lastVisit: new Date().toISOString(),
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        sessionStorage Demo
      </h3>

      <div className="space-y-4">
        <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
          <div className="text-sm text-purple-700 dark:text-purple-400 mb-2">
            Nombre de visites (cette session)
          </div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-300">
            {sessionData.visitCount}
          </div>
        </div>

        <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
          <div className="text-sm text-green-700 dark:text-green-400 mb-2">
            Dernière visite
          </div>
          <div className="text-lg font-semibold text-green-600 dark:text-green-300">
            {new Date(sessionData.lastVisit).toLocaleTimeString('fr-FR')}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={incrementVisit}
            className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
          >
            📈 Incrémenter
          </button>
          <button
            onClick={removeSessionData}
            className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
          >
            🗑️ Effacer
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
        <p className="text-sm text-yellow-700 dark:text-yellow-400">
          ⚠️ sessionStorage est effacé lorsque vous fermez l'onglet ou la fenêtre du navigateur.
        </p>
      </div>
    </div>
  );
};