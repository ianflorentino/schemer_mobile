import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import FloatingLabelInput from '../../components/FloatingLabelInput'
import Button from '../../components/Button'
import DefaultText from '../../components/DefaultText'
import Variables from '../../utils/variables'
import { submitLogin } from './redux/modules/loginSignup'
import { connect } from 'react-redux';
import * as loginActions from './redux/modules/loginSignup';

class LoginScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			login: '',
			password: ''
		}
	}	

	handleTextChange = (text, type) => {
		this.setState({ 
			[type]: text
		})
	}

	handleForgotPassword = () => {
		alert('HA you forgot')
	}

	loginAction = () => {
    const { submitLogin } = this.props
    submitLogin(this.state)
	}

  render() {
    return (
      <View style={styles.container}>
				<FloatingLabelInput
					label="Email"
					value={this.state.login}
					onChangeText={(text) => {this.handleTextChange(text, 'login')}} />
				<View style={{marginTop:15}} />
				<FloatingLabelInput
					label="Password"
					secureTextEntry={true}
					value={this.state.password}
					onChangeText={(text) => {this.handleTextChange(text, 'password')}} />
				<Button
					style={styles.loginBtn}
					width="100%"
					text="Login"
					action={this.loginAction} />
				<TouchableOpacity onPress={this.handleForgotPassword}>
          <DefaultText style={styles.forgotPassword}>Forgot your password?</DefaultText>
				</TouchableOpacity>
      </View>
    );
  }
}

export default connect(null, loginActions)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
		padding: 40,
		backgroundColor: Variables.white
  },
	loginBtn: {
		marginTop: 50
	},
	forgotPassword: {
		color: Variables.secondaryColor,
		textAlign: 'center',
		marginTop: 15,
    fontSize: 20
	}
});
