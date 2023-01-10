import { useEffect, useState } from 'react'
import { Rating } from 'react-native-ratings'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { getReviewRequest } from '../api/bookDetailService'
import BookDetailHeader from '../components/BookDetail/BookDetailHead'
import BookDetailComment from '../components/BookDetail/BookDetailComment'
import BookReviewModal from '../components/BookDetail/BookReviewModal'
import useInput from '../hooks/useInput'
import styled from '@emotion/native'
import { getAuth } from 'firebase/auth'

const BookDetail = ({ route: { params: book } }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [reviews, setReviews] = useState([])
  const [
    reviewValue,
    setReviewValue,
    reviewValueChangeHandler,
    createReviewClickHandler,
  ] = useInput('')
  const [isRating, setIsRating] = useState(0)

  useEffect(() => {
    getReviewRequest(setReviews, book.id)
  }, [])

  const openDetailModalHandler = () => {
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
    createReviewClickHandler(isRating, book.id)
    setIsOpenModal(false)
  }

  return (
    <BookDetailWrap>
      <BookDetailHeader book={book} />
      <BookDetailBodyWrap>
        <BookDetailBodyRatingContainer>
          <BookDetailRatingBox>
            <BookDetailRatingText>총 평가</BookDetailRatingText>
            <Rating startingValue={3} imageSize={25} readonly />
          </BookDetailRatingBox>
          <BookDetailReadButtonBox>
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
        <BookDetailBookMarkBtn>
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
  margin-top: 20px;
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
