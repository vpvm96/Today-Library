import React, { useEffect, useRef, useState } from 'react'
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useLinkTo, useNavigation } from '@react-navigation/native'
import styled from '@emotion/native'
import { emailRegex, pwRegex } from '../../utils'
import { Ionicons } from '@expo/vector-icons'

export default function Login() {
  const emailRef = useRef(null)
  const pwRef = useRef(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [secureText, setSecureText] = useState(null)
  const [touchEye, setTouchEye] = useState(true)
  const [warningText, setWarningText] = useState('')
  const navigation = useNavigation()

  const TouchEyeBtn = () => {
    setTouchEye((prev) => !prev)
    if (touchEye === false) {
      setSecureText(false)
    } else {
      setSecureText(true)
    }
  }

  const auth = getAuth()

  const linkTo = useLinkTo()
  const MoveSignUpPage = () => linkTo('/SignUpPage/SignUp')

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('onAuthStateChanged user', user)
      if (user) {
        navigation.replace('Tabs')
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

  const LogginBtnHandle = () => {
    // 유효성 검사
    if (validateInputs()) {
      return
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: '로그인 성공',
          text2: `${email}으로 가입되었습니다.`,
        })
        console.log('로그인성공')
        setEmail('')
        setPassword('')
      })
      .catch((err) => {
        console.log('err.message:', err.message)
        if (err.message.includes('user-not-found')) {
          setWarningText('회원이 아닙니다. 회원가입을 먼저 진행해 주세요.')
        }
        if (err.message.includes('wrong-password')) {
          setWarningText('비밀번호가 틀렸습니다.')
        }
      })
  }

  return (
    <LoginPageBody>
      <LogoImage source={require('../../assets/images/loginLogo.png')} />
      <LoginTextInput
        placeholder="UserName"
        value={email}
        onChangeText={(text) => setEmail(text)}
        ref={emailRef}
        textContentType="emailAddress"
      />
      <PasswordBody>
        <LoginPasswordInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          ref={pwRef}
          returnKeyType="send"
          textContentType="password"
          secureTextEntry={secureText ? true : false}
        />
        <TouchIcon onPress={TouchEyeBtn}>
          {touchEye ? (
            <Ionicons name="eye" size={24} color="black" />
          ) : (
            <Ionicons name="eye-off" size={24} color="black" />
          )}
        </TouchIcon>
      </PasswordBody>
      <WarnigText>{warningText}</WarnigText>
      <LoginBtn onPress={LogginBtnHandle}>
        <LogginBtnText>Login</LogginBtnText>
      </LoginBtn>
      <NavigateSignUpPage onPress={MoveSignUpPage}>
        <LogginBtnText>Sign Up</LogginBtnText>
      </NavigateSignUpPage>
    </LoginPageBody>
  )
}

const LoginPageBody = styled.View`
  width: 100%;
  height: 100%;

  background-color: white;

  align-items: center;
`
const LogoImage = styled.Image`
  margin-top: 35%;
  margin-bottom: 10%;
`
const LoginTextInput = styled.TextInput`
  width: 70%;
  height: 40px;
  padding: 10px;

  border-width: 0.3px;
  border-radius: 10px;
  background-color: rgb(247, 244, 244);

  ::placeholder {
  }

  margin-top: 5%;
  margin-bottom: 5%;
`

const PasswordBody = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 70%;
  height: 40px;
  padding: 10px;

  border-width: 0.3px;
  border-radius: 10px;
  background-color: rgb(247, 244, 244);
`
const LoginPasswordInput = styled.TextInput``
const TouchIcon = styled.TouchableOpacity``
const WarnigText = styled.Text`
  margin-top: 10px;
  color: red;
`
const LoginBtn = styled.TouchableOpacity`
  width: 70%;
  height: 40px;
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
  height: 40px;
  border-radius: 5px;
  background-color: rgb(89, 167, 147);

  align-items: center;
  justify-content: center;
`
