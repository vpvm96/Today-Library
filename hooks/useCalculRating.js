import { useState } from 'react'

const useCalculRating = () => {
  const [avgRating, setAvgRating] = useState(0)

  const calculRatingHadnler = (reviews) => {
    if (reviews.length <= 0) return
    const cal = reviews
      .map((item) => item.rating)
      .reduce((pre, cur) => pre + cur, 0)
    setAvgRating(cal / reviews.length)
  }
  return [avgRating, calculRatingHadnler]
}

export default useCalculRating
