import React, { Component } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import Navigator from './Navigator'
import BottomNav from './components/BottomNav'

import configureStore from './store'

const configStore = configureStore()
const persistor   = configStore.persistor
export const store = configStore.store // hacky to support importing Redux store errwhere

export default class Schemer extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigator />
          <BottomNav />
        </PersistGate>
      </Provider>
    )
  }
}
