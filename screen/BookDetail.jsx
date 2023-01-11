import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Rating } from 'react-native-ratings'
import { Alert } from 'react-native'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { getAuth } from 'firebase/auth'
import { getAuthCurrentUserInfo } from '../api/authService'
import {
  getReviewRequest,
  completedReadBook,
  bookMarkBook,
} from '../api/bookDetailService'
import BookDetailHeader from '../components/BookDetail/BookDetailHead'
import BookDetailComment from '../components/BookDetail/BookDetailComment'
import BookReviewModal from '../components/BookDetail/BookReviewModal'
import useCalculRating from '../hooks/useCalculRating'
import useInput from '../hooks/useInput'
import styled from '@emotion/native'

const BookDetail = ({ route: { params: book } }) => {
  const auth = getAuth()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [reviews, setReviews] = useState([])
  const [user, setUser] = useState([])
  const [
    reviewValue,
    setReviewValue,
    reviewValueChangeHandler,
    createReviewClickHandler,
  ] = useInput('')
  const [isRating, setIsRating] = useState(0)
  const [avgRating, calculRatingHadnler] = useCalculRating(reviews)
  const { navigate } = useNavigation()

  useEffect(() => {
    getReviewRequest(setReviews, book.id, calculRatingHadnler)
    getAuthCurrentUserInfo(setUser)
  }, [])

  const openDetailModalHandler = () => {
    if (!auth.currentUser) {
      navigate('LoginPage')
      return
    }
    setIsOpenModal(true)
  }

  const closeDetailModalHandler = () => {
    setIsRating(0)
    setReviewValue('')
    setIsOpenModal(false)
  }

  const getRatingDetailModalHandler = (rating) => {
    setIsRating(rating)
  }

  const createDetailReviewHandler = () => {
    createReviewClickHandler(isRating, book.id, user)
    setIsOpenModal(false)
  }

  const completedReadBookHandler = () => {
    if (!auth.currentUser) {
      navigate('LoginPage')
      return
    }
    if (book.readUid.includes(auth.currentUser.uid)) {
      Alert.alert('이미 읽은 책 입니다.', '', [
        { text: '확인', style: 'cancel' },
      ])
      return
    }
    Alert.alert('읽음 처리가 완료 되었습니다.', '', [
      { text: '확인', style: 'cancel' },
    ])
    completedReadBook(book, user)
  }

  const bookMarkBookHandler = () => {
    if (!auth.currentUser) {
      navigate('LoginPage')
      return
    }
    if (book.bookmarkUid.includes(auth.currentUser.uid)) {
      Alert.alert('이미 찜 하셨습니다.', '', [
        { text: '확인', style: 'cancel' },
      ])
      return
    }
    Alert.alert('찜 완료 되었습니다.', '', [{ text: '확인', style: 'cancel' }])
    bookMarkBook(book, user)
  }

  return (
    <BookDetailWrap>
      <BookDetailHeader book={book} />
      <BookDetailBodyWrap>
        <BookDetailBodyRatingContainer>
          <BookDetailRatingBox>
            <BookDetailRatingText>총 평가</BookDetailRatingText>
            <Rating startingValue={avgRating} imageSize={25} readonly />
          </BookDetailRatingBox>
          <BookDetailReadButtonBox onPress={completedReadBookHandler}>
            <MaterialCommunityIcons name="book" size={24} color="#36A992" />
            <BookDetailReadText>읽음</BookDetailReadText>
          </BookDetailReadButtonBox>
        </BookDetailBodyRatingContainer>
      </BookDetailBodyWrap>
      <BookDetailCommentContainer>
        {reviews.map((review) => (
          <BookDetailComment key={review.id} review={review} />
        ))}
      </BookDetailCommentContainer>
      <BookDetailCommentBtnContainer>
        <BookDetailReviewBtn onPress={openDetailModalHandler}>
          <Ionicons name="water" size={30} color="#36A992" />
          <BookDetailReviewText>리뷰등록</BookDetailReviewText>
        </BookDetailReviewBtn>
        <BookDetailBookMarkBtn onPress={bookMarkBookHandler}>
          <Ionicons
            name="ios-shield-checkmark-sharp"
            size={30}
            color="#36A992"
          />
          <BookDetailBookMarkText>찜</BookDetailBookMarkText>
        </BookDetailBookMarkBtn>
      </BookDetailCommentBtnContainer>
      <BookReviewModal
        isOpenModal={isOpenModal}
        bookTitle={book.title}
        reviewValue={reviewValue}
        onReviewValueChange={reviewValueChangeHandler}
        onCloseDetailModal={closeDetailModalHandler}
        onGetRatingDetailModal={getRatingDetailModalHandler}
        onCreateDetailReview={createDetailReviewHandler}
      />
    </BookDetailWrap>
  )
}

const BookDetailWrap = styled.ScrollView`
  width: 100%;
  background-color: white;
`
const BookDetailBodyWrap = styled.View`
  width: 100%;
`
const BookDetailBodyRatingContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0 10px 0;
`
const BookDetailRatingBox = styled.View`
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 18px;
`
const BookDetailRatingText = styled.Text`
  font-size: 25px;
  padding: 0 15px 0 100px;
`
const BookDetailReadButtonBox = styled.TouchableOpacity`
  width: 30%;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const BookDetailReadText = styled.Text`
  font-size: 17px;
  margin-left: 5px;
`
const BookDetailCommentContainer = styled.ScrollView`
  width: 80%;
  height: 250px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #c6c6c6;
`
const BookDetailCommentBtnContainer = styled.View`
  width: 100%;
  margin: 20px 0 60px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const BookDetailReviewBtn = styled.TouchableOpacity`
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
const BookDetailReviewText = styled.Text`
  margin-left: 10px;
  font-size: 20px;
`
const BookDetailBookMarkBtn = styled.TouchableOpacity`
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
const BookDetailBookMarkText = styled.Text`
  margin-left: 10px;
  font-size: 20px;
`

export default BookDetail
