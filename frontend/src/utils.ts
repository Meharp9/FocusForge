// Formatting
export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function toTitleCase(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Auth
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

// Time blocks
export const formatTimeForApi = (hourLabel: string): string => {
  const [num, ampm] = hourLabel.split(' ');
  return `${num}:00${ampm}`;
};

export const addDuration = (hourLabel: string, duration: string): string => {
  const [num, ampm] = hourLabel.split(' ');
  let hour24 = parseInt(num);
  if (ampm === 'PM' && hour24 !== 12) hour24 += 12;
  if (ampm === 'AM' && hour24 === 12) hour24 = 0;

  const durationHours = parseFloat(duration);
  const totalMinutes = hour24 * 60 + durationHours * 60;
  const endHour24 = Math.floor(totalMinutes / 60) % 24;
  const endMin = totalMinutes % 60;

  const endHour12 = endHour24 % 12 || 12;
  const endAmpm = endHour24 < 12 ? 'AM' : 'PM';
  return `${endHour12}:${endMin.toString().padStart(2, '0')}${endAmpm}`;
};

const parseTo24 = (time: string): number => {
  const match = time.match(/^(\d{1,2}):(\d{2})(am|pm)$/i);
  if (!match) return 0;
  let h = parseInt(match[1]);
  const m = parseInt(match[2]);
  const pm = match[3].toLowerCase() === 'pm';
  if (pm && h !== 12) h += 12;
  if (!pm && h === 12) h = 0;
  return h * 60 + m;
};

export const calcBlockDuration = (start: string, end: string): string => {
  const diff = (parseTo24(end) - parseTo24(start)) / 60;
  return diff % 1 === 0 ? `${diff}h` : `${diff.toFixed(1)}h`;
};
