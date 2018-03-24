import React from 'react'
import { StyleSheet, Text } from 'react-native'
import Variables from '../utils/variables'

const DefaultText = (props) => {
  let textStyle = StyleSheet.flatten([styles(props), props.style])
  return ( 
    <Text style={textStyle}>
      {props.children}
    </Text>
  )
}

const styles = (props) => {
  return { 
    fontFamily: Variables.mainFont,
    fontWeight: (props.weight || 'normal'),
    fontSize: (props.size || 14),
    color: (props.color || Variables.mainColor)
  }
}

export default DefaultText
