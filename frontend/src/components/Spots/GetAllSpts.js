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
                <div className='allSpots-stuff'>
                    <div>
                        {allSpotsArr.map((spot) => (
                            <div className='individual-spot-info' key={spot.id}>
                                {spot.name}
                                {spot.city}
                                {spot.state}
                                {spot.avgRating}
                                {}

                            </div>
                            
                        ))}
                    </div>
                </div>
            </>
        )
    )
}

export default GetAllSpots
