import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import {useEffect, useState} from 'react'
import { getCurrSpotThunk } from "../../store/spots"


//Get One Spot
export default function getSingleSpot () {
    
    const {spotId} = useParams();
    const [isLoaded , setIsLoaded] = useState(false)
    console.log('spotId', spotId)
    const currSpot = useSelector(state => state.spots.spotDetails?.[spotId])
    console.log('currSpot',currSpot )
  
  
  
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getCurrSpotThunk(spotId)).then((res) => setIsLoaded(true))
      },[dispatch])


    return(
        isLoaded && (
            <>
            <div>Current Spot</div>
            <div>
                <ul>{oneSpot.address}</ul>
            </div>
            </>
        )
    )
       
    }
 