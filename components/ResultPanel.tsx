import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Search } from 'lucide-react';

interface ResultPanelProps {
  query: string;
}

const ResultPanel: React.FC<ResultPanelProps> = ({ query }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!query) return;
    navigator.clipboard.writeText(query).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleOpenTwitter = () => {
    if (!query) return;
    const encodedQuery = encodeURIComponent(query);
    window.open(`https://twitter.com/search?q=${encodedQuery}&src=typed_query`, '_blank');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="bg-gradient-to-r from-twitter-600 to-twitter-500 p-4 text-white">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Search className="w-5 h-5 text-white/80" />
          Arama Sorgusu
        </h2>
        <p className="text-twitter-100 text-xs mt-1">Kullanıma hazır arama metni</p>
      </div>
      
      <div className="p-5 space-y-4">
        <div className="relative">
          <textarea
            readOnly
            value={query}
            placeholder="Filtreleri seçtikçe sorgu burada oluşacak..."
            className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-twitter-500/50 transition-colors"
          />
          {!query && (
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm pointer-events-none">
              Henüz bir kriter seçilmedi
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleCopy}
            disabled={!query}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 
              ${copied 
                ? 'bg-green-500 text-white shadow-green-200' 
                : 'bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 shadow-slate-200 dark:shadow-none'
              } shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Kopyalandı!' : 'Kopyala'}
          </button>

          <button
            onClick={handleOpenTwitter}
            disabled={!query}
            className="flex-1 py-2.5 px-4 rounded-lg font-medium border border-twitter-500 text-twitter-600 dark:text-twitter-400 hover:bg-twitter-50 dark:hover:bg-twitter-900/30 flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            <ExternalLink className="w-4 h-4" />
            Twitter'da Ara
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPanel;