import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import DefaultText from './DefaultText'
import Variables from '../utils/variables'

class TopNav extends Component {
  render() {
    const { isShown, title } = this.props

    return (
      <View style={styles.container}>
        { 
          isShown &&
            <View style={styles.container}>
              <DefaultText>{ title }</DefaultText>  
            </View>
        }
      </View>
    )
  }
}

export default TopNav

TopNav.propTypes = {
  isShown: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    padding: 5,
    height: 80,
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: Variables.white
  }
})
