import { writable } from 'svelte/store';

export const UserStore = writable({
  prefix:'',
  firstName: '',
  middleName:'',
  lastName: '',
  profilePicture:'',
  dob:'',
  occupation:'',
  chart:'',
  gen:'',
  index:'', 
  approvalStatus:'',
  lifeMember:'',
  sponsorStatus:''// ... other form fields
});

export const ContactStore = writable({
  email: '',
  phone1: '',
  phone2: '',
  parish: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  country: ''
  });

export const SpouseStore = writable({
  prefix:'',
  firstName: '',
  middleName:'',
  lastName: '',
  dob:'',
  email: '',
});