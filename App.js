import React, { Component } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import Navigator from './Navigator'

import configureStore from './store'

const configStore = configureStore()
const store       = configStore.store
const persistor   = configStore.persistor

export default class Schemer extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    )
  }
}
