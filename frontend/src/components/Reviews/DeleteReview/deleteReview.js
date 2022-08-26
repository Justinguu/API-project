import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteReviewThunk } from "../../../store/reviews";


const ReviewDelete = ({reviewId, setShowReviewDelete}) => {
   
    
    const spot = useSelector(state => state.spots)
    const dispatch = useDispatch()
    const history = useHistory()


    const deleteHandleReview = async (e) => {
        history.push(`/spot/{$spotId}`)
        await dispatch(deleteReviewThunk(reviewId))
        setShowReviewDelete(false)
        
    }

    return (
        <>
        <div className='delete-container'>
            <p>Are you sure you want to Delete the Review</p>
            <button className="delete-button" onClick={() => deleteHandleReview()}>YES</button>
            <button className="delete-button" onClick={() => setShowReviewDelete(false)}>NO</button>
        </div>
        </>
    )
}

export default ReviewDelete

