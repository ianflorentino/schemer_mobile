import React, { Component } from 'react'
import { Alert, TouchableOpacity, StatusBar, StyleSheet, Text, View } from 'react-native'
import DefaultText from '../../components/DefaultText'
import { connect } from 'react-redux';
import * as loginActions from '../login/redux/modules/loginSignup';

class HomeScreen extends Component {
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
      <View>
        <Text>HomeScreen</Text>
        <TouchableOpacity onPress={this.logoutAction}>
          <DefaultText>{"Logout"}</DefaultText>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect(null, loginActions)(HomeScreen);
