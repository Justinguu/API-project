//src/components/DeleteSpots/DeleteSpots.js
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteSpotThunk } from "../../../store/spots";
import {useState} from 'react'
import './DeleteSpot.css'


const SpotDelete = ({spotId, setShowDelete}) => {

  const dispatch = useDispatch()
  const history = useHistory()
  const [,setRender] = useState(false)

  const deleteHandle = async (e) => {
    history.push("/")
    dispatch(deleteSpotThunk(spotId)).then(() => setRender(curr => !curr))
    setShowDelete(false)
  }

  return (
    <>
      <div className='delete-container'>
      <p> &nbsp;&nbsp;&nbsp;&nbsp; Are you sure you want to Delete the spot? </p>
      <button className="delete-button" onClick={() => deleteHandle()}>YES</button>
      <button className="delete-button" onClick={() => setShowDelete(false)}>NO</button>
      </div>
    </>
  )
}

export default SpotDelete