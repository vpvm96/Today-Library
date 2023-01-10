import styled from '@emotion/native'

const BookDetailComment = ({ review }) => {
  const { nickname, content, rating } = review
  return (
    <DetailCommentWrap>
      <DetailCommentBox>
        <DetailCommentNickName>
          {nickname.slice(0, 3)} {nickname.length > 3 && '...'}
        </DetailCommentNickName>
        <DetailCommentContent>
          {content.slice(0, 11)} {content.length > 11 && '...'}
        </DetailCommentContent>
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
