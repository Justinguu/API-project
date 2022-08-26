//src/components/DeleteSpots/DeleteSpots.js
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteSpotThunk } from "../../../store/spots";
import './DeleteSpot.css'


const SpotDelete = ({spotId, setShowDelete}) => {

  const dispatch = useDispatch()
  const history = useHistory()

  const deleteHandle = async (e) => {
    history.push("/")
    await dispatch(deleteSpotThunk(spotId))
    setShowDelete(false)
  }

  return (
    <>
      <div className='delete-container'>
      <p>Are you sure you want to Delete the Spot </p>
      <button className="delete-button" onClick={() => deleteHandle()}>YES</button>
      <button className="delete-button" onClick={() => setShowDelete(false)}>NO</button>
      </div>
    </>
  )
}

export default SpotDelete