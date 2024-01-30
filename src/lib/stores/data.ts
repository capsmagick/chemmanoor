import { writable } from 'svelte/store';

export const sessionStore = writable({
  prefix:'',
  firstName: '',
  middleName:'',
  lastName: '',
  profilePicture:'',
  dob:'',
  occupation:'',
  chart:'',
  gen:'',
  index:''  // ... other form fields
});