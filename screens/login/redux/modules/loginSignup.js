import xhr from '../../../../utils/xhr.js'
import { Observable } from 'rxjs'
import { combineEpics } from 'redux-observable'
import { SIGNUP_URL, LOGIN_URL } from '../routes'
import { NavigationActions } from 'react-navigation'
import { Alert } from 'react-native'

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null
}

export const PERSIST_REHYDRATE   = 'persist/REHYDRATE'

export const USER_LOGIN          = 'USER_LOGIN'
export const USER_LOGOUT         = 'USER_LOGOUT'
export const USER_SIGN_UP        = 'USER_SIGN_UP'
export const USER_SIGNED_UP      = 'USER_SIGNED_UP'
export const USER_LOGGED_IN      = 'USER_LOGGED_IN'
export const USER_LOGGED_OUT     = 'USER_LOGGED_OUT'
export const USER_LOGIN_FAILED   = 'USER_LOGIN_FAILED'
export const USER_SIGNUP_FAILED  = 'USER_SIGNUP_FAILED'

export default loginSignup = (state = initialState, action) => {
  switch(action.type) {
    case USER_LOGIN, USER_LOGOUT:
      return {
        ...state,
        loading: true
      }
    case USER_LOGGED_IN:
      return {
        ...state,
        accessToken: action.payload.access_token,
        refreshToken: action.payload.refresh_token,
        loading: false,
        isLoggedIn: true
      }
    case USER_LOGGED_OUT:
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        loading: false,
        isLoggedIn: false 
      }
    default:
      return state
  }
}

export const submitLogin = (payload) => ({
  type: USER_LOGIN, payload, url: LOGIN_URL
})

export const submitLogout = () => ({
  type: USER_LOGOUT
})

export const submitSignup = () => ({
  type: USER_SIGN_UP, url: SIGNUP_URL
})

const persistLogin = (payload) => ({
  type: USER_LOGGED_IN, payload
})

export const sendLoggedOut = () => ({
	type: USER_LOGGED_OUT
})

const prepareSignupInformation = (getState) => {
  const state = getState()
  const { 
    username,
    email,
    password,
    password_confirmation
  } = state.form.signup.values

  return {
    username,
    email,
    password,
    password_confirmation
  }
}

const submitLoginEpic = (action$, {getState}) =>
  action$.ofType(USER_LOGIN)
    .switchMap(({payload,url}) => {
      const body = Object.assign(payload, {grant_type: 'password'})

      return xhr({method: 'POST', body: body, url})
        .map(data => persistLogin(data.response))
        .catch(e => Observable.of(
          {type: USER_LOGIN_FAILED},
          console.log(e)
        ))
    })

const submitSignupEpic = (action$, {getState}) =>
  action$.ofType(USER_SIGN_UP)
    .map(({url}) => Object.assign({url}, prepareSignupInformation(getState)))
    .switchMap(({url, ...data}) => {
      return Observable
        .from(xhr({method: 'POST', body: data, url}))
        .map(({email}) => {
          return {
            type: USER_LOGIN,
            payload: {
              login: email,
              password: data.password
            }
          }
        })
        .catch(e => Observable.of(
          {type: USER_SIGNUP_FAILED},
          console.log(e)
        ))
    })

const persistRehydrateEpic = (action$, {getState}) =>
	action$.ofType(PERSIST_REHYDRATE)
    .switchMap(() => {
      const state = getState()
      const { isLoggedIn } = state.loginSignup

      let returnObservable = isLoggedIn
        ? { type: "NOTUSED" } // have to return at least 1 action
        : { type: USER_LOGGED_OUT }

      return Observable.of(returnObservable)
    })

export const loginSignupEpic = combineEpics(
  persistRehydrateEpic,
  submitLoginEpic,
  submitSignupEpic
)
