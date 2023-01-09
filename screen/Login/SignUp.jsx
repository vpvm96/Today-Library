// import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useLinkTo, useNavigation } from '@react-navigation/native'
import styled from '@emotion/native'
// import { Alert } from 'react-native';

import { emailRegex, pwRegex } from '../../utils'

export default function SignUp() {
  const emailRef = useRef(null)
  const pwRef = useRef(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [warningText, setWarningText] = useState('')
  const navigation = useNavigation()

  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('onAuthStateChanged user', user)
      if (user) {
        navigation.replace('')
      }
    })
  }, [])

  const validateInputs = () => {
    if (!email) {
      setWarningText('email을 입력해주세요.')
      emailRef.current.focus()
      return true
    }
    if (!password) {
      setWarningText('password를 입력해주세요.')
      pwRef.current.focus()
      return true
    }
    const matchedEmail = email.match(emailRegex)
    const matchedPw = password.match(pwRegex)

    if (matchedEmail === null) {
      setWarningText('이메일 형식에 맞게 입력해 주세요.')
      emailRef.current.focus()
      return true
    }
    if (matchedPw === null) {
      setWarningText(
        '비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다.'
      )
      pwRef.current.focus()
      return true
    }
  }

  const handleSignUp = () => {
    if (validateInputs()) {
      return
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: '회원가입 성공',
          text2: `${email}으로 가입되었습니다.`,
        })
        console.log('회원가입성공')
        setEmail('')
        setPassword('')
      })
      .catch((err) => {
        console.log('err.message:', err.message)
        if (err.message.includes('already-in-use')) {
          setWarningText('이미 사용중인 아이디입니다.')
        }
      })
  }

  const linkTo = useLinkTo()
  const MoveLoginHandle = () => linkTo('/LoginPage/Login')
  return (
    <SignUpPageBody>
      <SignUpImage source={require('../../assets/images/loginLogo.png')} />
      <SignUpTextInput
        placeholder="UserName"
        value={email}
        onChangeText={(text) => setEmail(text)}
        ref={emailRef}
        textContentType="emailAddress"
      />
      <SignUpTextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        ref={pwRef}
        textContentType="password"
        returnKeyType="send"
        secureTextEntry
      />
      {/* <SignUpTextInput
        placeholder='PasswordConfirm'
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      /> */}
      {/* <SignUpNicknameTextInput
        placeholder='Nickname'
        value={nickname}
        onChangeText={(text) => setNickname(text)}
      /> */}
      <WarnigText>{warningText}</WarnigText>

      <SignUpBtn onPress={handleSignUp}>
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
// const SignUpNicknameTextInput = styled.TextInput`
//   width: 70%;
//   height: 20%;

//   border-radius: 10px;
//   background-color: rgb(247, 244, 244);

//   ::placeholder {
//   }

//   margin-bottom: 5%;
// `;

const WarnigText = styled.Text`
  color: red;
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
