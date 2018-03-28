import React, { Component } from 'react'
import { Alert, TouchableOpacity, StyleSheet, View } from 'react-native'
import DefaultText from '../../components/DefaultText'
import Variables from '../../utils/variables'
import { connect } from 'react-redux'
import * as loginActions from '../login/redux/modules/loginSignup'

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
      <View style={styles.container}>
        <DefaultText>HomeScreen</DefaultText>
        <TouchableOpacity onPress={this.logoutAction}>
          <DefaultText>{"Logout"}</DefaultText>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect(null, loginActions)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: Variables.white,
  }
})
