import { writable } from 'svelte/store';

export type UserData = {
    uid:string;
    prefix: string;
    firstName: string;
    middleName: string;
    lastName: string;
    profilePicture: string;
    dob: string;
    occupation: string;
    chart: string;
    gen: string;
    index: string;
    approvalStatus: string;
    lifeMember: string;
    sponsorStatus: string;
  };

  export type ContactData = {
    uid:string;
    email: string;
    phone1: string;
    phone2: string;
    parish: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };


export const UserStore = writable({
  uid:'',
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
  uid:'',
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