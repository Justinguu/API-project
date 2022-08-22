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
                    <ul>
                        {allSpotsArr.map((spot) => (
                            <li key={spot.id}>{spot.name}</li>
                        ))}
                    </ul>
                </div>
            </>
        )
    )
}

export default GetAllSpots
// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { GetAllSpotsThunk } from "../../store/spots";


// const GetAllSpts = () => {
//     const hSpots = useSelector((state) => state.spots)
//     const ModSpots = Object.values(hSpots)
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(GetAllSpotsThunk());
//     }, [dispatch])
//     if (!ModSpots){
//         return null
//     }
// }

// export default GetAllSpts