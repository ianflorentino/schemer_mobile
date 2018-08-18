import { REQUEST_HOME_SUCCESS } from '../../../home/redux/modules/events'

const initialState = {
  user: {}
}

export default account = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_HOME_SUCCESS:
      const { events, ...rest } = action.payload
      return {
        ...state,
        user: {
          ...rest
        }
      }
    default:
      return state
  }
}
