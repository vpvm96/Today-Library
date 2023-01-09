import React from 'react'
import { View, Text } from 'react-native'
import styled from '@emotion/native'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const ProfileEdit = () => {
  return (
    <StyleWrap>
      {/* 프로필 이미지 */}
      <ProfileImageContainer>
        <ProfileImage
          source={require('../assets/images/profileImg.png')}
        ></ProfileImage>
        <IconContainer style={{ position: 'absolute', right: 0, bottom: 0 }}>
          <Ionicons name="md-camera-reverse" size={24} color="black" />
        </IconContainer>
      </ProfileImageContainer>
      {/* 닉네임 */}
      <NiNameInputContainer>
        <NickNameInput>기본 닉네임</NickNameInput>
      </NiNameInputContainer>
      {/* 나의 소개 */}
      <IntroduceLabel>나의 메세지</IntroduceLabel>
      <IntroduceInput
        placeholder="내용을 입력해주세요."
        multiline={true}
      ></IntroduceInput>
      <ButtonWrap>
        <SaveButton>
          <SaveButtonText>저장</SaveButtonText>
        </SaveButton>
        <CancelButton>
          <CancelButtonText>취소</CancelButtonText>
        </CancelButton>
      </ButtonWrap>
    </StyleWrap>
  )
}

export default ProfileEdit

const StyleWrap = styled.View`
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const ProfileImageContainer = styled.TouchableOpacity`
  width: 150px;
  height: 150px;
  /* background-color: red; */
  position: relative;
  margin-top: 30px;
`

const ProfileImage = styled.Image`
  width: 150px;
  height: 150px;
  margin: 0 auto;
`

const IconContainer = styled.View`
  width: 40px;
  height: 40px;
  background-color: white;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border: 1px solid grey;
`

const NiNameInputContainer = styled.View`
  /* border: 1px solid grey; */
  border-bottom-width: 1px;
  border-color: grey;
  width: 40%;
  height: 50px;
  justify-content: center;
  align-items: center;
`

const NickNameInput = styled.TextInput`
  font-size: 20px;
  margin-top: 10px;
`

const IntroduceLabel = styled.Text`
  margin-top: 20px;
  font-size: 20px;
  font-weight: 600;
  text-align: left;
  width: 70%;
`

const IntroduceInput = styled.TextInput`
  margin-top: 10px;
  padding: 10px;
  width: 70%;
  height: 30%;
  background-color: white;
  border-radius: 10px;
  border: 1px solid grey;
  font-size: 18px;
`

const ButtonWrap = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 20px;
`

const SaveButton = styled.TouchableOpacity`
  width: 30%;
  height: 35px;
  background-color: #61d2bc;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`
const SaveButtonText = styled.Text`
  font-size: 20px;
  color: white;
`

const CancelButton = styled.TouchableOpacity`
  width: 30%;
  height: 35px;
  background-color: lightgray;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`
const CancelButtonText = styled.Text`
  font-size: 20px;
  color: black;
`
