import React, { Component } from 'react'
import { Alert, TouchableOpacity, StyleSheet, View } from 'react-native'
import DefaultText from './DefaultText'
import Variables from '../utils/variables'
import { connect } from 'react-redux'
import * as loginActions from '../screens/login/redux/modules/loginSignup'

class LogOut extends Component {
  constructor(props) {
    super(props)
    this.logoutAction = this.logoutAction.bind(this)
  }

  logoutAction() {
    const { submitLogout, sendLoggedOut } = this.props

    submitLogout()
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => sendLoggedOut() },
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <TouchableOpacity onPress={this.logoutAction}>
        <DefaultText>{"Logout"}</DefaultText>
      </TouchableOpacity>
    )
  }
}

export default connect(null, loginActions)(LogOut);
