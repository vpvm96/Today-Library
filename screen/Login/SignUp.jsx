import React, { useEffect, useRef, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useLinkTo, useNavigation } from '@react-navigation/native'
import styled from '@emotion/native'
import { emailRegex, pwRegex } from '../../utils'
import { Ionicons } from '@expo/vector-icons'
import { getFirestore, setDoc, doc } from 'firebase/firestore'

export default function SignUp() {
  const emailRef = useRef(null)
  const pwRef = useRef(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [secureText, setSecureText] = useState(null)
  const [touchEye, setTouchEye] = useState(true)
  const [warningText, setWarningText] = useState('')
  // const navigation = useNavigation()

  const auth = getAuth()
  const dbService = getFirestore()

  // password 아이콘 스위치 기능
  const TouchEyeBtn = () => {
    setTouchEye((prev) => !prev)
    if (touchEye === false) {
      setSecureText(false)
    } else {
      setSecureText(true)
    }
  }

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
    if (checkPassword !== password) {
      setWarningText('password를 확인해주세요.')
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
      .then((res) => {
        Toast.show({
          type: 'success',
          text1: '회원가입 성공',
          text2: `${email}으로 가입되었습니다.`,
        })
        setDoc(doc(dbService, 'users', res.user.uid), {
          uid: res.user.uid,
          email: email,
          password: password,
          nickname: nickname,
          bookmark: [''],
          readBook: [''],
          profileImg: '',
        })
        console.log('회원가입성공')
        setEmail('')
        setPassword('')
        setCheckPassword('')
        setNickname('')
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
        placeholder="UserEmail"
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
          secureTextEntry={secureText ? false : true}
        />
        <TouchIcon onPress={TouchEyeBtn}>
          {touchEye ? (
            <Ionicons name="eye" size={24} color="black" />
          ) : (
            <Ionicons name="eye-off" size={24} color="black" />
          )}
        </TouchIcon>
      </PasswordBody>
      <SignUpTextInput
        placeholder="PasswordConfirm"
        value={checkPassword}
        onChangeText={(text) => setCheckPassword(text)}
        secureTextEntry
      />
      <SignUpNicknameTextInput
        placeholder="Nickname"
        value={nickname}
        textContentType="name"
        onChangeText={(text) => setNickname(text)}
      />
      <WarnigText>{warningText}</WarnigText>

      <SignUpBtn onPress={handleSignUp}>
        <SignBtnText>Sign Up</SignBtnText>
      </SignUpBtn>
      <NavigateLoginPage onPress={MoveLoginHandle}>
        <LoginText>Login</LoginText>
      </NavigateLoginPage>
    </SignUpPageBody>
  )
}

const SignUpPageBody = styled.View`
  width: 100%;
  height: 100%;

  background-color: white;

  align-items: center;
`
const SignUpImage = styled.Image`
  margin-top: 20%;
  margin-bottom: 10%;
`
const SignUpTextInput = styled.TextInput`
  width: 70%;
  height: 40px;
  padding: 10px;

  border-width: 0.3px;
  border-radius: 10px;
  background-color: rgb(247, 244, 244);

  ::placeholder {
  }

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
  margin-bottom: 5%;

  border-width: 0.3px;
  border-radius: 10px;
  background-color: rgb(247, 244, 244);
`
const LoginPasswordInput = styled.TextInput`
  width: 90%;
00`
const TouchIcon = styled.TouchableOpacity``

const SignUpNicknameTextInput = styled.TextInput`
  width: 70%;
  height: 40px;
  padding: 10px;

  border-width: 0.3px;
  border-radius: 10px;
  background-color: rgb(247, 244, 244);

  ::placeholder {
  }

  margin-bottom: 5%;
`

const WarnigText = styled.Text`
  color: red;
`
const SignUpBtn = styled.TouchableOpacity`
  width: 70%;
  height: 40px;
  background-color: rgb(89, 167, 147);
  border-radius: 5px;

  margin-top: 5%;
  margin-bottom: 5%;

  align-items: center;
  justify-content: center;
`
const SignBtnText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
`
const NavigateLoginPage = styled.TouchableOpacity``
const LoginText = styled.Text`
  font-size: 18px;
  font-weight: 500;
`
