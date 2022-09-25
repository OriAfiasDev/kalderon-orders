export const convertNumToDay1 = (num: number) => {
  switch (num) {
    case 0:
      return 'ראשון';
    case 1:
      return 'שני';
    case 2:
      return 'שלישי';
    case 3:
      return 'רביעי';
    case 4:
      return 'חמישי';
    case 5:
      return 'שישי';
    case 6:
      return 'שבת';
    default:
      return 'Invalid day';
  }
};

export const convertNumToDay = (num: number, type: 'short' | 'long' = 'long') => {
  const days = { 
    short: ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'],
    long: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
  }

  return days[type][num];
}