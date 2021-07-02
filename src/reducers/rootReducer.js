import { combineReducers } from 'redux';

import { authentication } from './authentication';
import { registration } from './registration';
import { users } from './users';
import { alert } from './alerts';
import { authors } from './authors';
import { books } from './books';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  authors,
  books
});

export default rootReducer;