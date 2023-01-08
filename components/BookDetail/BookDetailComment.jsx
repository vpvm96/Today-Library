import styled from '@emotion/native'

const BookDetailComment = () => {
  return (
    <DetailCommentWrap>
      <DetailCommentBox>
        <DetailCommentNickName>닉네임</DetailCommentNickName>
        <DetailCommentContent>리뷰내용 리뷰내용</DetailCommentContent>
      </DetailCommentBox>
    </DetailCommentWrap>
  )
}

const DetailCommentWrap = styled.View`
  width: 100%;
`

const DetailCommentBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px;
  margin-top: 13px;
  border-radius: 10px;
  border: 1px solid #c6c6c6;
`
const DetailCommentNickName = styled.Text`
  font-size: 20px;
`
const DetailCommentContent = styled.Text`
  font-size: 18px;
  margin-left: 13px;
`

export default BookDetailComment
