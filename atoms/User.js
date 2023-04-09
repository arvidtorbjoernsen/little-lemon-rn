import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    image: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    orderStatus: false,
    passwordChanges: false,
    specialOffers: false,
    newsletter: false,
  },
});
