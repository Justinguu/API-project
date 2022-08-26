import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import {useEffect} from 'react'
import { deleteReviewThunk, getCurrReviewsThunk } from "../../../store/reviews";



export default function GetSpotReviews(){
  const {spotId, reviewId} = useParams();
  const allReviews = useSelector(state => state.reviews)
   
    const releventReviews = Object.values(allReviews).map((review)=> {
        // take all review and map obj, ask a question does review.id === spot.id
        // return review.id === spot.id ? (
        //     <div key={`review.id`}>
        //         {review.review}
        //     </div>
        // ): null
        return(
          <div >
            <div key={review.id}>{review.review} </div>
            <div>{review.stars}</div>
       
        </div>
          
          
        )
    })



  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrReviewsThunk(spotId))
    }, [dispatch,spotId])

  

  return (

    <div>
    <h1>Reviews </h1>
    {releventReviews}
    
    </div>
  )
}