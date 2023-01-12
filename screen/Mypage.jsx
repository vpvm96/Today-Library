import { ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import {
  collection,
  onSnapshot,
  where,
  getDocs,
  query,
} from 'firebase/firestore'
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
// import getProfileRequest from '../api/profileService'

const Mypage = () => {
  const auth = getAuth()
  const currentUser = auth.currentUser

  // 책 정보 state
  const [readBooks, setReadBooks] = useState([])
  const [markBooks, setMarkBooks] = useState([])
  const [books, setBooks] = useState([])
  const [category, setCategory] = useState('readed')

  // 프로필 정보 state
  // 프로필 이미지
  const [profileImg, setProfileImg] = useState(
    'https://firebasestorage.googleapis.com/v0/b/today-library.appspot.com/o/images%2FprofileImg.png?alt=media&token=8e0b5187-d297-4fa0-b5b2-de80c55f96f4'
  )
  // 닉네임
  const [nickName, setNickName] = useState('기본 닉네임')
  // 소개 멘트
  const [message, setMessage] = useState('')
  // 찜한 책, 읽은 책 카운트
  const [bookMarkCount, setBookMarkCount] = useState('0')
  const [readCount, setReadCount] = useState('0')

  // 로그인 여부
  const navigation = useNavigation()
  const IsFocused = useIsFocused()

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
          console.log('52 doc.data', doc.data())
        }
        {
          console.log('62 doc.data bookMark', doc.data().bookmark.length)
        }
        userInfo.push({
          nickname: doc.data().nickname,
          mymessage: doc.data().mymessage,
          profileImg: doc.data().profileImg,
          bookMarkCount: doc.data().bookmark.length,
          readCount: doc.data().readBook.length,
        })
        setNickName(userInfo[0].nickname)
        setMessage(userInfo[0].mymessage)
        setProfileImg(userInfo[0].profileImg)
        setBookMarkCount(userInfo[0].bookMarkCount)
        setReadCount(userInfo[0].readCount)
      })
    })
  }

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
          snapshot.docs.map((doc) => {
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
        getProfileRequest()
      }
      return
    })
  }, [IsFocused])

  return (
    <ScrollView>
      {/* 프로필 영역 */}
      <MyInfo>
        <MyProfile>
          <MyProfileImg
            source={{
              uri: `${profileImg}`,
            }}
            onChangePhoto={setProfileImg}
          />
          <MyNickName onChangeText={setNickName} value={nickName}></MyNickName>
        </MyProfile>
        <MyReadedAndMarked>
          <ReadedIcon>
            <Ionicons name="checkmark-circle-outline" size={20} color="#000" />
          </ReadedIcon>
          <ReadedCount>{readCount}</ReadedCount>
          <MarkedIcon>
            <MaterialCommunityIcons
              name="heart-circle-outline"
              size={20}
              color="#000"
            />
          </MarkedIcon>
          <MarkedCount
            // editable={false}
            onChangeText={setBookMarkCount}
          >
            {bookMarkCount}
          </MarkedCount>
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
  border-radius: 100px;
`
const MyNickName = styled.TextInput`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`
const MyReadedAndMarked = styled.View`
  margin-top: 40px;
  height: 30px;
  width: 100%;
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
  color: black;
  /* background-color: yellow; */
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
