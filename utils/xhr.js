import { ajax } from 'rxjs/observable/dom/ajax'
import { store } from '../App'

export const RENEW_TOKEN = 'RENEW_TOKEN'

const xhr = (options) => {
  const { accessToken, refreshToken } = store.getState().loginSignup

  let defaultOptions =  {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': `Bearer ${accessToken}`
    },
    crossDomain: true
  }

  return ajax(Object.assign(defaultOptions, options))
}

export default xhr

export const handleErrors = (response, nextType) => {
  let type = response.status === 401
    ? RENEW_TOKEN
    : type = 'NOT 401'

  return { type, nextType }
}
