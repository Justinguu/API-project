// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetAllSpts from "./components/Spots/GetAllSpts";
import CreateSpotForm from "./components/Spots/CreateSpot";
// import CreateSpot from "./components/Spots/CreateSpot";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  // useEffect(() => {
  //   dispatch(spotActions.getAllSpotsThunk())
  // },[dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">  
            <GetAllSpts/>
            <Route path='spots/:spotId'>
              <getSingleSpot/>
            </Route>
          </Route>
          <Route path="/spots/create">
            <CreateSpotForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;