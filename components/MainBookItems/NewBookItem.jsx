import React, { useState } from 'react'
import styled from '@emotion/native'
import { FontAwesome } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const NewBookItem = ({ item }) => {
  const { navigate } = useNavigation()

  const [readCount, setReadCount] = useState(0)
  const [bookmarkCount, setbookmarkCount] = useState(0)

  return (
    <StyleNewBookItem
    // onPress={() => navigate('Stacks', { screen: 'BookDetail' })}
    >
      <StyleNewBookWrap>
        <StyleNewBookImg
          source={require('../../assets/images/testBook.jpeg')}
        ></StyleNewBookImg>
        <StyleNewBookInfo>
          <StyleNewBookTitle>{item.title}</StyleNewBookTitle>
          <StyleNewBookText>{item.writer}</StyleNewBookText>
          <StyleNewBookEtcWrap>
            <StyleNewBookText>{item.publisher}</StyleNewBookText>
            <StyleNewBookText>-</StyleNewBookText>
            <StyleNewBookText>{item.year}</StyleNewBookText>
          </StyleNewBookEtcWrap>
          <StyleNewBookEtcWrap>
            <FontAwesome name="check-circle-o" size={18} color="#000" />
            <StyleNewBookText>{readCount}</StyleNewBookText>
            <MaterialCommunityIcons
              name="heart-circle-outline"
              size={18}
              color="#000"
            />
            <StyleNewBookText>{bookmarkCount}</StyleNewBookText>
          </StyleNewBookEtcWrap>
        </StyleNewBookInfo>
      </StyleNewBookWrap>
    </StyleNewBookItem>
  )
}

const StyleNewBookItem = styled.TouchableOpacity`
  width: 100%;
  height: 180px;
  background-color: #fff;
  padding: 10px;
  justify-content: center;
`

const StyleNewBookWrap = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
`

const StyleNewBookImg = styled.Image`
  width: 100px;
  height: 150px;
`

const StyleNewBookInfo = styled.View`
  width: 50%;
  height: 100%;
  justify-content: flex-start;
  padding-top: 10px;
`

const StyleNewBookTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
`

const StyleNewBookText = styled.Text`
  font-size: 15px;
`

const StyleNewBookEtcWrap = styled.View`
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`

export default NewBookItem
