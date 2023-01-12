import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native'
import styled from '@emotion/native'

const MovieDetailHeader = ({ book }) => {
  const { title, desc, imgUrl } = book
  return (
    <DetailHeadWrap>
      <DetailHeadPostImgBox>
        <DetailHeadBgImg
          source={{ uri: imgUrl }}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={['transparent', 'black']}
        />
        <DetailHeadPostImg source={{ uri: imgUrl }} resizeMode="stretch" />
      </DetailHeadPostImgBox>
      <DetailHeadContentBox>
        <DetailHeadTitleText>{title}</DetailHeadTitleText>
        <DetailHeadDescText>
          {desc.slice(0, 52)} {desc.length > 52 && '...'}
        </DetailHeadDescText>
      </DetailHeadContentBox>
    </DetailHeadWrap>
  )
}

const DetailHeadWrap = styled.SafeAreaView`
  width: 100%;
`
const DetailHeadBgImg = styled.Image`
  width: 100%;
  height: 100%;
`
const DetailHeadPostImgBox = styled.View`
  width: 100%;
  height: 280px;
  align-items: center;
`
const DetailHeadPostImg = styled.Image`
  width: 35%;
  height: 200px;
  margin-top: 115px;
`
const DetailHeadContentBox = styled.View`
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const DetailHeadTitleText = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
`
const DetailHeadDescText = styled.Text`
  width: 60%;
  margin-top: 10px;
  font-size: 18px;
  color: ${(props) => props.theme.textColor};
`

export default MovieDetailHeader
