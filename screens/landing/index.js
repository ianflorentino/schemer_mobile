import React, { Component } from 'react'
import { TouchableOpacity, StatusBar, StyleSheet, Text, View } from 'react-native'
import { Constants } from 'expo'
import Variables from '../../utils/variables'
import Button from '../../components/Button'
import DefaultText from '../../components/DefaultText'

export default class LandingScreen extends Component {
  constructor(props) {
    super(props)
    this.loginAction = this.loginAction.bind(this)
    this.signUpAction = this.signUpAction.bind(this)
  }

  loginAction() {
    const { navigate } = this.props.navigation
    navigate('LoginScreen')
  }

  signUpAction() {
    const { navigate } = this.props.navigation
    navigate('SignupScreen')
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' />
        <DefaultText style={styles.header}>schemer</DefaultText>
        <DefaultText style={styles.subTitle}>create.plan.scheme.</DefaultText>
        <Button 
          style={styles.signUp}
          width="100%"
          text="Sign up"
          action={this.signUpAction} />
        <TouchableOpacity style={styles.loginContainer} onPress={this.loginAction}>
          <DefaultText style={styles.login}>{"I'm Already Scheming"}</DefaultText>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: Variables.white,
  },
  statusBar: {
    backgroundColor: Variables.white,
    height: Constants.statusBarHeight,
  },
  header: {
    fontWeight: "bold",
    fontSize: 75,
    letterSpacing: -5,
    color: Variables.mainColor,
    marginTop: -150
  },
  subTitle: {
    color: Variables.greyTextColor,
    fontFamily: Variables.mainFont,
    fontSize: 28,
    marginTop: -20
    },
  bottomBtns: {
    paddingTop: 150,
    alignItems: 'center'
  },
  loginContainer: {
    position: 'absolute',
    bottom: 80
  },
  login: {
    fontSize: 20,
    color: Variables.secondaryColor
  },
  signUp: {
    position: 'absolute',
    bottom: 125
  }
});
