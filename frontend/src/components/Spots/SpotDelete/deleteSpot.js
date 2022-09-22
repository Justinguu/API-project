//src/components/DeleteSpots/DeleteSpots.js
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteSpotThunk } from "../../../store/spots";

import './DeleteSpot.css'


const SpotDelete = ({spotId, setShowDelete}) => {

  const dispatch = useDispatch()
  const history = useHistory()
  // const [,setRender] = useState(false)
  // const state = useSelector(state => state.spots[spotId])
  const deleteHandle = async (e) => {
  //  e.preventDefault()
dispatch(deleteSpotThunk(spotId)).then(() => setShowDelete(false)).then(() => history.push("/"))
    
  }
  // if(state === undefined){
  //   dispatch(deleteSpotThunk(spotId)).then(()=> setRender((prev) => !prev))
  // }
  return (
    <>
      <div className='delete-container'>
      <p className="delete-spot-text"> &nbsp;&nbsp;&nbsp;&nbsp; Are you sure you want to Delete the spot? </p>
      <button className="delete-button" onClick={() => deleteHandle()}>YES</button>
      <button className="delete-button" onClick={() => setShowDelete(false)}>NO</button>
      </div>
    </>
  )
}

export default SpotDelete