import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import navigation from './navigation'
import loginSignup, { loginSignupEpic } from '../screens/login/redux/modules/loginSignup';

const allReducers = {
  loginSignup,
  navigation
}

export const rootEpic = combineEpics(
  loginSignupEpic
)

export default allReducers;

