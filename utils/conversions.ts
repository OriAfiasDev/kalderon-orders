export const convertNumToDay = (num: number) => {
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
