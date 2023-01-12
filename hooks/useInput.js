import { useCallback, useState } from 'react'
import { createReview } from '../api/bookDetailService'

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue)

  const onChageHandler = useCallback((value) => {
    setValue(value)
  }, [])

  const onClickHandler = (rating, bookId, user) => {
    const reviewObj = {
      nickname: user.nickname,
      content: value,
      rating,
      userId: user.uid,
      bookId,
      createdAt: Date.now(),
    }
    createReview(reviewObj)
    setValue('')
  }

  return [value, setValue, onChageHandler, onClickHandler]
}

export default useInput
