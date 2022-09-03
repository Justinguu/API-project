import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import { getAllSpotsThunk } from '../../../store/spots'
import "./Allspots.css"




const GetAllSpots = () => {

    const [isLoaded, setIsLoaded] = useState(false)

    const dispatch = useDispatch();

    const allSpots = useSelector(state => state.spots)

    const allSpotsArr = Object.values(allSpots)

    useEffect(() => {
        dispatch(getAllSpotsThunk()).then(setIsLoaded(true));
    }, [dispatch])

 

    return (
        isLoaded &&  (
            <>
            <div>All Spots</div>
            <div>
              <div>
                {allSpotsArr.map((spot) => (
                  <ul key={spot.id}>
                 
                    <span className="desc-info">
                    <div>
                      {spot.name}
                    </div>
                    <p className="spot-display-image">
                <a className="spot-display-image" href={`/spots/${spot.id}`}>
                  <img src={spot.previewImage} alt="true"></img>
                </a>
              </p>
                    <div>
                      {spot.city}, {spot.state}
                    </div>
                    <div>
                    {spot.avgRating && (<span className="star-rating-container"> {Number(spot.avgRating).toFixed(2)}<img className="star-icon" src={'https://i.pinimg.com/736x/1e/26/44/1e26444b739863fdf4b0ad49d163ff95.jpg'} alt="" />  </span>)}
                        
                    </div>
                    <div>
                      {`$${spot.price} night`}
                    </div>
                    </span>
                  </ul>
                ))}
                
                    </div>
                    
                </div>
            </>
        )
    )
}

export default GetAllSpots
