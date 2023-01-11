import React from 'react'
import styled from '@emotion/native'
import { View, Text, ScrollView } from 'react-native'

function ReadBookCard({ readId, books }) {
  const readBook = books.filter((book) => book.id === readId)

  // console.log('readBook', readBook[0])

  return (
    <RecordBookInfo>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <BookItemImage source={{ uri: readBook[0]?.imgUrl }}></BookItemImage>
        <BookItemInfo>
          <BookTitle>
            {readBook[0]?.title.length > 6
              ? readBook[0]?.title.substring(0, 6) + '..'
              : readBook[0]?.title}
          </BookTitle>
          <BookAuthor>{readBook[0]?.author}</BookAuthor>
          <BookPublishAndCreatedAtWrap>
            <BookPublish>
              {readBook[0]?.publisher.length > 3
                ? readBook[0]?.publisher.substring(0, 3) + '..'
                : readBook[0]?.publisher}{' '}
            </BookPublish>
            <BookPublish>&#8226;</BookPublish>
            <BookCreatedAt>{readBook[0]?.createdAt}</BookCreatedAt>
          </BookPublishAndCreatedAtWrap>
        </BookItemInfo>
      </View>
    </RecordBookInfo>
  )
}

export default ReadBookCard

const RecordBookInfo = styled.TouchableOpacity`
  width: 100%;
  height: 180px;
  /* background-color: lightgrey; */
  padding: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const BookItemImage = styled.Image`
  width: 100px;
  height: 150px;
  margin-right: 15px;
`
const BookItemInfo = styled.View`
  width: 50%;
  height: 100%;
  justify-content: flex-start;
  padding-top: 10px;
  /* background-color: skyblue; */
`
const BookTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
`
const BookAuthor = styled.Text`
  font-size: 15px;
  margin-right: 8px;
`

const BookPublishAndCreatedAtWrap = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`

const BookPublish = styled.Text`
  font-size: 15px;
  margin-right: 8px;
`
const BookCreatedAt = styled.Text`
  font-size: 15px;
  margin-right: 8px;
`
