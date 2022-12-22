import { createSpotThunk, getAllSpotsThunk } from "../../../store/spots";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import "./createSpot.css";

const TYPES = ["House", "Condo", "Apartment", "Cabin", "Mansion", "Omg"];
export default function CreateSpotForm() {
  const user = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const [url, setUrl] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const errors = [];

    if (name.length < 1 || name.length > 49) errors.push("Name must be between 1 and 49 characters");
    if (price <= 0) errors.push("Please set a higher price");
    if (!address.length) errors.push("Please provide an address");
    if (!city.length) errors.push("Please provide a city");
    if (!state.length) errors.push("Please provide a state");
    if (!country.length) errors.push("Please provide a country");
    if (!lat) errors.push("Please provide a lat");
    if (!lng) errors.push("Please provide a lng");
    if (!type) errors.push("Please provide a property type");
    if (!description) errors.push("Please provide a description");
    if (!url) errors.push("Please provide a previewImage");

    return setErrors(errors);
  }, [name, price, address, city, state, country, lat, lng, type, description, url]);

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  if (user === null) {
    alert("You must be logged in to make a spot");
    return <Redirect to="/" />;
  }
  async function onSubmit(e) {
    e.preventDefault();
    setHasSubmitted(true);
    if (errors.length > 0) {
      return alert("There was an error with your submit, Please recheck your inputs");
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
      type,
      description,
      previewImage: true,
      url,
    };

    function loadImage(url) {
      return url;
    }

    if (loadImage(url)) {
      dispatch(createSpotThunk(payload)).then(() => dispatch(getAllSpotsThunk()));
      history.push("/");
    }
  }

  return (
    <div className="Spot-Container">
      <div className="Purple-Background">
        <h1 className="container-message">What kind of place will you host?</h1>
      </div>
      <div className="right-container">
        <div className="show-errors">
          {hasSubmitted && errors.length > 0 && (
            <ul className="errors-list">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
        </div>
        <form onSubmit={onSubmit} className="create-spot-form">
          <div>
            <input
              className="form-input first"
              type="text"
              placeholder="Name of Spot"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="form-input mid create"
              type="text"
              placeholder="Address"
              maxLength="50"
              minLength="1"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <input
              className="form-input mid create"
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <input
              className="form-input mid create"
              type="text"
              placeholder="State / territory"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
            <input
              className="form-input mid create"
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
            <input
              className="form-input mid create"
              type="number"
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              min="-90"
              max="90"
              required
            />
            <input
              className="form-input mid create"
              type="number"
              placeholder="Logitude"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              min="-180"
              max="180"
              required
            />
            
            <select className="form-input-text-create" value={type} onChange={(e) => setType(e.target.value)}>
              <option selected disabled value=""
              >
            <div className="property-text">Select a Property Type</div>
              </option>
              {TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <input
              className="form-input mid create"
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <input
              className="form-input mid create"
              type="url"
              name="preview-image"
              placeholder="Image URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <textarea
              className="form-input last create"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button className="create-spot-button" type="submit">
            Create Spot
          </button>
        </form>
      </div>
    </div>
  );
}
