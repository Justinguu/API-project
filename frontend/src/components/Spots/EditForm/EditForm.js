import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Redirect, useHistory, useParams } from "react-router-dom";
import { getCurrSpotThunk, updateSpotThunk } from '../../../store/spots'
import './EditForm.css'


function EditSpotForm({ setShowUpdate }) {

  const user = useSelector(state => state.session.user)
  const { spotId } = useParams()

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')

  const [errors, setErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const history = useHistory()

  const dispatch = useDispatch()
  useEffect(() => {
    const errors = []
    if (name.length < 1 || name.length > 49) errors.push("Name length must be between 1 and 49 characters")
    if (!address.length) errors.push("Please provide an address");
    if (!city.length) errors.push("Please provide a city");
    if (!state.length) errors.push("Please provide a state")
    if (!country.length) errors.push("Please provide a country")
    if (!lat) errors.push("Please provide a lat")
    if (!lng) errors.push("Please provide a lng")
    if (price <= 0) errors.push("Please set a higher price");
    if (!description) errors.push("Please provide a description")
    if (!url) errors.push("Please provide a url")

    return setErrors(errors)

  }, [name, address, city, state, country, lat, lng, price, description, url])

  if (user === null) {
    alert("must be logged in to edit a spot")
    return <Redirect to="/" />
  }

  async function onSubmit(e) {
    e.preventDefault()

    setHasSubmitted(true)
    if (errors.length > 0) return alert('There was an error submitting your form.')

    const updatedSpot = {
      id: spotId, name, address, city, state, country, lat, lng, price, description, url
    }

   dispatch(updateSpotThunk(updatedSpot))
   dispatch(getCurrSpotThunk(spotId))
    setShowUpdate(false)
    history.push(`/spots/${spotId}`)
  }
  return (
    <form
      onSubmit={onSubmit}
      className="spot-form-update"
    >
      <div>
        <h3>Edit Spot Form</h3>
      </div>
      {hasSubmitted && errors.length > 0 && (
        <ul className="edit-errors">
          {errors.map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div>
        <input
          className="form-input mid edit"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <input
          className="form-input mid edit"
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
     
        <input
          className="form-input mid edit"
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      
        <input
          className="form-input mid edit"
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          className="form-input mid edit"
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          className="form-input mid edit"
          type="number"
          value={lat}
          placeholder="Latitude"
          onChange={(e) => setLat(e.target.value)}
        />
        <input
          className="form-input mid edit"
          type="number"
          value={lng}
          placeholder="Longitude"
          onChange={(e) => setLng(e.target.value)}
          required
        />
        <input
          className="form-input mid edit"
          type="number"
          value={price}
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          className="form-input mid edit"
          type="string"
          name="preview-image"
          placeholder="Image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        
        />
        <textarea
          type="text"
          className="form-input last edit"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
         
      </div>
      <button className="submit-button-edit" type="submit">Edit Spot</button>
    </form>
  )
}

export default EditSpotForm