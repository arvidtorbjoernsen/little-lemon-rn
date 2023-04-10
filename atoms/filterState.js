import { atom } from 'recoil';

export const filterState = atom({
  key: 'filters',
  default: {
    Starters: false,
    Mains: false,
    Desserts: false,
    Drinks: false,
  },
});
