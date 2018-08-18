import { combineReducers, createStore, applyMiddleware } from 'redux'
import { reducer as form } from 'redux-form'
import { persistStore, persistReducer } from 'redux-persist'
import { createEpicMiddleware } from 'redux-observable'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import allReducers, { rootEpic } from './reducers'

const appReducer = combineReducers({
  form,
  ...allReducers
})

const epicMiddleware = createEpicMiddleware(rootEpic);
const middleware = [epicMiddleware]

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middleware.push(logger);
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginSignup', 'events', 'account', 'navigation']
}

const persistedReducer = persistReducer(persistConfig, appReducer)

export default configureStore = () => {
  let store = {}

  let enhancer = applyMiddleware(...middleware);
  store = createStore(persistedReducer, enhancer)
  let persistor = persistStore(store)

  return {store, persistor}
}
