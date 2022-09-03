import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import { getCurrSpotThunk } from '../../../store/spots'
import { Modal } from '../../../context/Modal'
import EditSpotForm from '../EditForm/EditForm'
import SpotDelete from '../SpotDelete/deleteSpot'
import ReviewGetComponent from "../../Reviews/ReviewGet"
import "./GetCurrSpot.css"


const GetSpotDetails = () => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [hasReviews, setReviews] = useState(false);
    const [showReviewDelete, setShowReviewDelete] = useState(false);

    const { spotId, reviewId } = useParams()
    const reviewss = useSelector(state => state.reviews) 
    const user = useSelector(state => state.session.user)
    const currSpot = useSelector(state => state.spots[spotId])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrSpotThunk(spotId))
        .then(() => setIsLoaded(true))
    }, [dispatch, spotId]) 

    const rating = currSpot?.avgStarRating == 0 ? "New" : currSpot?.avgStarRating

    
    return (
        isLoaded && (
            <>
                <div>
                    <h2>{currSpot.name}</h2>
                </div>
                <div>
                    <p>Rating: <img className="star-icon" src={'https://i.pinimg.com/736x/1e/26/44/1e26444b739863fdf4b0ad49d163ff95.jpg'} alt="" />{rating}</p>
                    <p>{currSpot.city}, {currSpot.state} {currSpot.country}</p>
                </div>
                {/* <div>
                    {sessionUser.id === reviewId.userId && <button> onClick={(e) => deleteReview(e, reviewId)}</button>} 
                </div> */}
                <div>
                    {currSpot.ownerId === user?.id && (
                        <div>
                            <button onClick={() => setShowUpdate(true)}>Edit Spot</button>
                            <button onClick={() => setShowDelete(true)}>Delete Spot</button>
                            {/* <button onClick={() => setShowReviewDelete(true)}>Delete Review</button> */}
                            {showUpdate && (
                                <Modal onClose={() => setShowUpdate(false)}>
                                    <EditSpotForm spotId={spotId} setShowUpdate={setShowUpdate} />
                                </Modal>
                            )}
                            {showDelete && (
                                <Modal onClose={() => setShowDelete(false)} >
                                    <SpotDelete spotId={spotId} setShowDelete={setShowDelete} />
                                </Modal>
                            )}
                            
                        </div>
                    )}
                    <ReviewGetComponent spotId={spotId} setReviews={setReviews} />
                </div>
                <div>
                    <div>
                    
                    </div>
                    
                    
                </div >
            </>
        )
    )

}


export default GetSpotDetails