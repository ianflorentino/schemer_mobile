import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import navigation from './navigation'
import loginSignup, { loginSignupEpic } from '../screens/login/redux/modules/loginSignup';
import events, { eventsEpic } from '../screens/home/redux/modules/events';
import account from '../screens/account/redux/modules/account';

const allReducers = {
  loginSignup,
  events,
  account,
  navigation
}

export const rootEpic = combineEpics(
  loginSignupEpic,
  eventsEpic
)

export default allReducers;

