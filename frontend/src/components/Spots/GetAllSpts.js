import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAllSpotsThunk } from '../../store/spots'




const GetAllSpots = () => {

    const [isLoaded, setIsLoaded] = useState(false)

    const dispatch = useDispatch();

    const allSpots = useSelector(state => state.spots)

    const allSpotsArr = Object.values(allSpots)

    useEffect(() => {
        dispatch(getAllSpotsThunk()).then(setIsLoaded(true));
    }, [dispatch])

    if (!allSpotsArr.length) {
        return null
    }

    return (
        isLoaded && (
            <>
            <div>All Spots</div>
            <div>
              <div>
                {allSpotsArr.map((spot) => (
                  <ul key={spot.id}>
                    <div>
                      <img src={spot.previewImage}/>
                    </div>
                    <div>
                      {spot.name}
                    </div>
                    <div>
                      {spot.city}, {spot.state}
                    </div>
                    <div>
                      {Number(spot.avgRating).toFixed(2)}
                    </div>
                    <div>
                      {`$${spot.price} night`}
                    </div>
                  </ul>
                ))}
                    </div>
                </div>
            </>
        )
    )
}

export default GetAllSpots
