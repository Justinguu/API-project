import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllSpotsThunk } from "../../../store/spots";
import { NavLink } from "react-router-dom";
import starIcon from "./starIcon.png";

import "./Allspots.css";

const GetAllSpots = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();
  // const [,setRender] = useState(false)

  const allSpots = useSelector((state) => state.spots);
  
  // const state = useSelector(state => state.spots[spotId])

  const allSpotsArr = Object.values(allSpots);

  useEffect(() => {
    dispatch(getAllSpotsThunk()).then(setIsLoaded(true))
  }, [dispatch]);

  // if(state === undefined){
  //   dispatch(getAllSpotsThunk(spotId)).then(()=> setRender((prev) => !prev))
  // }

  return (
    isLoaded && (
      <>
        <div className="spots-container">
          <div className="spots-cards-container">
            {allSpotsArr.map((spot) => (
              <div key={spot.id}>
                <NavLink to={`/spots/${spot.id}`}>
                  <img
                    className="spot-img"
                    src={spot.previewImage}
                    alt="true"
                  ></img>
                   {/* <img
                        className="star-icon"
                        src={}
                        alt=""
                      /> */}
                </NavLink>
                <div className="spot-info-container">
                  <div className="spot-info-left">
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "550",
                      }}
                    >
                      {spot.name}
                    </div>
                    <div className="mainpage-city-state"
                    >
                      {spot.city}, {spot.state}
                    </div>
                    <div className="price-container">
                      <div
                        style={{
                          fontSize: "15px",
                          fontWeight: "550",
                        }}
                      >
                        ${spot.price}
                      </div>
                      &nbsp;night
                    </div>
                  </div>
                  <div className="spot-info-right">
                    <div className="star-rating-container" style={{fontSize: '15px'}}>
                      <img
                        className="star-icon"
                        src={starIcon}
                        alt=""
                      />
                      {Number(spot.avgRating).toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  );
};

export default GetAllSpots;
