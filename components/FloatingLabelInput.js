import React, { Component } from 'react'
import { View, Text, TextInput, Animated } from 'react-native'

export default class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
  }

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1)
  }

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
      duration: 200,
    }).start()
  }

  handleFocus = () => this.setState({ isFocused: true })
  handleBlur = () => this.setState({ isFocused: false })

  render() {
    const { input: { onChange, ...restInput } = {}} = this.props
    const { label, ...props } = this.props
    const { isFocused } = this.state
    const onChangeText = onChange || this.props.onChangeText

    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 14],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', '#000'],
      }),
    }

    return (
      <View style={{ paddingTop: 18 }}>
        <Animated.Text style={labelStyle}>
          {label}
        </Animated.Text>
        <TextInput
          {...props}
          style={{ height: 35, fontSize: 20, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555' }}
          onChangeText={onChangeText}
          {...restInput}
          blurOnSubmit
        />
      </View>
    )
  }
}
