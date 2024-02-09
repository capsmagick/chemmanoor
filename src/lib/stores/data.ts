import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

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


export const UserStore: Writable<UserData> = writable({
  userID:'',
  prefix:'',
  firstName: '',
  middleName:'',
  lastName: '',
  profilePicture:'',
  dob:'',
  occupation:'',
  relationshipStatus:'',
  late:'',
  phone:'',
  email:'',
  dateOfMarriage:'',
  dateOfDeath:'',
  chart:'',
  gen:'',
  index:'', 
  approvalStatus:'',
  lifeMember:'',
  sponsorStatus:''// ... other form fields
});
export const UserOnboard = writable({
  UserID:'',

});
export type UserData = {
  userID: string;
  prefix: string;
  firstName: string;
  middleName: string;
  lastName: string;
  profilePicture: string;
  dob: string;
  occupation: string;
  relationshipStatus: string;
  late: string;
  phone: string;
  email: string;
  dateOfMarriage: string;
  dateOfDeath: string;
  chart: string;
  gen: string;
  index: string;
  approvalStatus: string;
  lifeMember: string;
  sponsorStatus: string;
}


type FamilyData = {
  myself: string;
  father: string;
  mother: string;
  lifepartner: string;
  children: string[]; // Changed from never[] to string[]
};

export const FamilyStore: Writable<FamilyData> = writable({
  myself: '',
  father: '',
  mother: '',
  lifepartner: '',
  children: []
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
  firstNameOfSpouse: '',
  middleNameOfSpouse:'',
  lastNameOfSpouse: '',
  dateOfBirthSpouse:'',
  emailOfSpouse: '',
});

export const FatherStore = writable({
  prefix:'',
  firstNameOfFather: '',
  middleNameOfFather:'',
  lastNameOfFather: '',
  occupationOfFather:'',
  dateOfBirthFather:'',
  dateOfDeathFather:'',
  chart:'',
  gen:'',
  index:'',
  late: false,
});

export const MotherStore = writable({
  prefix:'',
  firstNameOfMother: '',
  middleNameOfMother:'',
  lastNameOfMother: '',
  occupationOfMother:'',
  dateOfBirthMother:'',
  dateOfDeathMother:'',
  chart:'',
  gen:'',
  index:'',
  late: false,
});

export const ChildrenStore = writable({
  prefix:'',
  firstNameOfChild: '',
  middleNameOfChild:'',
  lastNameOfChild: '',
  dateOfBirthChild:'',
  emailOfChild: '',
  sex:'',
});