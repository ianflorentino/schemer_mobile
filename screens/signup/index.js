import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import FloatingLabelInput from '../../components/FloatingLabelInput'
import Button from '../../components/Button'
import DefaultText from '../../components/DefaultText'
import Variables from '../../utils/variables'
import { createValidator, email, required } from '../../utils/validators'
import * as loginActions from '../login/redux/modules/loginSignup';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

class SignupScreen extends Component {
	signUpAction = () => {
    const { submitSignup } = this.props
    submitSignup()
	}

  render() {
    return (
      <View style={styles.container}>
				<Field
					label="Username"
          name="username"
          component={FloatingLabelInput} />
				<View style={{marginTop:15}} />
				<Field
					label="Email"
          name="email"
          component={FloatingLabelInput} />
				<View style={{marginTop:15}} />
				<Field
					label="Password"
          name="password"
					secureTextEntry={true}
          component={FloatingLabelInput} />
				<View style={{marginTop:15}} />
				<Field
					label="Password Confirmation"
          name="password_confirmation"
					secureTextEntry={true}
          component={FloatingLabelInput} />
				<Button
					style={styles.loginBtn}
					width="100%"
					text="Sign up"
					action={this.signUpAction} />
      </View>
    );
  }
}

const signupValidator = createValidator({
  email: [required, email],
  password: [required]
});

SignupScreen = reduxForm({
  form: 'signup',
  validate: signupValidator
})(SignupScreen)

function mapStateToProps(state){
  return {
    initialValues: {
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  }
}
export default connect(mapStateToProps, loginActions)(SignupScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
		padding: 40,
		backgroundColor: Variables.white
  },
	loginBtn: {
		marginTop: 30
	}
});
