
import {createSpotThunk} from '../../store/spots'
import {useState, useEffect, Redirect} from 'react';
import {useDispatch, useSelector} from 'react-redux';


export default function CreateSpotForm() {
    const user = useSelector(state => state.session.user);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [price, setPrice] = useState(0);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat , setLat] = useState('')
    const [lng, setLng] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch();
    const [hasSubmitted, setHasSubmitted] = useState(false);
    


    useEffect(() => {
        const errors = [];
        
        if (name.length < 1 || name.length > 49) errors.push("Name must be between 1 and 49 characters")
        if (!email.includes("@")) errors.push("Please provide a valid Email");
        if (price <= 0) errors.push("Please set a higher price");
        if (!address.length) errors.push("Please provide an address");
        if (!city.length) errors.push("Please provide a city");
        if (!state.length) errors.push("Please provide a state")
        if (!country.length) errors.push("Please provide a country")
        if (!lat) errors.push("Please provide a lat")
        if (!lng) errors.push("Please provide a lng")
        if (!description) errors.push("Please provide a description")
        

        return setErrors(errors);

    }, [name,email,price,address,city,state,country,lat,lng,description])

    if (user === null) {
        alert("You need to be logged in to make a spot")
        return <Redirect to="/" />
      }
    const onSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);
        if (errors.length) return alert(`Cannot Submit`);
    }

    const payload = {
        name,
        email,
        price,
        address,
        city,
        state,
        country,
        lng,
        lat,
        description

    }

     dispatch(createSpotThunk(payload))

    
return(
    <form onSubmit={onSubmit}>
        {hasSubmitted && errors.length > 0 && (
        <div>
          The following errors were found:
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
     <div>
     <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
     </div>
     <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
        <label htmlFor="price">Price:</label>
        <input
            id="price"
            type="text"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            />
        </div>
        <div>
        <label htmlFor="address">Address:</label>
        <input
            id="address"
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            />
        </div>
        <div>
        <label htmlFor="city">City:</label>
        <input
            id="city"
            type="text"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            />
        </div>
        <div>
        <label htmlFor="state">State:</label>
        <input
            id="state"
            type="text"
            onChange={(e) => setState(e.target.value)}
            value={state}
            />
        </div>
        <div>
        <label htmlFor="country">Country:</label>
        <input
            id="country"
            type="text"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            />
        </div>
                <button>Submit</button>


    </form>
    )
}

