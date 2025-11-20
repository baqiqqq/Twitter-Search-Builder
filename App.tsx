import React, { useState, useEffect } from 'react';
import { SearchState, initialSearchState } from './types';
import BuilderForm from './components/BuilderForm';
import ResultPanel from './components/ResultPanel';
import { generateTwitterQuery } from './utils/queryBuilder';
import { Search, Twitter, Moon, Sun } from 'lucide-react';

const App: React.FC = () => {
  const [searchState, setSearchState] = useState<SearchState>(initialSearchState);
  const [query, setQuery] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check local storage or system preference on initial load
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const newQuery = generateTwitterQuery(searchState);
    setQuery(newQuery);
  }, [searchState]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleReset = () => {
    setSearchState(initialSearchState);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-twitter-500 p-2 rounded-lg">
              <Twitter className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">Twitter Search Builder</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">Gelişmiş Arama Operatörü Oluşturucu</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-500 dark:text-slate-400 hidden md:block">
              Kod yazmadan karmaşık sorgular oluşturun
            </div>
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 gap-6 grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Form Builder */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-twitter-500" />
                Arama Seçenekleri
              </h2>
              <button 
                onClick={handleReset}
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-twitter-600 dark:hover:text-twitter-400 hover:underline font-medium transition-colors"
              >
                Sıfırla
              </button>
            </div>
            <div className="p-6">
              <BuilderForm state={searchState} onChange={setSearchState} />
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Preview */}
        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 h-fit space-y-6">
           <ResultPanel query={query} />
           
           {/* Help Card */}
           <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800/50 transition-colors duration-300">
              <h3 className="text-blue-900 dark:text-blue-100 font-semibold mb-2">Nasıl Çalışır?</h3>
              <ul className="space-y-2 text-sm text-blue-800/80 dark:text-blue-200/80 list-disc list-inside">
                <li>Soldaki panelden kriterlerinizi seçin.</li>
                <li>Sorgunuz anlık olarak bu panelde oluşturulur.</li>
                <li>"Kopyala" butonuna basın.</li>
                <li>Twitter arama çubuğuna yapıştırın.</li>
              </ul>
           </div>
        </div>

      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 mt-auto transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 dark:text-slate-500 text-sm">
          Twitter Advanced Search Builder &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default App;