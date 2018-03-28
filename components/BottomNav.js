import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import DefaultText from './DefaultText'
import Variables from '../utils/variables'
import Icon from 'react-native-vector-icons/Octicons'
import * as navigationActions from '../reducers/navigation'

class BottomNav extends Component {
  
  render() {
    const { isLoggedIn, routeName, navigateToAccount, navigateToHome, navigateToEventNew } = this.props
    const accountColor = routeName == 'AccountScreen' ? Variables.mainColor : Variables.iconBlack
    const homeColor = routeName == 'HomeScreen' ? Variables.mainColor : Variables.iconBlack
    const eventColor = routeName == 'EventNewScreen' ? Variables.mainColor : Variables.iconBlack

    return (
      <View>
        { 
          isLoggedIn &&
            <View style={styles.container}>
              <Icon 
                style={styles.icon}
                name="person" size={25}
                color={accountColor} 
                onPress={() => navigateToAccount()} />
              <Icon 
                style={styles.icon}
                name="home" size={25}
                color={homeColor} 
                onPress={() => navigateToHome()} />
              <Icon 
                style={styles.icon}
                name="plus" size={25}
                color={eventColor} 
                onPress={() => navigateToEventNew()} />
            </View>
        }
      </View>
    )
  }
}

function mapStateToProps(state){
  const { isLoggedIn } = state.loginSignup 
  const { routeName } = state.navigation.routes[0]
  return {
    isLoggedIn,
    routeName
  }
}

export default connect(mapStateToProps, navigationActions)(BottomNav)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    padding: 5,
    bottom: 0,
    width: '100%',
    borderColor: Variables.greyTextColor,
    borderWidth: 1
  },
  icon: {
    paddingLeft: 30,
    paddingRight: 30
  }
})
