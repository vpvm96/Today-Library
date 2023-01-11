import { fireStore } from './firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'

export const getReviewRequest = (setReviews, bookId, calculRatingHadnler) => {
  const q = query(
    collection(fireStore, 'reviews'),
    orderBy('createdAt', 'desc'),
    where('bookId', '==', bookId)
  )

  onSnapshot(q, (snapshot) => {
    const newReviews = snapshot.docs.map((doc) => {
      const newReview = {
        id: doc.id,
        ...doc.data(),
      }
      return newReview
    })
    setReviews(newReviews)
    calculRatingHadnler(newReviews)
  })
}

export const completedReadBook = async (book, user) => {
  const { id, read, readUid } = book
  const { uid, readBook } = user
  const bookRef = doc(fireStore, 'books', id)
  const userRef = doc(fireStore, 'users', uid)
  try {
    await updateDoc(bookRef, { read: read + 1, readUid: [...readUid, uid] })
    await updateDoc(userRef, { readBook: [...readBook, id] })
  } catch (e) {
    throw new Error(e)
  }
}

export const bookMarkBook = async (book, user) => {
  const bookRef = doc(fireStore, 'books', book.id)
  const userRef = doc(fireStore, 'users', user.uid)
  try {
    await updateDoc(bookRef, {
      bookmark: book.bookmark + 1,
      bookmarkUid: [...book.bookmarkUid, user.uid],
    })
    await updateDoc(userRef, { bookmark: [...user.bookmark, book.id] })
  } catch (e) {
    throw new Error(e)
  }
}

export const createReview = async (review) => {
  await addDoc(collection(fireStore, 'reviews'), {
    ...review,
  })
}

// 아직 안쓰이는 중
export const deleteReview = async (reviewId) => {
  await deleteDoc(doc(fireStore, 'review', reviewId))
}
