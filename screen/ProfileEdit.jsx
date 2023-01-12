import React, { useEffect, useState } from 'react'
import { fireStore, firestorage } from '../api/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import {
  doc,
  collection,
  updateDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

const ProfileEdit = () => {
  const auth = getAuth()
  const currentUser = auth.currentUser

  const [profileImg, setProfileImg] = useState(
    'https://firebasestorage.googleapis.com/v0/b/today-library.appspot.com/o/images%2FprofileImg.png?alt=media&token=8e0b5187-d297-4fa0-b5b2-de80c55f96f4'
  )
  const [profileImgUrl, setProfileImgUrl] = useState('')
  const [nickName, setNickName] = useState('기본 닉네임')
  const [message, setMessage] = useState('')

  useEffect(() => {
    getProfileRequest()
  }, [])

  // 디바이스에서 이미지 선택
  const onChangeImageHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
    setProfileImgUrl(result.assets[0])
  }

  // 프로필 변경 내용 FB 저장
  const onSaveProfileHandler = async () => {
    const response = await fetch(profileImgUrl.uri)
    const blobFile = await response.blob()
    const reference = ref(firestorage, `images/${currentUser.uid}`)
    const snapshot = await uploadBytes(reference, blobFile)
    const downLoadImage = await getDownloadURL(snapshot.ref)
    const userRef = doc(fireStore, 'users', currentUser.uid)
    await updateDoc(userRef, {
      nickname: nickName,
      mymessage: message,
      profileImg: downLoadImage,
    })
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

  return (
    <StyleWrap>
      {/* 프로필 이미지 */}
      <ProfileImageContainer>
        {!profileImgUrl ? (
          <ProfileImage
            source={{
              uri: `${profileImg}`,
            }}
            onChangePhoto={setProfileImg}
          ></ProfileImage>
        ) : (
          <ProfileImage
            source={profileImgUrl}
            onChangePhoto={setProfileImg}
          ></ProfileImage>
        )}
        <ChangeImageButton
          style={{ position: 'absolute', right: 0, bottom: 0 }}
          onPress={onChangeImageHandler}
        >
          <Ionicons name="md-camera-reverse" size={24} color="black" />
        </ChangeImageButton>
      </ProfileImageContainer>
      {/* 닉네임 */}
      <NickNameInputContainer>
        <NickNameInput
          onChangeText={setNickName}
          value={nickName}
        ></NickNameInput>
      </NickNameInputContainer>
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
          <SaveButtonText onPress={onSaveProfileHandler}>저장</SaveButtonText>
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
const NickNameInputContainer = styled.View`
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
