import React from 'react';
import { SearchState, languages } from '../types';
import { Users, Calendar, Hash, Filter, BarChart2, Globe } from 'lucide-react';
import InputGroup from './InputGroup';
import Toggle from './Toggle';

interface BuilderFormProps {
  state: SearchState;
  onChange: (newState: SearchState) => void;
}

const BuilderForm: React.FC<BuilderFormProps> = ({ state, onChange }) => {
  
  const update = (field: keyof SearchState, value: any) => {
    onChange({ ...state, [field]: value });
  };

  return (
    <div className="space-y-8">
      
      {/* Keywords Section */}
      <section className="space-y-4">
        <h3 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
          <Hash className="w-4 h-4" /> Kelimeler & Etiketler
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputGroup 
            label="Tüm bu kelimeler (AND)" 
            placeholder="elma armut (ikisi de olmalı)" 
            value={state.allWords} 
            onChange={(v) => update('allWords', v)} 
          />
          <InputGroup 
            label="Tam bu ifade" 
            placeholder="mutlu yıllar" 
            value={state.exactPhrase} 
            onChange={(v) => update('exactPhrase', v)} 
          />
          <InputGroup 
            label="Bu kelimelerden herhangi biri (OR)" 
            placeholder="kedi köpek (biri olsa yeter)" 
            value={state.anyWords} 
            onChange={(v) => update('anyWords', v)} 
          />
          <InputGroup 
            label="Bu kelimelerin hiçbiri (NOT)" 
            placeholder="spam bot (bunlar olmasın)" 
            value={state.noneWords} 
            onChange={(v) => update('noneWords', v)} 
          />
          <div className="md:col-span-2">
            <InputGroup 
              label="Hashtagler" 
              placeholder="#teknoloji #yazılım" 
              value={state.hashtags} 
              onChange={(v) => update('hashtags', v)} 
            />
          </div>
        </div>
      </section>

      <hr className="border-slate-100 dark:border-slate-800" />

      {/* Accounts Section */}
      <section className="space-y-4">
        <h3 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
          <Users className="w-4 h-4" /> Hesaplar
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputGroup 
            label="Bu hesaptan (From)" 
            placeholder="@kullanici" 
            value={state.fromUser} 
            onChange={(v) => update('fromUser', v)} 
            prefix="@"
          />
          <InputGroup 
            label="Bu hesaba (To)" 
            placeholder="@kullanici" 
            value={state.toUser} 
            onChange={(v) => update('toUser', v)} 
            prefix="@"
          />
          <InputGroup 
            label="Bu hesaptan bahseden" 
            placeholder="@kullanici" 
            value={state.mentions} 
            onChange={(v) => update('mentions', v)} 
            prefix="@"
          />
        </div>
      </section>

      <hr className="border-slate-100 dark:border-slate-800" />

      {/* Date & Language Section */}
      <section className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Tarih Aralığı
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <InputGroup 
                label="Başlangıç Tarihi" 
                type="date"
                value={state.since} 
                onChange={(v) => update('since', v)} 
              />
              <InputGroup 
                label="Bitiş Tarihi" 
                type="date"
                value={state.until} 
                onChange={(v) => update('until', v)} 
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
              <Globe className="w-4 h-4" /> Dil
            </h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Dil Seçin</label>
              <select 
                value={state.lang}
                onChange={(e) => update('lang', e.target.value)}
                className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 
                  text-sm font-sans text-slate-800 dark:text-slate-200 
                  focus:border-twitter-500 focus:ring-2 focus:ring-twitter-500/20 
                  py-2.5 px-3 transition-all outline-none"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>
      
      <hr className="border-slate-100 dark:border-slate-800" />

      {/* Metrics Section */}
      <section className="space-y-4">
        <h3 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
          <BarChart2 className="w-4 h-4" /> Etkileşim (En az)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputGroup 
            label="Beğeni Sayısı" 
            placeholder="0" 
            type="number"
            value={state.minFaves} 
            onChange={(v) => update('minFaves', v)} 
          />
          <InputGroup 
            label="Retweet Sayısı" 
            placeholder="0" 
            type="number"
            value={state.minRetweets} 
            onChange={(v) => update('minRetweets', v)} 
          />
          <InputGroup 
            label="Yanıt Sayısı" 
            placeholder="0" 
            type="number"
            value={state.minReplies} 
            onChange={(v) => update('minReplies', v)} 
          />
        </div>
      </section>

      <hr className="border-slate-100 dark:border-slate-800" />

      {/* Filters Section */}
      <section className="space-y-4">
        <h3 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filtreler
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-400 uppercase">Medya</h4>
            <Toggle label="Görsel İçerir" checked={state.hasImages} onChange={(v) => update('hasImages', v)} />
            <Toggle label="Video İçerir" checked={state.hasVideos} onChange={(v) => update('hasVideos', v)} />
            <Toggle label="Herhangi Bir Medya" checked={state.hasMedia} onChange={(v) => update('hasMedia', v)} />
            <Toggle label="Link İçerir" checked={state.hasLinks} onChange={(v) => update('hasLinks', v)} />
          </div>
          
          <div className="space-y-2">
             <h4 className="text-xs font-semibold text-slate-400 uppercase">Yanıtlar</h4>
             <Toggle label="Sadece Yanıtlar" checked={state.isReply} onChange={(v) => {
                update('isReply', v);
                if (v) update('excludeReplies', false);
             }} />
             <Toggle label="Yanıtları Gizle" checked={state.excludeReplies} onChange={(v) => {
                update('excludeReplies', v);
                if (v) update('isReply', false);
             }} />
          </div>

          <div className="space-y-2">
             <h4 className="text-xs font-semibold text-slate-400 uppercase">Retweetler</h4>
             <Toggle label="Sadece Retweetler" checked={state.isRetweet} onChange={(v) => {
                update('isRetweet', v);
                if (v) update('excludeRetweets', false);
             }} />
             <Toggle label="Retweetleri Gizle" checked={state.excludeRetweets} onChange={(v) => {
                update('excludeRetweets', v);
                if (v) update('isRetweet', false);
             }} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuilderForm;