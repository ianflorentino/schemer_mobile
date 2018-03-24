import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Variables from '../utils/variables'
import DefaultText from './DefaultText'

const Button = (props) =>  {
  let btnStyles = StyleSheet.flatten([btnStyling(props), props.style])
  return (
    <TouchableOpacity 
      style={btnStyles}
      onPress={props.action}>
      <DefaultText style={styles.contentText}>{props.text}</DefaultText>
    </TouchableOpacity>
  )
}

const btnStyling = (props) => {
  return {
    width: (props.width || '50%'),
    backgroundColor: (props.backgroundColor || Variables.mainColor),
    paddingTop: (props.paddingTop || 15),
    paddingBottom: (props.paddingBottom || 15),
    paddingLeft: (props.paddingLeft || 30),
    paddingRight: (props.paddingRight || 30),
    justifyContent: 'center'
  }
}

const styles = StyleSheet.create({
  contentText: {
    textAlign: 'center',
    color: Variables.white,
    fontSize: 25,
    fontWeight: 'bold'
  }
})

Button.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  paddingHeight: PropTypes.number,
  paddingWidth: PropTypes.number
}

export default Button
