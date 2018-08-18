import React, { Component } from 'react'
import { Alert, TouchableOpacity, StyleSheet, View } from 'react-native'
import DefaultText from '../../components/DefaultText'
import LogOut from '../../components/LogOut'
import Variables from '../../utils/variables'
import { connect } from 'react-redux'

class AccountScreen extends Component {
  render() {
    return (
      <View>
        <DefaultText>AccountScreen</DefaultText>
        <LogOut />
      </View>
    )
  }
}

export default connect(null, null)(AccountScreen);
