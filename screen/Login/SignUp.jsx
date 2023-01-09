import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import styled from '@emotion/native'
import { useLinkTo } from '@react-navigation/native'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const SignUpHandle = () => {}

  const linkTo = useLinkTo()
  const MoveLoginHandle = () => linkTo('/LoginPage/Login')
  return (
    <SignUpPageBody>
      <SignUpImage source={require('../assets/loginLogo.png')} />
      <SignUpTextInput
        placeholder="UserName"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <SignUpTextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <SignUpTextInput
        placeholder="PasswordConfirm"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <SignUpNicknameTextInput
        placeholder="Nickname"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <SignUpBtn onPress={SignUpHandle}>
        <SignBtnText>Sign Up</SignBtnText>
      </SignUpBtn>
      <NavigateLoginPage onPress={MoveLoginHandle}>
        <LoginText>Login...</LoginText>
      </NavigateLoginPage>
    </SignUpPageBody>
  )
}
const SignUpPageBody = styled.View`
  width: 100%;
  height: 200px;

  background-color: white;

  align-items: center;
`
const SignUpImage = styled.Image`
  margin-top: 25%;
  margin-bottom: 10%;
`
const SignUpTextInput = styled.TextInput`
  width: 70%;
  height: 20%;

  border-radius: 10px;
  background-color: rgb(247, 244, 244);

  ::placeholder {
  }

  margin-bottom: 5%;
`
const SignUpNicknameTextInput = styled.TextInput`
  width: 70%;
  height: 20%;

  border-radius: 10px;
  background-color: rgb(247, 244, 244);

  ::placeholder {
  }

  margin-bottom: 5%;
`
const SignUpBtn = styled.TouchableOpacity`
  width: 70%;
  height: 20%;
  background-color: rgb(89, 167, 147);
  border-radius: 5px;
  margin-top: 5%;
  margin-bottom: 5%;

  align-items: center;
  justify-content: center;
`
const SignBtnText = styled.Text`
  color: white;
  font-weight: 500;
`
const NavigateLoginPage = styled.TouchableOpacity``
const LoginText = styled.Text``
