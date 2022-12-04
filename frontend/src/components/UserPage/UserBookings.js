import { NavLink, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getBookingsByUserthunk } from "../../store/bookings";
import { deleteBookingId } from "../../store/bookings";
import { getAllSpotsThunk } from "../../store/spots";
import realEstate from "../icons/RealEstate.png"
import "./UserBookings.css";

function UserBookings() {
  const bookings = useSelector((state) => Object.values(state.bookings));
  const spot = useSelector((state) => Object.values(state.spots));
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();


  bookings.sort(function (a, b) {
    return new Date(a.endDate) - new Date(b.endDate);
  });

  const [isLoaded, setIsLoaded] = useState(false);


  const redirectUser = () => {
    history.push(`/spots/${spotId}`);
  };

  useEffect(() => {
    dispatch(getBookingsByUserthunk()).then(setIsLoaded(true));
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  if (!isLoaded) {
    return null;
  }

  let userBookings;
  if (Object.keys(bookings).length === 0) {
    userBookings = (
      <div className="no-bookings">
        <h2>You have no bookings</h2>
      </div>
    );
  } else {
    userBookings = (
      <div className="profile-container">
        <div className="cover-photo-container">
        </div>
        <div className="user-title-container">
        <h2 className="mySpotHeader">Upcoming Bookings</h2>
          </div>
          <div className="user-showcase-container">
          <div className="user-showcase-wrapper">
          {bookings.map((booking) => (
            <div className="user-singleImgContainer" key={booking.id}>
             
                  <h3 className="spotAddy-Owned spacing">{booking.Spot.name}</h3>
                <div className="booking-card-right" onClick={() => history.push(`/spots/${booking.Spot.id}`)}>
                  <img className="booking-image" src={booking.Spot.previewImage} alt="Spot" />
                <div className="booking-card-buttons">
                  {/* <NavLink to={`/spots/${booking.Spot.id}`} className="spacing booking-card-button">
                    View Spot
                  </NavLink> */}
                  <button
                    className="cancel-booking-bttn"
                    onClick={() => dispatch(deleteBookingId(booking.id))}
                  >
                    Cancel Booking
                  </button>
                </div>
                </div>
                <div className="booking-card-info">
                  <p className="grouping-info spacing">
                    {new Date(booking.startDate).toLocaleDateString()} -{" "}
                    {new Date(booking.endDate).toLocaleDateString()}
                    &nbsp;&nbsp;{booking.Spot.city}, {booking.Spot.state} &nbsp;
                  </p>
                </div>
            </div>
          ))}
          </div>
        </div>
        
      </div>
    );
  }

  return (
    <div className="user-booking-container">
      <div className="user-booking-inner-container">
        {/* <div className="user-booking-header mySpotHeader">My Bookings</div> */}
        {userBookings}
      </div>
    </div>
  );
}

export default UserBookings;
