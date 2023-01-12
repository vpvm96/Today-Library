import React, { useEffect, useState } from 'react'
import { Alert, KeyboardAvoidingView, Keyboard, View } from 'react-native'
import { fireStore, firestorage } from '../api/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useNavigation } from '@react-navigation/native'
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
  const { navigate } = useNavigation()

  const auth = getAuth()
  const currentUser = auth.currentUser

  const [profileImg, setProfileImg] = useState(
    'https://firebasestorage.googleapis.com/v0/b/today-library.appspot.com/o/images%2FprofileImg.png?alt=media&token=8e0b5187-d297-4fa0-b5b2-de80c55f96f4'
  )
  const [profileImgUrl, setProfileImgUrl] = useState('')
  const [nickName, setNickName] = useState('기본 닉네임')
  const [emailId, setEmailId] = useState('')
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
    if (result) setProfileImgUrl(result.assets[0])
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
    alert('저장 완료')
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
          emailId: doc.data().email,
        })
        setNickName(userInfo[0].nickname)
        setMessage(userInfo[0].mymessage)
        setProfileImg(userInfo[0].profileImg)
        setEmailId(userInfo[0].emailId)
      })
    })
  }

  // 나가기 버튼 클릭시 alert 경고
  // const onCancleButtonHandler = () => {
  //   console.log('취소버튼 클릭')
  // }

  const onCancleButtonHandler = async () => {
    Alert.alert(
      // Alert문구
      '변경한 내용을 저장하지 않았다면',
      '변경 내용이 사라집니다. 정말 나가시겠어요?',
      [
        // 버튼 배열
        {
          text: '아니요',
          onPress: () => console.log('아니요'),
          style: 'cancel',
        },
        {
          text: '네',
          // onPress: () => navigation.navigate('Login'),
          onPress: () => navigate('Mypage', { screen: 'Mypage' }),
        },
      ],
      { cancelable: false }
    )
  }

  return (
    <StyleContainer>
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
        <KeyboardAvoidingView behavior={'padding'} styled={{ flex: 1 }}>
          <NickNameInputContainer onPress={Keyboard.dismiss}>
            <NickNameInput
              onChangeText={setNickName}
              value={nickName}
            ></NickNameInput>
          </NickNameInputContainer>
          <EmailId>{emailId}</EmailId>
          {/* 나의 소개 */}
          <Introduce>
            <IntroduceLabel>나의 메세지</IntroduceLabel>
            <IntroduceInput
              placeholder="내용을 입력해주세요."
              multiline={true}
              onChangeText={setMessage}
              value={message}
              style={{ textAlignVertical: 'top' }}
            ></IntroduceInput>
          </Introduce>
          <ButtonWrap>
            <SaveButton>
              <SaveButtonText onPress={onSaveProfileHandler}>
                저장
              </SaveButtonText>
            </SaveButton>
            <CancelButton onPress={onCancleButtonHandler}>
              <CancelButtonText>나가기</CancelButtonText>
            </CancelButton>
          </ButtonWrap>
        </KeyboardAvoidingView>
      </StyleWrap>
    </StyleContainer>
  )
}
export default ProfileEdit

const StyleContainer = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`

// const StyleWrap = styled.View`
const StyleWrap = styled.ScrollView`
  background-color: ${(props) => props.theme.backgroundColor};
  /* margin: auto; */
  height: 100%;
  width: 100%;
`
const ProfileImageContainer = styled.View`
  width: 150px;
  height: 150px;
  margin: 0 auto;
  margin-top: 50px;
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
  border: 1px solid #bbbbbb;
`
const NickNameInputContainer = styled.View`
  border-bottom-width: 1px;
  border-color: grey;
  width: 40%;
  height: 50px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`
const EmailId = styled.Text`
  font-size: 16px;
  font-weight: 300;
  margin-top: 10px;
  margin: 0 auto;
  color: ${(props) => props.theme.textColor};
`

const NickNameInput = styled.TextInput`
  font-size: 20px;
  margin-top: 10px;
  color: ${(props) => props.theme.textColor};
`
const Introduce = styled.View`
  width: 70%;
  height: 30%;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 40px;
`

const IntroduceLabel = styled.Text`
  font-size: 20px;
  font-weight: 500;
  text-align: left;
  /* width: 70%;
  height: 30%; */
  color: ${(props) => props.theme.textColor};
`
const IntroduceInput = styled.TextInput`
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  height: 150px;
  background-color: ${(props) => props.theme.backgroundModalInputColor};
  color: ${(props) => props.theme.textColor};
  border-color: ${(props) => props.theme.borderColorModal};
  border-radius: 10px;
  border: 1px solid #dddddd;
  font-size: 18px;
`
const ButtonWrap = styled.View`
  width: 100%;
  height: 50%;
  /* background-color: white; */
  justify-content: center;
  /* align-items: center; */
  flex-direction: row;
`
const SaveButton = styled.TouchableOpacity`
  width: 30%;
  height: 35px;
  /* background-color: #61d2bc; */
  background-color: #61d2bc;
  border-radius: 5px;
  justify-content: center;
  align-items: center;

  margin-right: 10px;
`
const SaveButtonText = styled.Text`
  font-size: 20px;
  color: #f6f6f6;
`
const CancelButton = styled.TouchableOpacity`
  width: 30%;
  height: 35px;
  /* background-color: #61d2bc; */
  background-color: #61d2bc;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`
const CancelButtonText = styled.Text`
  font-size: 20px;
  color: #f6f6f6;
`
