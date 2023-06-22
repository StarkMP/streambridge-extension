export const formatNumber = (x: number): string =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const formatLanguage = (language: string): string =>
  language.slice(0, 2).toLowerCase();
