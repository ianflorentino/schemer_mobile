import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StackNavigator, addNavigationHelpers } from 'react-navigation'

import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import LandingScreen from './screens/landing'
import LoginScreen from './screens/login'
import SignupScreen from './screens/signup'
import HomeScreen from './screens/home'

import Variables from './utils/variables'

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.navigation
)
const addListener = createReduxBoundAddListener("root")

export const AppNavigator = new StackNavigator({
  LandingScreen: {
    screen: LandingScreen,
    navigationOptions: { 
      headerStyle: {
        backgroundColor: Variables.white,
        borderBottomColor: Variables.white
      }
    }
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: { 
      headerStyle: {
        backgroundColor: Variables.white,
        borderBottomColor: Variables.white
      }
    }
  },
  SignupScreen: {
    screen: SignupScreen,
    navigationOptions: { 
      headerStyle: {
        backgroundColor: Variables.white,
        borderBottomColor: Variables.white
      }
    }
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: { 
      headerStyle: {
        backgroundColor: Variables.white,
        borderBottomColor: Variables.white
      }
    }
  },
},{
  initialRouteName: 'LandingScreen'
});

class Navigator extends Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.navigation,
				addListener
      })}/>
    )
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation
})

export default connect(mapStateToProps)(Navigator)
