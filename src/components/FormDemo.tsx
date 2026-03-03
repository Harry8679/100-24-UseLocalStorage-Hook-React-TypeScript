import { useState } from 'react';
import { useLocalStorage } from '../hooks';
import type { FormData } from '../types';

export const FormDemo = () => {
  const [formData, setFormData, clearForm] = useLocalStorage<FormData>('contact-form', {
    name: '',
    email: '',
    message: '',
    subscribe: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      clearForm();
    }, 3000);
  };

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const hasData = formData.name || formData.email || formData.message;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Formulaire Auto-sauvegardé
      </h3>

      {submitted ? (
        <div className="p-8 bg-green-100 dark:bg-green-900/20 border-2 border-green-500 rounded-xl text-center">
          <div className="text-6xl mb-4">✅</div>
          <h4 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
            Formulaire envoyé !
          </h4>
          <p className="text-green-600 dark:text-green-500">
            Merci pour votre message, nous vous répondrons bientôt.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Nom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              required
              placeholder="Votre nom"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              required
              placeholder="votre@email.com"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => updateField('message', e.target.value)}
              required
              rows={4}
              placeholder="Votre message..."
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 outline-none transition-colors resize-none"
            />
          </div>

          {/* Subscribe */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.subscribe}
                onChange={(e) => updateField('subscribe', e.target.checked)}
                className="w-5 h-5"
              />
              <span className="text-gray-700 dark:text-gray-300">
                M'abonner à la newsletter
              </span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
            >
              📧 Envoyer
            </button>
            <button
              type="button"
              onClick={clearForm}
              disabled={!hasData}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🗑️ Effacer
            </button>
          </div>
        </form>
      )}

      <div className="mt-6 p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
        <p className="text-sm text-green-700 dark:text-green-400">
          💾 <strong>Auto-sauvegarde :</strong> Vos données sont sauvegardées automatiquement à chaque modification.
          Actualisez la page pour voir la persistance !
        </p>
      </div>
    </div>
  );
};