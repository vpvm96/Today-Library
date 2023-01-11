import React, { useEffect, useState, useRef } from 'react'
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native'
import styled from '@emotion/native'
import { Feather } from '@expo/vector-icons'
import { getMainBookRequest, getInfiniteData } from '../api/mainBookService'
import NewBookItem from '../components/MainBookItems/NewBookItem'
import { useQuery, useQueryClient, useInfiniteQuery } from 'react-query'
import { EvilIcons } from '@expo/vector-icons'

const Home = () => {
  const [recommendBooks, setRecommendBooks] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [text, onChangeText] = useState('')
  const [category, setCategory] = useState('newbook')
  const [scrollVertical, setScrollVertical] = useState(0)
  const CONTENT_OFFSET_THRESHOLD = 100

  // const queryClinet = useQueryClient()

  // useQeury
  const {
    data: bookRequestData,
    isLoading: isLoadingBR,
    refetch: refetchBR,
  } = useQuery('BookRequest', getMainBookRequest, {
    onSuccess: (data) => {
      const randomBooks = []
      for (let i = 0; i < 6; i++) {
        let randomNum = Math.floor(Math.random() * data.length)
        randomBooks.push(data[randomNum])
        data.splice(randomNum, 1)
      }
      setRecommendBooks(randomBooks)
    },
  })

  const onRefresh = async () => {
    setIsRefreshing(true)
    await refetchBR()
    setIsRefreshing(false)
  }

  const isLoading = isLoadingBR

  if (isLoading) {
    return (
      <StyleLoader>
        <ActivityIndicator />
      </StyleLoader>
    )
  }

  let listViewRef

  const topButtonhandler = () => {
    listViewRef.scrollToOffset({ offset: 0, animated: true })
  }

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
      <StyleFlatListWrap>
        {category === 'newbook' ? (
          <FlatList
            onScroll={(e) => setScrollVertical(e.nativeEvent.contentOffset.y)}
            ref={(ref) => {
              listViewRef = ref
            }}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            data={bookRequestData}
            renderItem={({ item }) => <NewBookItem book={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <FlatList
            onScroll={(e) => setScrollVertical(e.nativeEvent.contentOffset.y)}
            ref={(ref) => {
              listViewRef = ref
            }}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            data={recommendBooks}
            renderItem={({ item }) => <NewBookItem book={item} />}
            keyExtractor={(item) => item.id}
          />
        )}
        {scrollVertical > CONTENT_OFFSET_THRESHOLD && (
          <StyleScrollIconWrap onPress={topButtonhandler}>
            <EvilIcons name="arrow-up" size={60} color="#61d2bc" />
          </StyleScrollIconWrap>
        )}
      </StyleFlatListWrap>
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

const StyleLoader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const StyleScrollIconWrap = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  right: 10px;
`

const StyleFlatListWrap = styled.View`
  flex: 1;
  position: relative;
  width: 100%;
`

export default Home
