import { View, Text, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  doc,
  getDoc,
} from 'firebase/firestore'
import { fireStore } from '../api/firebase'
import { getAuth } from 'firebase/auth'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styled from '@emotion/native'
import { getBookRequest } from '../api/bookService'
import ReadBookCard from '../components/Mypage/ReadBookCard'
// import { getBookRequest } from '../api/bookService'
import { onAuthStateChanged } from '@firebase/auth'
import { useIsFocused, useNavigation } from '@react-navigation/core'
import { authService } from '../api/firebase'

const Mypage = () => {
  const [readBooks, setReadBooks] = useState([])
  const [markBook, setMarkBook] = useState([])
  const [books, setBooks] = useState([])

  const auth = getAuth()
  const currentUser = auth.currentUser

  // 로그인 여부
  const navigation = useNavigation()
  const IsFocused = useIsFocused()

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (!user) {
        navigation.replace('LoginPage')
      }
    })
  }, [IsFocused])

  // user 정보로부터 책 정보 가져오기
  useEffect(() => {
    // 로그인 유저의 정보 가져오기
    const q = query(
      collection(fireStore, 'users'),
      where('uid', '==', currentUser.uid)
    )

    onSnapshot(q, (snapshot) => {
      const myBooks = snapshot.docs.map((doc) => {
        const myBook = {
          id: doc.id,
          email: doc.data().email,
          readBook: doc.data().readBook,
          bookMark: doc.data().bookmark,
        }
        // console.log('newBook', myBook.readBook)
        // console.log('bookMark', myBook.bookMark)
        setReadBooks(myBook.readBook)
        setMarkBook(myBook.bookMark)
        return myBook
      })
    })
    // 책 정보 전체 가져오기
    getBookRequest(setBooks)
  }, [])

  return (
    <ScrollView>
      {/* 프로필 영역 */}
      <MyInfo>
        <MyProfile>
          <MyProfileImg source={require('../assets/images/profileImg.png')} />
          <MyNickName>닉네임</MyNickName>
        </MyProfile>
        <MyReadedAndMarked>
          <ReadedIcon>
            <Ionicons name="checkmark-circle-outline" size={20} color="#000" />
          </ReadedIcon>
          <ReadedCount>0</ReadedCount>
          <MarkedIcon>
            <MaterialCommunityIcons
              name="heart-circle-outline"
              size={20}
              color="#000"
            />
          </MarkedIcon>
          <MarkedCount>0</MarkedCount>
        </MyReadedAndMarked>
        <MyIntroduce>나를 소개하는 내용이 없습니다.</MyIntroduce>
      </MyInfo>
      {/* 읽음 & 찜 책 리스트 */}
      <MyRecords>
        <SectionLine></SectionLine>
        <RecordsTitle>기록</RecordsTitle>
        <RecordsCategory>
          <FilterReded>
            <FilterRededText onPress={getBookRequest}>
              내가 읽은 책
            </FilterRededText>
            <View style={{ width: '100%' }}>
              {readBooks.map((item) => (
                <ReadBookCard readId={item} books={books} key={item} />
              ))}
            </View>
          </FilterReded>
          <FilterMarked>
            <FilterMarkedText>내가 보고싶은 책</FilterMarkedText>
          </FilterMarked>
        </RecordsCategory>
      </MyRecords>
    </ScrollView>
  )
}

export default Mypage

// 프로필 영역
const MyInfo = styled.View`
  width: 100%;
  height: 200px;
  justify-content: center;
`

const MyProfile = styled.View`
  margin-top: 50px;
  height: 20%;
  justify-content: center;
  align-items: center;
`

const MyProfileImg = styled.Image`
  width: 75px;
  height: 75px;
  margin-bottom: 10px;
`
const MyNickName = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`
const MyReadedAndMarked = styled.View`
  margin-top: 40px;
  height: 30px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  /* background-color: grey; */
`
const ReadedIcon = styled.Text`
  font-size: 20px;
  margin-right: 20px;
`

const ReadedCount = styled.Text`
  font-size: 20px;
  margin-right: 35px;
`

const MarkedIcon = styled.Text`
  font-size: 20px;
  margin-right: 20px;
`

const MarkedCount = styled.Text`
  font-size: 20px;
`

const MyIntroduce = styled.Text`
  font-size: 20px;
  text-align: center;
  margin-top: 10px;
`

// 읽음 & 찜 책 리스트
const MyRecords = styled.View`
  /* flex: 3; */
  height: 100%;
  /* background-color: green; */
`
const RecordsTitle = styled.Text`
  font-size: 22px;
  font-weight: 600;
  padding: 10px;
`
const SectionLine = styled.View`
  width: 100%;
  height: 1px;
  background-color: black;
  margin-top: 10px;
`

const RecordsCategory = styled.View`
  flex-direction: row;
  /* background-color: yellow; */
  width: 100%;
  height: 60px;
  padding: 10px;
`
const FilterReded = styled.TouchableOpacity`
  background-color: #61d2bc;
  width: 50%;
  height: 100%;
  /* border-top-left-radius: 5px; */
  /* border-bottom-left-radius: 5px; */
`
const FilterRededText = styled.Text`
  font-size: 18px;
  color: white;
  margin: auto;
`
const FilterMarked = styled.TouchableOpacity`
  background-color: lightgrey;
  width: 50%;
  height: 100%;
  /* border-top-right-radius: 5px; */
  /* border-bottom-right-radius: 5px; */
`
const FilterMarkedText = styled.Text`
  font-size: 18px;
  color: black;
  margin: auto;
`

const RecordBookInfo = styled.TouchableOpacity`
  width: 100%;
  height: 180px;
  /* background-color: lightgrey; */
  padding: 10px;
  justify-content: center;
`
const BookItemImage = styled.Image`
  width: 100px;
  height: 150px;
`
const BookItemInfo = styled.View`
  width: 50%;
  height: 100%;
  justify-content: flex-start;
  padding-top: 10px;

  /* background-color: skyblue; */
`
const BookTitle = styled.Text`
  font-size: 22px;
`
const BookAuthor = styled.Text`
  font-size: 18px;
`
const BookPublish = styled.Text`
  font-size: 18px;
`
