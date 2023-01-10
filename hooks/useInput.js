import { useCallback, useState } from 'react'
import { createReview } from '../api/bookDetailService'

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue)

  const onChageHandler = useCallback((value) => {
    setValue(value)
  }, [])

  const onClickHandler = (rating, bookId) => {
    const reviewObj = {
      nickname: '', // 로그인 기능이 있어야 가능.
      content: value,
      rating,
      userId: '', // 로그인 기능이 있어야 가능.
      bookId,
      createdAt: Date.now(),
    }
    createReview(reviewObj)
  }

  return [value, setValue, onChageHandler, onClickHandler]
}

export default useInput
