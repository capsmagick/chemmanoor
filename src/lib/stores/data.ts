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