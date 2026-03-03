import { LocalStorageDemo } from './LocalStorageDemo';
import { SessionStorageDemo } from './SessionStorageDemo';
import { CrossTabDemo } from './CrossTabDemo';
import { TypesDemo } from './TypesDemo';
import { TodoListDemo } from './TodoListDemo';
import { ThemeDemo } from './ThemeDemo';
import { FormDemo } from './FormDemo';

export const StorageDemo = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
            💾 useLocalStorage Hook
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
            Projet 24/100 • Custom Hook Creation
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            Hook personnalisé type-safe pour localStorage avec synchronisation cross-tab
          </p>
        </div>

        {/* Demos */}
        <div className="space-y-8">
          {/* Row 1 */}
          <div className="grid lg:grid-cols-2 gap-8">
            <LocalStorageDemo />
            <SessionStorageDemo />
          </div>

          {/* Row 2 */}
          <div className="grid lg:grid-cols-2 gap-8">
            <CrossTabDemo />
            <TypesDemo />
          </div>

          {/* Row 3 */}
          <div className="grid lg:grid-cols-2 gap-8">
            <ThemeDemo />
            <TodoListDemo />
          </div>

          {/* Row 4 - Full width */}
          <FormDemo />

          {/* Features */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              ✨ Fonctionnalités
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Type-Safe</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Génériques TypeScript, 0% any
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Cross-Tab Sync</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Synchronisation entre onglets
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Error Handling</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Gestion d'erreurs robuste
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">SSR Safe</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Compatible Server-Side Rendering
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Serialization</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    JSON automatique personnalisable
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Performance</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Optimisé avec useCallback
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              💻 Exemples d'utilisation
            </h2>

            <div className="space-y-6">
              {/* Basic usage */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Utilisation basique :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`import { useLocalStorage } from './hooks';

function MyComponent() {
  const [name, setName, removeName] = useLocalStorage('name', '');
  
  return (
    <input 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
    />
  );
}`}
                </pre>
              </div>

              {/* With types */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Avec types complexes :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`interface User {
  name: string;
  email: string;
}

const [user, setUser] = useLocalStorage<User>('user', {
  name: '',
  email: ''
});`}
                </pre>
              </div>

              {/* Error handling */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Gestion d'erreurs :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`const [value, setValue, removeValue, error] = useLocalStorage('key', 0);

if (error) {
  console.error('Storage error:', error.message);
}`}
                </pre>
              </div>

              {/* Session storage */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">sessionStorage :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`import { useSessionStorage } from './hooks';

const [session, setSession] = useSessionStorage('session', {
  visitCount: 0
});`}
                </pre>
              </div>

              {/* Custom serialization */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Sérialisation personnalisée :</h3>
                <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
{`const [data, setData] = useLocalStorage('data', initialValue, {
  serializer: (value) => btoa(JSON.stringify(value)),
  deserializer: (value) => JSON.parse(atob(value))
});`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};