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
          <BookTitle>{readBook[0]?.title}</BookTitle>
          <BookAuthor>{readBook[0]?.author}</BookAuthor>
          <BookPublish>
            {readBook[0]?.publisher} - {readBook[0]?.createdAt}
          </BookPublish>
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
`
const BookItemImage = styled.Image`
  width: 100px;
  height: 150px;
`
const BookItemInfo = styled.View`
  width: 50%;
  height: 100%;
  justify-content: flex-start;
  padding-top: 10px;
  /* background-color: skyblue; */
`
const BookTitle = styled.Text`
  font-size: 22px;
`
const BookAuthor = styled.Text`
  font-size: 18px;
`
const BookPublish = styled.Text`
  font-size: 18px;
`
