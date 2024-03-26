export const INITIAL_USERS_OBJ = {
  username: '',
  fullName: '',
  judgeNumber: '',
  eventId: '',
  role: '',
  email: '',
};

export const INITIAL_CANDIDATE_OBJ = {
  number: '1',
  fullName: '',
  course: '',
};

export const INITIAL_LOGIN_OBJ = {
  username: '',
  password: '',
};

export const INITIAL_COMP_OBJ = {
  number: '1',
  name: '',
  multiplier: '',
  finalists: '',
  isFinalist: 'false',
  criteria: [{ title: '', percent: '' }],
};

export const IS_FINALIST_OBJ = [
  {
    name: 'Yes',
    value: 'true',
  },
  {
    name: 'No',
    value: 'false',
  },
];

export const INITIAL_USER_DATA = {
  userId: '',
  isLock: true,
  eventName: '',
  fullName: '',
  role: '',
  judgeNumber: 0,
  listOfCompetitions: [],
};

export const FINALISTS_COMP = ['Question & Answer', 'Question & Answer II'];
