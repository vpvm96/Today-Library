import { collection, orderBy, query, getDocs } from 'firebase/firestore'
import { fireStore } from './firebase'

export const getMainBookRequest = async () => {
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
