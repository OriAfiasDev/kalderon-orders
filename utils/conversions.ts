export const convertNumToDay = (num: number, type: 'short' | 'long' = 'long') => {
  const days = { 
    short: ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'],
    long: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
  }

  return days[type][num];
}