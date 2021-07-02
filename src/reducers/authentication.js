import { authenticationConstants } from '../constants/authenticationConstants';
import { authenticationContext } from '../services/authenticationService';

const user = authenticationContext.getCurrentUser();
const initialState = user ? { loggedIn: user !== null, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case authenticationConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case authenticationConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case authenticationConstants.LOGIN_FAILURE:
      return {};
    case authenticationConstants.LOGOUT:
      return { loggedIn: false };
    default:
      return state
  }
}