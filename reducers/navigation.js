import { AppNavigator } from '../Navigator'
import { NavigationActions } from 'react-navigation'
import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../screens/login/redux/modules/loginSignup'

const initialAction = { type: NavigationActions.Init }
const initialState = AppNavigator.router.getStateForAction(initialAction)

export default (state = initialState, action) => {
  let newState

  switch (action.type) {
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
