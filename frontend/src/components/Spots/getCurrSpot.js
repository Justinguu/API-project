import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import {useEffect, useState} from 'react'
import { getCurrSpotThunk } from "../../store/spots"


//Get One Spot
export default function GetSingleSpot () {
    const [isLoaded , setIsLoaded] = useState(false)
    
    const {spotId} = useParams();
    // console.log('spotId', spotId) //take out after working
    const currSpot = useSelector(state => state.spots[spotId])
    // console.log('currSpot',currSpot ) //take out after working
  
  
  
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getCurrSpotThunk(spotId)).then(() => setIsLoaded(true))
      },[dispatch])


    return(
        isLoaded && (
            <>
            <div>Current Spot</div>
            <div>
                <ul>{currSpot.address}</ul>
            </div>
            </>
        )
    )
       
    }
 