import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import styled from '@emotion/native'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const LogginBtnHandle = () => {}

  return (
    <LoginPageBody>
      <LogoImage source={require('../assets/loginLogo.png')} />
      <LoginTextInput
        placeholder="UserName"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <LoginTextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <LoginBtn onPress={LogginBtnHandle}>
        <LogginBtnText>Login</LogginBtnText>
      </LoginBtn>
      <NavigateSignUpPage>
        <LogginBtnText>Sign Up</LogginBtnText>
      </NavigateSignUpPage>
    </LoginPageBody>
  )
}
const LoginPageBody = styled.View`
  width: 100%;
  height: 200px;

  align-items: center;
`
const LogoImage = styled.Image`
  margin-top: 25%;
  margin-bottom: 10%;
`
const LoginTextInput = styled.TextInput`
  width: 70%;
  height: 20%;

  border-radius: 10px;
  background-color: rgb(247, 244, 244);

  ::placeholder {
  }

  margin-bottom: 5%;
`

const LoginBtn = styled.TouchableOpacity`
  width: 70%;
  height: 20%;
  background-color: rgb(89, 167, 147);
  border-radius: 5px;
  margin-top: 5%;
  margin-bottom: 5%;

  align-items: center;
  justify-content: center;
`

const LogginBtnText = styled.Text`
  color: white;
  font-weight: 500;
`
const NavigateSignUpPage = styled.TouchableOpacity`
  width: 70%;
  height: 20%;
  border-radius: 5px;
  background-color: rgb(89, 167, 147);

  align-items: center;
  justify-content: center;
`
