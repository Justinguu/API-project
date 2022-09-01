
import {createSpotThunk, getAllSpotsThunk} from '../../../store/spots'
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, Redirect} from 'react-router-dom'
import './createSpot.css'


export default function CreateSpotForm() {
    const user = useSelector(state => state.session.user);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat , setLat] = useState('')
    const [lng, setLng] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([])
    const [previewImage, setPreviewImage] = useState("")
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory()
    

    useEffect(() => {
        const errors = [];
        
        if (name.length < 1 || name.length > 49) errors.push("Name must be between 1 and 49 characters")
        if (price <= 0) errors.push("Please set a higher price");
        if (!address.length) errors.push("Please provide an address");
        if (!city.length) errors.push("Please provide a city");
        if (!state.length) errors.push("Please provide a state")
        if (!country.length) errors.push("Please provide a country")
        if (!lat) errors.push("Please provide a lat")
        if (!lng) errors.push("Please provide a lng")
        if (!description) errors.push("Please provide a description")
        if (!previewImage) errors.push("Please provide a previewImage")
        

        return setErrors(errors);

    }, [name,price,address,city,state,country,lat,lng,description, previewImage])

   


    useEffect(() => {
      dispatch(getAllSpotsThunk())
    },[dispatch])
    
   if(user === null) {
      alert("You must be logged in to make a spot")
      return <Redirect to='/' />
    }
    async function onSubmit(e){
      e.preventDefault();
        setHasSubmitted(true);
      if(errors.length > 0){
        return alert('There was an error with your submit, Please Recheck your inputs')
      } 

      
      
      const payload = {
          name,
          price,
          address,
          city,
          state,
          country,
          lng,
          lat,
          description,
          previewImage
      
      }
      
     const response = await dispatch(createSpotThunk(payload))
      history.push('/')
    }


    
return (
  <div className="Page-Container">
    <div className="Purple-Background-Container">
      <h1 className="welcome-message">What kind of place will you host?</h1>
    </div>
    <div className="right-page-container">
      <div className="create-errors-container">
        {hasSubmitted && errors.length > 0 && (
          <ul className="errors-list">
            {errors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
      </div>
      <form
        onSubmit={onSubmit}
        className="create-spot-form"
      >
        <div className="create-spot-title-container">
          <h3 className="create-spot-title">Host your Spot!</h3>
        </div>

        <div className="create-spot-input-wrapper">
          <input
            type="text"
            placeholder="Name of Spot"
            className="form-input first create"
            maxLength='50'
            minLength='1'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="form-input none create"
            maxLength='50'
            minLength='1'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="City"
            className="form-input none create"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="State"
            className="form-input none create"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Country"
            className="form-input none create"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Latitude"
            className="form-input none create"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Logitude"
            className="form-input none create"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            className="form-input none create"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="url"
            name="preview-image"
            className="form-input none create"
            placeholder="Image URL"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="form-input last desc create"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button className="create-spot-button" type="submit">Create Spot</button>
      </form>
    </div>
  </div>
)
}
