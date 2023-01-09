import React, { useEffect, useState } from 'react'
import { Alert, View, Text, TouchableOpacity, FlatList } from 'react-native'
import styled from '@emotion/native'
import { Feather } from '@expo/vector-icons'
import NewBookItem from '../components/MainBookItems/NewBookItem'
import RecommendBookItem from '../components/MainBookItems/RecommendBookItem'

//예비용 데이터
const obj = [
  {
    id: '1',
    title: '제목1',
    writer: '저자1',
    publisher: '출판1',
    year: 2005,
  },
  {
    id: '2',
    title: '제목2',
    writer: '저자2',
    publisher: '출판2',
    year: 2002,
  },
  {
    id: '3',
    title: '제목3',
    writer: '저자3',
    publisher: '출판3',
    year: 2003,
  },
]

const Home = () => {
  // const [data, setData] = useState([obj])
  const [text, onChangeText] = useState('')
  const [category, setCategory] = useState('newbook')

  // title키워드 검색 시 title에 맞는 db 정보가 불러와 줘야함
  const onSubmitHandler = () => {
    if (text === '')
      return Alert.alert('알림', '도서명을 입력해주세요.', [{ text: '확인' }])
  }

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
          data={obj}
          renderItem={({ item }) => <NewBookItem item={item} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <FlatList
          data={obj}
          renderItem={({ item }) => <RecommendBookItem item={item} />}
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
  top: 18;
  right: 25;
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
    category === 'newbook' ? '2' : '0'};
`

const StyleCategoryRightButtons = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 60px;
  border-bottom-color: #61d2bc;
  border-bottom-width: ${({ category }) =>
    category === 'recommendbook' ? '2' : '0'};
`

const StyleCategoryText = styled.Text`
  font-size: 20px;
  font-weight: 700;
`

// flatlist 영역

export default Home
