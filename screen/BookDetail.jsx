import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import BookDetailHeader from '../components/BookDetail/BookDetailHead'
import styled from '@emotion/native'
import BookDetailComment from '../components/BookDetail/BookDetailComment'

const BookDetail = () => {
  return (
    <BookDetailWrap>
      <BookDetailHeader />
      <BookDetailBodyWrap>
        <BookDetailBodyRatingBox>
          <BookDetailRating>총 평가 ⭐️⭐️⭐️⭐️⭐️</BookDetailRating>
          <BookDetailReadButtonBox>
            <MaterialCommunityIcons name="book" size={24} color="#36A992" />
            <BookDetailReadText>읽음</BookDetailReadText>
          </BookDetailReadButtonBox>
        </BookDetailBodyRatingBox>
      </BookDetailBodyWrap>
      <BookDetailCommentContainer>
        <BookDetailComment />
        <BookDetailComment />
        <BookDetailComment />
        <BookDetailComment />
        <BookDetailComment />
      </BookDetailCommentContainer>
      <BookDetailCommentBtnContainer>
        <BookDetailReviewBtn>
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
const BookDetailBodyRatingBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const BookDetailRating = styled.Text`
  width: 70%;
  font-size: 25px;
  margin: 20px 0 0 35px;
  padding-left: 20px;
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
