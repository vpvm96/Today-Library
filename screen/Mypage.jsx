import { ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { fireStore } from '../api/firebase'
import { getAuth } from 'firebase/auth'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styled from '@emotion/native'
import { getBookRequest } from '../api/bookService'
import ReadBookCard from '../components/Mypage/ReadBookCard'
import { onAuthStateChanged } from '@firebase/auth'
import { useIsFocused, useNavigation } from '@react-navigation/core'
import { authService } from '../api/firebase'
import MarkBookCard from '../components/Mypage/MarkBookCard'

const Mypage = () => {
  const [readBooks, setReadBooks] = useState([])
  const [markBooks, setMarkBooks] = useState([])
  const [books, setBooks] = useState([])
  const [category, setCategory] = useState('newbook')

  const auth = getAuth()
  const currentUser = auth.currentUser

  // 로그인 여부
  const navigation = useNavigation()
  const IsFocused = useIsFocused()

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (!user) {
        navigation.replace('LoginPage')
      } else if (user) {
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
            setReadBooks(myBook.readBook)
            setMarkBooks(myBook.bookMark)
            return myBook
          })
        })
        // 책 정보 전체 가져오기
        getBookRequest(setBooks)
      }
      return
    })
  }, [IsFocused])

=======
>>>>>>> 7bce29302b4b77a8f9533beb95a6e97cc1fb468a
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
        {/* 카테고리 버튼 */}
        <RecordsCategory>
          <FilterReaded
            category={category}
            onPress={() => setCategory('readed')}
          >
            <FilterRededText>내가 읽은 책</FilterRededText>
          </FilterReaded>
          <FilterMarked
            category={category}
            onPress={() => setCategory('marked')}
          >
            <FilterMarkedText>내가 보고싶은 책</FilterMarkedText>
          </FilterMarked>
        </RecordsCategory>
        {/* 책 리스트 영역 */}
        {category === 'readed' ? (
          <ReadBookCardWrap>
            {readBooks.map((item) => (
              <ReadBookCard readId={item} books={books} key={item} />
            ))}
          </ReadBookCardWrap>
        ) : (
          <ReadBookCardWrap>
            {markBooks.map((item) => (
              <MarkBookCard readId={item} books={books} key={item} />
            ))}
          </ReadBookCardWrap>
        )}
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
  height: 100%;
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
  width: 100%;
  height: 60px;
  padding: 10px;
`
const FilterReaded = styled.TouchableOpacity`
  background-color: ${({ category }) =>
    category === 'readed' ? '#61d2bc' : 'lightgrey'};
  width: 50%;
  height: 100%;
  border-radius: 5px 0 0 5px;
`
const FilterRededText = styled.Text`
  font-size: 18px;
  color: #222222;
  margin: auto;
`
const FilterMarked = styled.TouchableOpacity`
  background-color: ${({ category }) =>
    category === 'marked' ? '#61d2bc' : 'lightgrey'};
  width: 50%;
  height: 100%;
  border-radius: 0 5px 5px 0;
`
const FilterMarkedText = styled.Text`
  font-size: 18px;
  color: black;
  margin: auto;
`

const ReadBookCardWrap = styled.View`
  width: 100%;
  height: 100%;
`
