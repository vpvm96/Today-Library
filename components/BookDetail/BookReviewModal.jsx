import { Modal } from 'react-native'
import styled from '@emotion/native'

const BookReviewModal = ({ isOpenModal, onCloseDetailModal }) => {
  return (
    <Modal visible={isOpenModal} transparent animationType="slide">
      <ModalBackDrop>
        <ModalDialog>
          <ModalBookTitle>책 제목</ModalBookTitle>
          <ModalRatingText>별점 ⭐️⭐️⭐️⭐️⭐️</ModalRatingText>
          <ModalInputBox>
            <ModalInputText>나의 감상</ModalInputText>
            <ModalInput
              multiline={true}
              numberOfLines={5}
              placeholder="내용을 입력해 주세요"
              textAlignVertical="top"
            />
          </ModalInputBox>
          <ModalButtonBox>
            <ModalSaveButton>
              <ModalSaveButtonText>저장</ModalSaveButtonText>
            </ModalSaveButton>
            <ModalCancelButton onPress={onCloseDetailModal}>
              <ModalCancelButtonText>취소</ModalCancelButtonText>
            </ModalCancelButton>
          </ModalButtonBox>
        </ModalDialog>
      </ModalBackDrop>
    </Modal>
  )
}

const ModalBackDrop = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const ModalDialog = styled.KeyboardAvoidingView`
  background-color: ${(props) => props.theme.modalBg};
  width: 80%;
  height: 70%;
  padding: 20px;
  border-radius: 5px;
`
const ModalBookTitle = styled.Text`
  font-size: 30px;
  margin-top: 20px;
`
const ModalRatingText = styled.Text`
  font-size: 30px;
  margin-top: 20px;
`
const ModalInputBox = styled.View`
  width: 100%;
  margin-top: 35px;
`
const ModalInputText = styled.Text`
  font-size: 30px;
  margin-left: 10px;
`
const ModalInput = styled.TextInput`
  background-color: white;
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.borderColor};
  font-size: 20px;
  padding: 10px;
  margin-top: 20px;
  min-height: 250px;
  max-height: 250px;
`
const ModalButtonBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`
const ModalSaveButton = styled.TouchableOpacity`
  width: 35%;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.pointColor};
  border-radius: 5px;
`
const ModalSaveButtonText = styled.Text`
  color: white;
  font-size: 18px;
`
const ModalCancelButton = styled.TouchableOpacity`
  width: 35%;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.cancleBtn};
  border-radius: 5px;
  margin-left: 50px;
`
const ModalCancelButtonText = styled.Text`
  color: white;
  font-size: 18px;
`

export default BookReviewModal
