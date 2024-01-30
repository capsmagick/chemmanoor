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