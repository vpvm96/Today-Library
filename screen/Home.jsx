import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient, useInfiniteQuery } from 'react-query'
import { FlatList, ActivityIndicator } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { EvilIcons } from '@expo/vector-icons'
import {
  getMainBookRequest,
  getInfiniteData,
  searchBookRequest,
} from '../api/mainBookService'
import NewBookItem from '../components/MainBookItems/NewBookItem'
import styled, { css } from '@emotion/native'

const Home = () => {
  const [recommendBooks, setRecommendBooks] = useState([])
  const [serachBooks, setSerachBooks] = useState([])
  const [category, setCategory] = useState('newbook')
  const [text, onChangeText] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [scrollVertical, setScrollVertical] = useState(0)
  const CONTENT_OFFSET_THRESHOLD = 100

  // const queryClinet = useQueryClient()

  const onSubmitHandler = async () => {
    if (text === '') {
      setSerachBooks('')
      return
    }
    const res = await searchBookRequest(text)
    setSerachBooks(res)
  }

  useEffect(() => {
    onSubmitHandler()
  }, [text])

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

  return (
    <HomeBody>
      {/* 검색창 */}
      <StyleTextWrap>
        <StyleTextInput
          placeholder="도서명을 입력해주세요."
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
            data={serachBooks.length <= 0 ? bookRequestData : serachBooks}
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
    </HomeBody>
  )
}

// 검색창 영역
const HomeBody = styled.View`
  background-color: ${(props) => props.theme.backgroundColor};
  width: 100%;
  height: 100%;
`

const StyleTextWrap = styled.View`
  position: relative;
  width: 100%;
`

const StyleTextInput = styled.TextInput`
  background-color: #3f3e44;
  color: ${(props) => props.theme.textColor};
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
  color: ${(props) => props.theme.textColor};
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
