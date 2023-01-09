import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native'
import styled from '@emotion/native'

const MovieDetailHeader = () => {
  return (
    <DetailHeadWrap>
      <DetailHeadPostImgBox>
        <DetailHeadBgImg
          source={require('../../assets/images/testBook.jpeg')}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={['transparent', 'black']}
        />
        <DetailHeadPostImg
          source={require('../../assets/images/testBook.jpeg')}
          resizeMode="stretch"
        />
      </DetailHeadPostImgBox>
      <DetailHeadContentBox>
        <DetailHeadTitleText>위로의 책</DetailHeadTitleText>
        <DetailHeadDescText>
          이 책의 줄거리 어쩌구 저쩌구 이 책의 줄거리 어쩌구 저쩌구
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
`
const DetailHeadDescText = styled.Text`
  width: 60%;
  margin-top: 10px;
  font-size: 18px;
`

export default MovieDetailHeader
