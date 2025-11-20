export interface SearchState {
  // Accounts
  fromUser: string;
  toUser: string;
  mentions: string;
  
  // Dates
  since: string;
  until: string;
  
  // Keywords
  allWords: string;
  anyWords: string;
  noneWords: string;
  hashtags: string;
  exactPhrase: string;
  
  // Language
  lang: string;
  
  // Filters (Toggles)
  isReply: boolean;      // is:reply
  isRetweet: boolean;    // is:retweet
  excludeRetweets: boolean; // -is:retweet
  excludeReplies: boolean;  // -is:reply
  hasLinks: boolean;     // filter:links
  hasMedia: boolean;     // filter:media
  hasImages: boolean;    // filter:images
  hasVideos: boolean;    // filter:videos
  
  // Metrics
  minFaves: string;
  minRetweets: string;
  minReplies: string;
}

export const initialSearchState: SearchState = {
  fromUser: '',
  toUser: '',
  mentions: '',
  since: '',
  until: '',
  allWords: '',
  anyWords: '',
  noneWords: '',
  hashtags: '',
  exactPhrase: '',
  lang: '',
  isReply: false,
  isRetweet: false,
  excludeRetweets: false,
  excludeReplies: false,
  hasLinks: false,
  hasMedia: false,
  hasImages: false,
  hasVideos: false,
  minFaves: '',
  minRetweets: '',
  minReplies: '',
};

export const languages = [
  { code: '', label: 'Tüm Diller' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'en', label: 'İngilizce' },
  { code: 'de', label: 'Almanca' },
  { code: 'fr', label: 'Fransızca' },
  { code: 'es', label: 'İspanyolca' },
  { code: 'ja', label: 'Japonca' },
  { code: 'pt', label: 'Portekizce' },
  { code: 'ru', label: 'Rusça' },
  { code: 'ar', label: 'Arapça' },
];