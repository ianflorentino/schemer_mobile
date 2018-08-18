import xhr, { handleErrors } from '../../../../utils/xhr.js'
import { Observable } from 'rxjs'
import { combineEpics } from 'redux-observable'
import Variables from '../../../../utils/variables'
import { HOME_URL } from '../routes'

const initialState = {
  items: [],
  last_time_query: 0
}

export const LOAD_HOMESCREEN      = 'LOAD_HOMESCREEN'
export const REQUEST_HOME         = 'REQUEST_HOME'
export const REQUEST_HOME_SUCCESS = 'REQUEST_HOME_SUCCESS'
export const REQUEST_HOME_FAILED  = 'REQUEST_HOME_FAILED'

export default events = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_HOMESCREEN:
      return {
        ...state,
        loading: true
      }
    case REQUEST_HOME_SUCCESS:
      return {
        ...state,
        loading: false,
        last_time_query: Date.now(),
        items: action.payload.events
      }
    default:
      return state
  }
}

export const loadHomescreen = (payload) => ({
  type: LOAD_HOMESCREEN, payload
})

export const requestHome = () => ({
  type: REQUEST_HOME, url: HOME_URL
})

export const persistEvents = (payload) => ({
  type: REQUEST_HOME_SUCCESS, payload
})

const loadHomeScreenEpic = (action$, {getState}) =>
  action$.ofType(LOAD_HOMESCREEN)
    .switchMap(({payload}) => {
      const state = getState()
      const { events: items } = state
      const shouldRequestHome = (!items.length 
          || (payload.current_time_query - state.last_time_query) > Variables.throttleTime)

      let returnObservable = shouldRequestHome
        ? { type: REQUEST_HOME, url: HOME_URL }
        : { type: "DONT_NEED_TO_REQUEST" }

      return Observable.of(returnObservable)
    })

const requestHomeEpic = (action$, {getState}) =>
  action$.ofType(REQUEST_HOME)
    .switchMap(({ type, url }) => {
      return xhr({method: 'GET', url})
        .map(data => persistEvents(data.response))
        .catch(response => Observable.of(
          handleErrors(response, type),
          {type: REQUEST_HOME_FAILED, response}
        ))
    })

export const eventsEpic = combineEpics(
  loadHomeScreenEpic,
  requestHomeEpic
)
