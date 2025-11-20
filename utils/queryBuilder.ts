import { SearchState } from '../types';

export const generateTwitterQuery = (state: SearchState): string => {
  const parts: string[] = [];

  // --- Keywords ---
  
  // All Words (AND)
  if (state.allWords.trim()) {
    parts.push(state.allWords.trim());
  }

  // Exact Phrase
  if (state.exactPhrase.trim()) {
    parts.push(`"${state.exactPhrase.trim()}"`);
  }

  // Any Words (OR)
  if (state.anyWords.trim()) {
    const words = state.anyWords.split(/\s+/).filter(w => w.length > 0);
    if (words.length > 1) {
      parts.push(`(${words.join(' OR ')})`);
    } else if (words.length === 1) {
      parts.push(words[0]);
    }
  }

  // None Words (NOT)
  if (state.noneWords.trim()) {
    const words = state.noneWords.split(/\s+/).filter(w => w.length > 0);
    words.forEach(word => parts.push(`-${word}`));
  }

  // Hashtags
  if (state.hashtags.trim()) {
    const tags = state.hashtags.split(/\s+/).filter(t => t.length > 0);
    tags.forEach(tag => {
      const formattedTag = tag.startsWith('#') ? tag : `#${tag}`;
      parts.push(formattedTag);
    });
  }

  // --- Language ---
  if (state.lang) {
    parts.push(`lang:${state.lang}`);
  }

  // --- Accounts ---
  if (state.fromUser.trim()) {
    parts.push(`from:${state.fromUser.replace('@', '').trim()}`);
  }
  if (state.toUser.trim()) {
    parts.push(`to:${state.toUser.replace('@', '').trim()}`);
  }
  if (state.mentions.trim()) {
    parts.push(`@${state.mentions.replace('@', '').trim()}`);
  }

  // --- Dates ---
  if (state.since) {
    parts.push(`since:${state.since}`);
  }
  
  if (state.until) {
    // Twitter 'until' operator excludes the specified date (it takes it as 00:00 of that day).
    // To make the search inclusive of the selected end date, we add 1 day to the 'until' parameter.
    try {
      const [year, month, day] = state.until.split('-').map(Number);
      // Create date in UTC to avoid timezone issues
      const date = new Date(Date.UTC(year, month - 1, day));
      // Add 1 day
      date.setUTCDate(date.getUTCDate() + 1);
      
      const nextDay = date.toISOString().split('T')[0];
      parts.push(`until:${nextDay}`);
    } catch (e) {
      // Fallback to original value if parsing fails
      parts.push(`until:${state.until}`);
    }
  }

  // --- Filters (Booleans) ---
  // Note: Some filters are mutually exclusive logic-wise in UI, but Twitter allows stacking.
  // We prioritize "positive" assertions first.
  
  if (state.isReply) {
    parts.push('is:reply');
  } else if (state.excludeReplies) {
    parts.push('-is:reply');
  }

  if (state.isRetweet) {
    parts.push('is:retweet');
  } else if (state.excludeRetweets) {
    parts.push('-is:retweet');
  }

  if (state.hasLinks) parts.push('filter:links');
  if (state.hasMedia) parts.push('filter:media');
  if (state.hasImages) parts.push('filter:images');
  if (state.hasVideos) parts.push('filter:videos'); // can also use filter:native_video

  // --- Metrics ---
  if (state.minFaves && parseInt(state.minFaves) > 0) {
    parts.push(`min_faves:${state.minFaves}`);
  }
  if (state.minRetweets && parseInt(state.minRetweets) > 0) {
    parts.push(`min_retweets:${state.minRetweets}`);
  }
  if (state.minReplies && parseInt(state.minReplies) > 0) {
    parts.push(`min_replies:${state.minReplies}`);
  }

  return parts.join(' ');
};