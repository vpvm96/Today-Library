import React, { useEffect, useState } from 'react'
import { Alert, View, Text, TouchableOpacity, FlatList } from 'react-native'
import styled from '@emotion/native'
import { Feather } from '@expo/vector-icons'
import { getBookRequest } from '../api/bookService'
import NewBookItem from '../components/MainBookItems/NewBookItem'
import RecommendBookItem from '../components/MainBookItems/RecommendBookItem'
import { useQuery, useQueryClient, useInfiniteQuery } from 'react-query'

const Home = () => {
  const [books, setBooks] = useState([])
  const [recommendBooks, setRecommendBooks] = useState([])
  const [text, onChangeText] = useState('')
  const [category, setCategory] = useState('newbook')

  // query
  const queryClinet = useQueryClient()
  const { data, isLoading } = useQuery(getBookRequest())

  const randomBooksfunc = () => {
    const randomBooks = []

    for (let i = 0; i < 5; i++) {
      let randomNum = Math.floor(Math.random() * books.length)
      randomBooks.push(books[randomNum])
    }
    setRecommendBooks(randomBooks)
  }

  // title키워드 검색 시 title에 맞는 db 정보가 불러와 줘야함
  const onSubmitHandler = () => {
    if (text === '')
      return Alert.alert('알림', '도서명을 입력해주세요.', [{ text: '확인' }])
  }

  // useEffect(() => {
  //   getBookRequest(setBooks)
  // }, [])

  return (
    <>
      {/* 검색창 */}
      <StyleTextWrap>
        <StyleTextInput
          placeholder="도서명을 입력해주세요."
          onSubmitEditing={onSubmitHandler}
          onChangeText={onChangeText}
          value={text}
        />
        <StyleIconWrap onPress={onSubmitHandler}>
          <Feather name="search" size={24} color="black" />
        </StyleIconWrap>
      </StyleTextWrap>

      {/* 카테고리 버튼 */}
      <StyleCategoryWrap>
        <StyleCategoryLeftButtons
          category={category}
          onPress={() => setCategory('newbook')}
        >
          <StyleCategoryText>새로운책</StyleCategoryText>
        </StyleCategoryLeftButtons>
        <StyleCategoryRightButtons
          category={category}
          onPress={() => setCategory('recommendbook')}
        >
          <StyleCategoryText>추천책</StyleCategoryText>
        </StyleCategoryRightButtons>
      </StyleCategoryWrap>

      {/* flatlist 영역 */}
      {category === 'newbook' ? (
        <FlatList
          data={books}
          renderItem={({ item }) => <NewBookItem book={item} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <FlatList
          data={recommendBooks}
          renderItem={({ item }) => <RecommendBookItem recbook={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </>
  )
}

// 검색창 영역
const StyleTextWrap = styled.View`
  position: relative;
  width: 100%;
`

const StyleTextInput = styled.TextInput`
  background-color: #eeeeee;
  width: 100%;
  height: 60px;
  font-size: 20px;
  padding: 5px 55px 5px 25px;
`

const StyleIconWrap = styled.TouchableOpacity`
  position: absolute;
  top: 18px;
  right: 25px;
`

// 카테고리 영역
const StyleCategoryWrap = styled.View`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  width: 100%;
`

const StyleCategoryLeftButtons = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 60px;
  border-bottom-color: #61d2bc;
  border-bottom-width: ${({ category }) =>
    category === 'newbook' ? '2px' : '0'};
`

const StyleCategoryRightButtons = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 60px;
  border-bottom-color: #61d2bc;
  border-bottom-width: ${({ category }) =>
    category === 'recommendbook' ? '2px' : '0'};
`

const StyleCategoryText = styled.Text`
  font-size: 20px;
  font-weight: 700;
`

export default Home
