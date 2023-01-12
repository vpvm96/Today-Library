import { getAuth } from 'firebase/auth'

const auth = getAuth()
const currentUser = auth.currentUser

// 기존 프로필 정보 가져오기
export const getProfileRequest = () => {
  const q = query(
    collection(fireStore, 'users'),
    where('uid', '==', currentUser.uid)
  )
  getDocs(q).then((querySnapshop) => {
    const userInfo = []
    querySnapshop.forEach((doc) => {
      userInfo.push({
        nickname: doc.data().nickname,
        mymessage: doc.data().mymessage,
        profileImg: doc.data().profileImg,
      })
      setNickName(userInfo[0].nickname)
      setMessage(userInfo[0].mymessage)
      setProfileImg(userInfo[0].profileImg)
    })
  })
}
