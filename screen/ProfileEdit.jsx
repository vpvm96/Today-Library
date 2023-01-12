import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import styled from '@emotion/native'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { fireStore, firestorage } from '../api/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import {
  doc,
  collection,
  updateDoc,
  getDocs,
  query,
  where,
  setIndexConfiguration,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const ProfileEdit = () => {
  const auth = getAuth()
  const currentUser = auth.currentUser

  const [nickName, setNickName] = useState('기본 닉네임')

  // 프로필 이미지 state
  const [profileImg, setProfileImg] = useState(
    'https://firebasestorage.googleapis.com/v0/b/today-library.appspot.com/o/images%2FprofileImg.png?alt=media&token=8e0b5187-d297-4fa0-b5b2-de80c55f96f4'
  )
  // 프로필 이미지 url state
  const [profileImgUrl, setProfileImgUrl] = useState('')
  // 소개 멘트 state
  const [message, setMessage] = useState('')

  // 디바이스에서 이미지 선택 기능
  const onChangeImageHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    // console.log(result.assets)

    if (result.assets !== null) {
      setProfileImg(result.assets)
    } else {
      setProfileImg(
        'https://firebasestorage.googleapis.com/v0/b/today-library.appspot.com/o/images%2FprofileImg.png?alt=media&token=8e0b5187-d297-4fa0-b5b2-de80c55f96f4'
      )
    }
  }

  // 기존 프로필 정보 가져오기
  const getProfileRequest = () => {
    const q = query(
      collection(fireStore, 'users'),
      where('uid', '==', currentUser.uid)
    )
    getDocs(q).then((querySnapshop) => {
      const userInfo = []
      querySnapshop.forEach((doc) => {
        {
          console.log('62 doc.data()', doc.data())
        }
        userInfo.push({
          nickname: doc.data().nickname,
          mymessage: doc.data().mymessage,
          profileImg: doc.data().profileImg,
        })
        setNickName(userInfo[0].nickname)
        setMessage(userInfo[0].mymessage)
        setProfileImg(userInfo[0].profileImg)
      })
    })
  }

  // 프로필 변경 내용 FB 저장
  const onSaveProfileHandler = async (id) => {
    const imgUrl = profileImg[0].uri

    try {
      const response = await fetch(imgUrl)
      const blobFile = await response.blob()
      // FB 스토리지에 이미지 저장 후 url 다운
      const reference = ref(firestorage, `images/${currentUser.uid}`)
      const result = await uploadBytes(reference, blobFile)
      const firebaseImgUrl = await getDownloadURL(result.ref)

      // 다운받은 url을 FB 데이터베이스에 업데이트
      await updateDoc(doc(fireStore, 'users', id), {
        nickname: nickName,
        mymessage: message,
        profileImg: firebaseImgUrl,
      })
    } catch (err) {
      // return Promise.reject(err)
      console.log('133', err)
    }
  }

  useEffect(() => {
    if (profileImgUrl === undefined) {
      return
    }
  }, [profileImgUrl])

  useEffect(() => {
    getProfileRequest()
  }, [])

  return (
    <StyleWrap>
      {/* 프로필 이미지 */}
      <ProfileImageContainer>
        <ProfileImage
          source={{
            uri: `${profileImg}`,
          }}
          onChangePhoto={setProfileImg}
        ></ProfileImage>
        <ChangeImageButton
          style={{ position: 'absolute', right: 0, bottom: 0 }}
          onPress={onChangeImageHandler}
        >
          <Ionicons name="md-camera-reverse" size={24} color="black" />
        </ChangeImageButton>
      </ProfileImageContainer>
      {/* 닉네임 */}
      <NiNameInputContainer>
        <NickNameInput
          onChangeText={setNickName}
          value={nickName}
        ></NickNameInput>
      </NiNameInputContainer>
      {/* 나의 소개 */}
      <IntroduceLabel>나의 메세지</IntroduceLabel>
      <IntroduceInput
        placeholder="내용을 입력해주세요."
        multiline={true}
        onChangeText={setMessage}
        value={message}
      ></IntroduceInput>
      <ButtonWrap>
        <SaveButton>
          <SaveButtonText onPress={() => onSaveProfileHandler(currentUser.uid)}>
            저장
          </SaveButtonText>
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

const ProfileImageContainer = styled.View`
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
  border-radius: 100px;
`

const ChangeImageButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: white;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border: 1px solid grey;
`

const NiNameInputContainer = styled.View`
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
