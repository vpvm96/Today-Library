import { fireStore } from './firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'

export const getReviewRequest = (setReviews, bookId) => {
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
  })
}

export const createReview = async (review) => {
  await addDoc(collection(fireStore, 'reviews'), {
    ...review,
  })
}

export const deleteReview = async (reviewId) => {
  await deleteDoc(doc(fireStore, 'review', reviewId))
}
