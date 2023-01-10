import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { fireStore } from './firebase'

export const getBookRequest = (setBooks) => {
  const q = query(collection(fireStore, 'books'), orderBy('createdAt', 'desc'))

  onSnapshot(q, (snapshot) => {
    const newBooks = snapshot.docs.map((doc) => {
      const newBook = {
        id: doc.id,
        ...doc.data(),
      }
      return newBook
    })
    setBooks(newBooks)
  })
}
