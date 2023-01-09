import { useMutation, useQueryClient } from 'react-query'
import { createReview } from '../api/bookDetailService'

const useCreateReviewFetch = () => {
  const queryClient = useQueryClient()
  const addReview = useMutation(
    (reviewRequest) => createReview(reviewRequest),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('reviews')
      },
    }
  )
  return {
    addReviewLoading: addReview.isLoading,
    addReviewError: addReview.isError,
    addReview,
  }
}

export default useCreateReviewFetch
