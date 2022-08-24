import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import { getCurrSpotThunk } from '../../store/spots'
import EditSpotForm from './EditForm'



const GetSpotDetails = () => {
    const [showUpdate, setShowUpdate] = useState(false);
    const [hasUdpated, setHasUpdate] = useState(false);

    const [isLoaded, setIsLoaded] = useState(false)

    const { spotId } = useParams()
    // console.log('spotId', spotId)
    const currSpot = useSelector(state => state.spots[spotId])
    // console.log('currSpot', currSpot)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrSpotThunk(spotId)).then(() => setIsLoaded(true))
    }, [dispatch])

    return (
        isLoaded && (
            <>
                <div>Current Spot:</div>
                <div>
                    <li>{currSpot.address}</li>
                    console.log(currSpot.address)
                </div>
                <EditSpotForm spotId={spotId} setShowUpdate={setShowUpdate} />
            </>
        )
    )

}


export default GetSpotDetails