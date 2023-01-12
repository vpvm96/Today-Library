import {
  collection,
  orderBy,
  query,
  getDocs,
  where,
  getDoc,
} from 'firebase/firestore'
import { fireStore } from './firebase'

export const getMainBookRequest = async (keyword) => {
  const q = query(collection(fireStore, 'books'), orderBy('createdAt', 'desc'))

  const array = []

  const newQuery = await getDocs(q)

  newQuery.forEach((doc) => {
    array.push({
      id: doc.id,
      ...doc.data(),
    })
  })
  return array
}

// export const getInfiniteData = async ({}) => {
//   const q = query(collection(fireStore, 'books'), orderBy('createdAt', 'desc'))

//   const array = []

//   const newQuery = await getDocs(q)

//   newQuery.forEach((doc) => {
//     array.push({
//       id: doc.id,
//       ...doc.data(),
//     })
//   })
//   return array
// }

export const searchBookRequest = async (keyword) => {
  const q = query(
    collection(fireStore, 'books'),
    where('title', '>=', keyword),
    where('title', '<=', keyword + '\uf8ff')
  )
  const querySnapshot = await getDocs(q)
  const searchItem = []
  querySnapshot.docs.forEach((doc) => {
    searchItem.push({ id: doc.id, ...doc.data() })
  })
  return searchItem
}
