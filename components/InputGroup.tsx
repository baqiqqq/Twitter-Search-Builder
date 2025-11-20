import React, { useRef } from 'react';
import { Calendar } from 'lucide-react';

interface InputGroupProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'date' | 'number';
  prefix?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({ 
  label, 
  value, 
  onChange, 
  placeholder = '', 
  type = 'text',
  prefix
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isDate = type === 'date';

  const handleContainerClick = () => {
    if (isDate && inputRef.current) {
      // Modern browsers support showing the picker programmatically
      if ('showPicker' in HTMLInputElement.prototype) {
        try {
          inputRef.current.showPicker();
        } catch (e) {
          inputRef.current.focus();
        }
      } else {
        inputRef.current.focus();
      }
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">{label}</label>
      <div 
        className="relative group"
        onClick={handleContainerClick}
      >
        {prefix && !isDate && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-medium pointer-events-none">
            {prefix}
          </span>
        )}

        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`
            w-full rounded-lg border bg-slate-50 dark:bg-slate-900 
            text-sm font-sans text-slate-800 dark:text-slate-200 
            border-slate-200 dark:border-slate-700
            placeholder:text-slate-400 dark:placeholder:text-slate-600 
            focus:border-twitter-500 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-twitter-500/20 
            transition-all dark:[color-scheme:dark]
            ${prefix ? 'pl-8 pr-3' : 'px-3'}
            ${isDate ? 'pr-10 cursor-pointer py-3 min-h-[46px]' : 'py-2.5'}
          `}
        />

        {isDate && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-hover:text-twitter-500 dark:group-hover:text-twitter-400 transition-colors pointer-events-none">
            <Calendar className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputGroup;