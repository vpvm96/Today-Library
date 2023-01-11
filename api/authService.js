import { getAuth } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { fireStore } from './firebase'

export const getAuthCurrentUserInfo = async (setUser) => {
  const auth = getAuth()
  const userInfo = []
  if (!auth.currentUser) return

  const q = query(
    collection(fireStore, 'users'),
    where('uid', '==', auth.currentUser.uid)
  )

  const querySnapShot = await getDocs(q)
  querySnapShot.docs.forEach((item) => {
    userInfo.push(item.data())
  })

  setUser(userInfo[0])
}
