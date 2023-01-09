import { useState } from 'react'
import { View } from 'react-native'
import { Rating } from 'react-native-ratings'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import BookDetailHeader from '../components/BookDetail/BookDetailHead'
import BookDetailComment from '../components/BookDetail/BookDetailComment'
import BookReviewModal from '../components/BookDetail/BookReviewModal'
import useInput from '../hooks/useInput'
import styled from '@emotion/native'

const BookDetail = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [reviewValue, reviewValueChangeHandler, createReviewClickHandler] =
    useInput('')
  const [isRating, setIsRating] = useState(0)

  const testData = [
    {
      id: 1,
      nickname: '나플레옹',
      content: '위로의 책 완전 재밌어요.',
      createdAt: '2023.01.09',
      rating: 5,
    },
    {
      id: 2,
      nickname: '이순신',
      content: '생각보다 깊은 내용이네요.',
      createdAt: '2023.01.09',
      rating: 5,
    },
    {
      id: 3,
      nickname: '벙먹금',
      content: '시간 가는줄 모르고 봤어요.',
      createdAt: '2023.01.09',
      rating: 4,
    },
    {
      id: 4,
      nickname: '악플러',
      content: '전 생각보단 별로인거 같네요.',
      createdAt: '2023.01.09',
      rating: 2,
    },
    {
      id: 5,
      nickname: '악플러라러',
      content: '전 생각보단 별로인거 같네요.',
      createdAt: '2023.01.09',
      rating: 2,
    },
    {
      id: 6,
      nickname: '악플러러',
      content: '전 생각보단 별로인거 같네요.',
      createdAt: '2023.01.09',
      rating: 2,
    },
  ]

  const openDetailModalHandler = () => {
    setIsOpenModal(true)
  }

  const closeDetailModalHandler = () => {
    setIsOpenModal(false)
  }

  const getRatingDetailModalHandler = (rating) => {
    setIsRating(rating)
  }

  const createDetailReviewHandler = () => {
    createReviewClickHandler(isRating)
    setIsOpenModal(false)
  }

  return (
    <BookDetailWrap>
      <BookDetailHeader />
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
      <BookDetailCommentContainer
        showsVerticalScrollIndicator={false}
        data={testData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BookDetailComment review={item} />}
        ItemSeparatorComponent={<View style={{ height: 10 }} />}
      />
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
const BookDetailCommentContainer = styled.FlatList`
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
