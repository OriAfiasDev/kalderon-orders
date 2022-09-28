export const days = {
  short: ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'],
  long: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
};

export const convertNumToDay = (num: number, type: 'short' | 'long' = 'long') => {
  return days[type][num];
};

export const convertDayToNum = (day: string) => {
  return days.long.indexOf(day);
};

export const hebToEnglish = (heb: string) => {
  const hebToEng: { [letter: string]: string } = {
    א: 'a',
    ב: 'b',
    ג: 'g',
    ד: 'd',
    ה: 'h',
    ו: 'v',
    ז: 'z',
    ח: 'ch',
    ט: 't',
    י: 'y',
    כ: 'k',
    ל: 'l',
    מ: 'm',
    נ: 'n',
    ס: 's',
    ע: 'a',
    פ: 'p',
    צ: 'ts',
    ק: 'k',
    ר: 'r',
    ש: 'sh',
    ת: 't',
  };

  return heb
    .split('')
    .map(letter => (letter in hebToEng ? hebToEng[letter] : ''))
    .join('');
};

export const arrayToMap = <T>(array: T[], key: string): { [key: string]: T } => {
  const map: { [id: string]: T } = {};
  
  array.forEach(item => (map[item[key as keyof T] as string] = item));
  return map;
}