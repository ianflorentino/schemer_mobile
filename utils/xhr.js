import { ajax } from 'rxjs/observable/dom/ajax';

const xhr = (options) => {
  let defaultOptions =  {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    crossDomain: true
  }

  return ajax(Object.assign(defaultOptions, options))
}

export default xhr
