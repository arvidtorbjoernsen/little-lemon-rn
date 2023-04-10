import { atom } from 'recoil';

export const dbIsLoadingState = atom({
  key: 'dbIsLoading',
  default: false,
});
