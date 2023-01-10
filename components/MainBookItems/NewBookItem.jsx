import styled from '@emotion/native'
import { FontAwesome } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const NewBookItem = ({ book }) => {
  const { id, title, author, publisher, createdAt, bookmark, read, imgUrl } =
    book
  const { navigate } = useNavigation()

  return (
    <StyleNewBookItem
      key={id}
      onPress={() => navigate('Stacks', { screen: 'BookDetail', params: book })}
    >
      <StyleNewBookWrap>
        <StyleNewBookImg source={{ uri: imgUrl }}></StyleNewBookImg>
        <StyleNewBookInfo>
          <StyleNewBookTitle>{title}</StyleNewBookTitle>
          <StyleNewBookText>{author}</StyleNewBookText>
          <StyleNewBookEtcWrap>
            <StyleNewBookText>{publisher}</StyleNewBookText>
            <StyleNewBookText>-</StyleNewBookText>
            <StyleNewBookText>{createdAt}</StyleNewBookText>
          </StyleNewBookEtcWrap>
          <StyleNewBookEtcWrap>
            <FontAwesome name="check-circle-o" size={18} color="#000" />
            <StyleNewBookText>{read}</StyleNewBookText>
            <MaterialCommunityIcons
              name="heart-circle-outline"
              size={18}
              color="#000"
            />
            <StyleNewBookText>{bookmark}</StyleNewBookText>
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
