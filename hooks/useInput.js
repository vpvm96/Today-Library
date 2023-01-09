import { useCallback, useState } from 'react'
import { createReview } from '../api/bookDetailService'

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue)

  const onChageHandler = useCallback((value) => {
    setValue(value)
  }, [])

  const onClickHandler = (rating) => {
    const reviewObj = {
      nickname: '',
      content: value,
      rating,
      userId: '',
      createdAt: Date.now(),
    }
    createReview(reviewObj)
  }

  return [value, onChageHandler, onClickHandler]
}

export default useInput
