import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
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
        <StyleNewBookImgWrap>
          <StyleNewBookImg source={{ uri: imgUrl }} />
        </StyleNewBookImgWrap>
        <StyleNewBookInfo>
          <StyleNewBookTitle>
            {title.length > 6 ? title.substring(0, 6) + '..' : title}
          </StyleNewBookTitle>
          <StyleNewBookText>{author}</StyleNewBookText>
          <StyleNewBookEtcWrap>
            <StyleNewBookText>
              {publisher.length > 3
                ? publisher.substring(0, 3) + '..'
                : publisher}
            </StyleNewBookText>
            <StyleNewBookText>&#8226;</StyleNewBookText>
            <StyleNewBookText>{createdAt}</StyleNewBookText>
          </StyleNewBookEtcWrap>
          <StyleNewBookIconWrap>
            <StyleIcon>
              <Ionicons name="checkmark-circle-outline" size={18} />
            </StyleIcon>
            <StyleNewBookText>{read}</StyleNewBookText>
            <StyleIcon>
              <MaterialCommunityIcons
                name="heart-circle-outline"
                size={18}
                color="white"
              />
            </StyleIcon>
            <StyleNewBookText>{bookmark}</StyleNewBookText>
          </StyleNewBookIconWrap>
        </StyleNewBookInfo>
      </StyleNewBookWrap>
    </StyleNewBookItem>
  )
}

const StyleNewBookItem = styled.TouchableOpacity`
  width: 100%;
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 10px;
  justify-content: center;
`

const StyleNewBookWrap = styled.View`
  width: 100%;
  height: 190px;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
`

const StyleNewBookImgWrap = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyleNewBookImg = styled.Image`
  width: 100px;
  height: 150px;
`

const StyleNewBookInfo = styled.View`
  width: 50%;
  justify-content: flex-start;
  padding-top: 10px;
`

const StyleNewBookTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${(props) => props.theme.textColor};
`

const StyleNewBookText = styled.Text`
  font-size: 15px;
  margin-right: 8px;
  color: ${(props) => props.theme.textColor};
`
const StyleIcon = styled.Text`
  color: ${(props) => props.theme.textColor};
`

const StyleNewBookEtcWrap = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
`

const StyleNewBookIconWrap = styled.View`
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`

export default NewBookItem
