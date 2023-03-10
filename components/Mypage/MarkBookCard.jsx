import React from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from '@emotion/native'

const MarkBookCard = ({ readId, books }) => {
  const markBook = books.filter((book) => book.id === readId)
  const { navigate } = useNavigation()

  return (
    <RecordBookInfo
      id={markBook[0]?.id}
      onPress={() =>
        navigate('Stacks', { screen: 'BookDetail', params: markBook[0] })
      }
    >
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <BookItemImage source={{ uri: markBook[0]?.imgUrl }}></BookItemImage>
        <BookItemInfo>
          <BookTitle>
            {markBook[0]?.title.length > 6
              ? markBook[0]?.title.substring(0, 6) + '..'
              : markBook[0]?.title}
          </BookTitle>
          <BookAuthor>{markBook[0]?.author}</BookAuthor>
          <BookPublishAndCreatedAtWrap>
            <BookPublish>
              {markBook[0]?.publisher.length > 3
                ? markBook[0]?.publisher.substring(0, 3) + '..'
                : markBook[0]?.publisher}{' '}
            </BookPublish>
            <BookPublish>&#8226;</BookPublish>
            <BookCreatedAt>{markBook[0]?.createdAt}</BookCreatedAt>
          </BookPublishAndCreatedAtWrap>
        </BookItemInfo>
      </View>
    </RecordBookInfo>
  )
}

export default MarkBookCard

const RecordBookInfo = styled.TouchableOpacity`
  width: 100%;
  height: 180px;
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
`
const BookTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${(props) => props.theme.textColor};
`
const BookAuthor = styled.Text`
  font-size: 15px;
  margin-right: 8px;
  color: ${(props) => props.theme.textColor};
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
  color: ${(props) => props.theme.textColor};
`
const BookCreatedAt = styled.Text`
  font-size: 15px;
  margin-right: 8px;
  color: ${(props) => props.theme.textColor};
`
