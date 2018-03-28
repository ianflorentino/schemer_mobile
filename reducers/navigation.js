import { AppNavigator } from '../Navigator'
import { NavigationActions } from 'react-navigation'
import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../screens/login/redux/modules/loginSignup'

const NAVIGATE_TO_ACCOUNT   = 'NAVIGATE_TO_ACCOUNT'
const NAVIGATE_TO_HOME      = 'NAVIGATE_TO_HOME'
const NAVIGATE_TO_EVENT_NEW = 'NAVIGATE_TO_EVENT_NEW'

const initialAction = { type: NavigationActions.Init }
const initialState = AppNavigator.router.getStateForAction(initialAction)

export default (state = initialState, action) => {
  let newState

  switch (action.type) {
    case NAVIGATE_TO_ACCOUNT:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: 'AccountScreen'
            })
          ]
        }),
        state
      )
      break;
    case NAVIGATE_TO_HOME:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: 'HomeScreen'
            })
          ]
        }),
        state
      )
      break;
    case NAVIGATE_TO_EVENT_NEW:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: 'EventNewScreen'
            })
          ]
        }),
        state
      )
      break;
    case USER_LOGGED_IN:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: 'HomeScreen'
            })
          ]
        }),
        state
      )
      break;
    case USER_LOGGED_OUT:
      newState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: 'LandingScreen'
            })
          ]
        }),
        state
      )
      break;
    default:
      newState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  return newState
}

export const navigateToAccount = () => ({
  type: NAVIGATE_TO_ACCOUNT
})

export const navigateToHome = () => ({
  type: NAVIGATE_TO_HOME
})

export const navigateToEventNew = () => ({
  type: NAVIGATE_TO_EVENT_NEW
})
