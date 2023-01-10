import { fireStore } from './firebase'
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore'

export const createReview = async (review) => {
  await addDoc(collection(fireStore, 'reviews'), {})
}

export const deleteReview = async (reviewId) => {
  await deleteDoc(doc(fireStore, 'review', reviewId))
}
